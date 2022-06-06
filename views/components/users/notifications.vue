<template>
    <v-menu transition="slide-y-transition"
         v-if="$auth.loggedIn"   max-width="550" v-model="dialog" bottom>
        <template v-slot:activator="{ on }">
            <v-btn @click="fetch" :loading="loading" icon>
                <v-badge :value="$auth.user.unread_notification"
                         :content="$auth.user.unread_notification" @click="" color="primary" overlap bordered>
                    <v-icon>mdi-bell</v-icon>
                </v-badge>
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-if="notifications.length === 0">
                <v-list-item-title>{{ $t('text.no_notifies') }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-for="(x, i) in notifications" :key="i" :href="x.data.link">
                <v-list-item-avatar v-if="x.data.picture">
                    <v-img :src="x.data.picture"/>
                </v-list-item-avatar>

                <v-list-item-icon v-else>
                    <v-icon>{{ x.data.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ x.data.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ x.data.description }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action-text>
                    <v-badge v-if="x.read_at === null" color="primary" left dot inline>
                        {{ ago(x.created_at) }}
                    </v-badge>
                    <label v-else>{{ ago(x.created_at) }}</label>
                </v-list-item-action-text>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: "notifications",

    data: () => ({
        loading: false,
        dialog: false,
        notifications: []
    }),

    methods: {
        fetch() {
            this.loading = true;
            this.$api.get(`/home/notifies`)
                .then(({data}) => {
                    this.notifications = data;
                    this.dialog = true;

                    this.$auth.user.unread_notification = 0;
                    this.$forceUpdate();
                })
                .catch(({response}) => this.$root.$emit('error', response.data.message))
                .finally(() => this.loading = false);
        }
    }
}
</script>

<style scoped>

</style>
