<template>
    <v-row justify="center" align="center" class="fill-height bg">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
            <v-expansion-panels v-model="expansion" mandatory focusable>
                <v-expansion-panel>
                    <v-expansion-panel-header v-if="expansion !== 1" v-text="$t('text.create_new_account')"/>
                    <v-expansion-panel-content class="content">
                        <form-builder display="block" elevation="0" :outlined-form="false" :on-success="onLoggedIn"
                                      primary-key-icon="mdi-check" :primary-key-text="$t('text.login')" rounded
                                      uri="auth" :fields="login.fields" :object="login.object" outlined>
                            <template v-slot:prefix>
                                <v-card-title class="text-center">
                                    <div class="mx-auto d-flex align-center">
                                        <v-img max-width="25" max-height="25" class="mx-2" src="/storage/logo.svg"/>
                                        <span v-text="$t('text.mosito')"/>
                                    </div>
                                </v-card-title>

                                <v-card-title class="text-center mb-4">
                                    <span class="mx-auto" v-text="$t('text.login_to_your_account')"/>
                                </v-card-title>
                            </template>
                        </form-builder>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header v-if="expansion !== 2" v-text="$t('text.create_an_one')"/>
                    <v-expansion-panel-content class="content">
                        <form-builder display="block" elevation="0" :outlined-form="false" :on-success="onLoggedIn"
                                      primary-key-icon="mdi-check" :primary-key-text="$t('text.register')" rounded
                                      uri="auth"
                                      :fields="register.fields" :object="register.object" outlined>
                            <template v-slot:prefix>
                                <v-card-title class="text-center">
                                    <div class="mx-auto d-flex align-center">
                                        <v-img max-width="25" max-height="25" class="mx-2" src="/storage/logo.svg"/>
                                        <span v-text="$t('text.mosito')"/>
                                    </div>
                                </v-card-title>

                                <v-card-title class="text-center mb-4">
                                    <span class="mx-auto" v-text="$t('text.create_an_one')"/>
                                </v-card-title>
                            </template>
                        </form-builder>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
    </v-row>
</template>

<script>
import FormBuilder from "../components/smartable/formBuilder";

export default {
    name: "login",

    components: {FormBuilder},

    data: () => ({
        expansion: 0,
        login: {
            fields: null,
            object: {
                email: '',
                password: '',
                action: 'login'
            }
        },
        register: {
            fields: null,
            object: {
                name: '',
                email: '',
                password: '',
                action: 'register'
            }
        }
    }),

    created() {
        this.login.fields = [
            {name: 'email', label: this.$t('text.email'), type: 'email', icon: 'mdi-email'},
            {name: 'password', label: this.$t('text.password'), type: 'password', icon: 'mdi-lock'},
        ];

        this.register.fields = [
            {name: 'name', label: this.$t('text.name'), type: 'text', icon: 'mdi-account'},
            {name: 'email', label: this.$t('text.email'), type: 'email', icon: 'mdi-email'},
            {name: 'password', label: this.$t('text.password'), type: 'password', icon: 'mdi-lock'},
        ];
    },

    methods: {
        onLoggedIn(data) {
            if (data.token) {
                this.$api.defaults.headers['Authorization'] = `Bearer ${data.token}`;
                this.$store.commit('user/setUser', data);
                this.$store.commit('config/setBearer', data.token);
                this.$router.push({name: 'home'});
            }
        }
    }
}
</script>

<style scoped>
.bg {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    background: #12c2e9; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
