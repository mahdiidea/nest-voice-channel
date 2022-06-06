<template>
    <v-app>
        <v-navigation-drawer v-if="user != null" :right="$vuetify.rtl" app v-model="drawer">
            <v-list-item class="px-1">
                <v-list-item-icon class="mx-2">
                    <v-avatar color="blue-grey" max-width="48" max-height="48">
                        <v-img :src="user.picture" aspect-ratio="1" v-if="user.picture != null" />
                        <span class="white--text headline" v-else>{{ user.name.substring(0, 1) }}</span>
                    </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        {{ user.name }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                        {{ user.email }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider />

            <v-list>
                <v-list-item to="/">
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ $t('text.home') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/library">
                    <v-list-item-icon>
                        <v-icon>mdi-view-dashboard-outline</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ $t('text.library') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/playlists">
                    <v-list-item-icon>
                        <v-icon>mdi-playlist-music</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ $t('text.playlists') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/releases">
                    <v-list-item-icon>
                        <v-icon>mdi-music-box-outline</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ $t('text.browse') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/library" v-if="false">
                    <v-list-item-icon>
                        <v-icon>mdi-library-music-outline</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ $t('text.library') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/forYou">
                    <v-list-item-icon>
                        <v-icon>mdi-cards-heart</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ $t('text.for_you') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/search">
                    <v-list-item-icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ $t('text.search') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/histories">
                    <v-list-item-icon>
                        <v-icon>mdi-history</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ $t('text.history') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="`/profile/${user.id}`">
                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ $t('text.profile') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <template v-if="user.email_verified_at == null" v-slot:append>
                <v-btn to="/profile" class="btm" color="warning" block text depressed tile>
                    <v-icon>mdi-alert-octagon-outline</v-icon>
                    {{ $t('text.verify_email') }}
                </v-btn>
            </template>
        </v-navigation-drawer>

        <v-main style="overflow-x: hidden">
            <router-view />
        </v-main>

    </v-app>
</template>

<script>

export default {
    name: 'app',

    data: () => ({
        drawer: true,
    }),

    created() {
        this.applyAuthToken();
        this.fetchUserIfNotExist();
    },

    computed: {
        bearerToken() {
            return this.$store.state.config.bearer;
        },
        user() {
            return this.$store.state.user.user;
        }
    },

    methods: {
        applyAuthToken() {
            if (this.bearerToken != null) {
                this.$api.defaults.headers['Authorization'] = `Bearer ${this.bearerToken}`;
            }
        },
        fetchUserIfNotExist() {
            if (this.$store.state.user.user == null && this.bearerToken != null) {
                this.$api.get('auth').then(({ data }) => this.$store.commit('user/setUser', data));
            }
        }
    }
}
</script>

<style lang="scss">
</style>
