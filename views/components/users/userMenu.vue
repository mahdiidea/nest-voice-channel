<template>
  <div>
    <div v-if="isAuth">
      <notifications/>
      <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item :to="localePath(`/profile/${$auth.user.id}`)">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="$t('text.profile')"/>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="toggleDarkTheme">
            <v-list-item-action>
              <v-icon>mdi-brightness-6</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="$vuetify.theme.dark ? $t('text.light_mode') : $t('text.dark_mode')"/>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="switchLanguage">
            <v-list-item-action>
              <v-icon>mdi-translate</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="$i18n.locale === 'en' ? $t('text.persian') : $t('text.english')"/>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="$t('text.log_out')"/>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div v-else class="d-flex align-center">
      <v-btn class="mx-1" icon @click="toggleDarkTheme">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-btn text rounded class="mx-1 d-none d-sm-block" @click="switchLanguage">
        {{ $i18n.locale === 'en' ? $t('text.persian') : $t('text.english') }}
        <v-icon>mdi-translate</v-icon>
      </v-btn>
      <v-btn text icon class="mx-1 d-block d-sm-none" @click="switchLanguage">
        <v-icon>mdi-translate</v-icon>
      </v-btn>
      <v-btn class="px-1" text rounded color="primary" v-if="!authRoute && !$auth.loggedIn" :to="localePath(`/login`)">
        <span class="d-none d-sm-block" v-text="$t('text.login_register')"/>
        <span class="d-block d-sm-none" v-text="$t('text.login')"/>
      </v-btn>
    </div>
  </div>
</template>

<script>

import Notifications from '~/components/users/notifications'

export default {
  name: "userMenu",

  components: {Notifications},

  created() {
    this.$root.$on('user-update', this.update);
  },

  data: () => ({
    authRoutes: [
      '/login',
      '/register',
      '/recovery',
    ]
  }),

  computed: {
    authRoute() {
     return  this.authRoutes.includes(this.$route.path);
    },
    isAuth() {
      return this.$auth.loggedIn && this.$auth.user != null;
    }
  },

  methods: {
    logout() {
      this.$auth.logout().then(({data}) => {
        this.gotoPath('/login');
      });
    },
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$store.commit('config/setDarkTheme', this.$vuetify.theme.dark);
    },
    switchLanguage() {
      this.$router.push({path: this.switchLocalePath(this.$i18n.locale === 'en' ? 'fa' : 'en')});
    }
  }
}
</script>

<style scoped>

</style>
