<template>
    <v-card :elevation="elevation" :outlined="outlinedForm" :loading="loading">
        <v-card-title v-if="title">
            <div class="text-uppercase text-h6">{{ title }}</div>
            <v-spacer/>
            <v-icon v-text="formIcon"/>
        </v-card-title>

        <v-divider v-if="outlinedForm"/>
        <div class="my-1 w-100" v-else-if="!$slots.prefix"/>

        <slot name="prefix"/>

        <div v-if="obj != null" class="d-content">
            <v-card-text v-if="display === 'block'">
                <div v-for="(x, i) in fields" :key="i" class="d-content">
                    <v-text-field :type="x.type" :append-icon="x.icon || iconSuggestion(x.type)" v-model="obj[x.name]"
                                  :clearable="x.clearable || false" :label="x.label" :error-messages="errors[x.name]"
                                  :outlined="outlined" :rounded="rounded"/>
                </div>
            </v-card-text>
        </div>

        <slot name="suffix"/>
        <v-divider v-if="outlinedForm"/>

        <v-card-actions>
            <v-spacer/>
            <v-btn :rounded="rounded" @click="store" :loading="loading" min-width="130" color="primary">
                {{ primaryKeyText }}
                <v-icon>{{ primaryKeyIcon }}</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "formBuilder",

    props: {
        title: String,
        uri: String,
        onSuccess: Function,
        onFailure: Function,
        additionalBody: Object,
        additionalHeader: Object,
        method: {
            type: String,
            default: 'post',
            validator: function (value) {
                return ['post', 'put'].includes(value);
            }
        },
        formIcon: {
            type: String,
            default: 'mdi-plus'
        },
        primaryKeyText: {
            type: String,
            default: 'Save'
        },
        primaryKeyIcon: {
            type: String,
            default: 'mdi-check'
        },
        fields: {
            type: Array,
            default: []
        },
        display: {
            type: String,
            default: 'block'
        },
        outlined: {
            type: Boolean,
            default: false
        },
        rounded: {
            type: Boolean,
            default: false
        },
        elevation: {
            type: [Number, String],
            default: 2
        },
        outlinedForm: {
            type: Boolean,
            default: true
        },
        headers: Object,
        object: Object
    },

    data: () => ({
        loading: false,
        obj: null,
        errors: {}
    }),

    watch: {
        object: {
            handler() {
                this.obj = this.object;
            },
            deep: true
        }
    },

    created() {
        this.obj = this.object;
    },

    methods: {
        store() {
            if (this.uri == null) return;

            this.loading = true;
            this.errors = {};

            this.$api({
                method: this.method,
                url: this.uri,
                data: this.object,
                headers: this.headers
            }).then(({data}) => {
                try {
                    if (this.onSuccess) this.onSuccess(data);
                } catch (ex) {
                    console.error(ex);
                }
            }).catch(({response}) => {
                if (response.status === 422 && response.data != null && response.data.errors != null) {
                    this.errors = response.data.errors;
                } else if (response.status === 429) {
                    this.retryAfter = response.headers['retry-after'];
                    this.startTimer();
                }
                if (this.onFailure) this.onFailure(response);
            }).finally(() => this.loading = false);
        },
        iconSuggestion(name) {
            switch (name) {
                case 'email':
                    return 'mdi-email';
                case 'password':
                    return 'mdi-lock';
                default:
                    return 'mdi-text';
            }
        }
    }
}
</script>

<style scoped>

</style>
