<template>
  <v-container>
    <v-row justify="center">
      <v-col v-if="user != null" cols="12" md="10">
        <v-card elevation="2" outlined>
          <v-card-text>
            <v-row align="center">
              <v-col cols="12" sm="3">
                <v-card class="mx-auto" width="200" height="200" rounded outlined elevation="0">
                  <v-img :src="user.picture" width="200" height="200"/>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" lg="7">
                <v-card-text class="align-center pt-6 text-center text-sm-start">
                  <h1 v-text="user.name"/>
                  <p class="mt-4">
                    <v-icon>mdi-calendar</v-icon>
                    {{ $t('text.joined') }}
                    {{ ago(user.created_at) }}
                  </p>
                  <p v-if="user.bio != null && user.bio.length > 0" class="mt-3">
                    <v-icon>mdi-text</v-icon>
                    {{ user.bio }}
                  </p>
                  <div v-if="user.link != null && user.link.length > 0" class="mt-3">
                    <v-icon>mdi-link</v-icon>
                    <v-btn rounded text :href="user.link" target="_blank">
                      <div class="truncate" v-text="$t('user.link')"/>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-col>

              <v-col v-if="$auth.loggedIn && user.id === $auth.user.id" cols="12" sm="3" lg="2">
                <div class="d-block text-center text-sm-start">
                  <v-btn to="/users/edit" color="primary" rounded>
                    <v-icon>mdi-pencil</v-icon>
                    {{ $t('text.edit_profile') }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-row class="my-2"/>

        <v-row class="mt-2" v-if="user.detail != null">
          <v-col cols="12" sm="6" lg="3">
            <v-card class="d-flex" elevation="2" outlined>
              <div class="d-block text-center w-50 ma-2">
                <v-icon large class="ma-auto d-block">mdi-cloud-download</v-icon>
                <label class="w-100 ma-auto" style="font-size: 13px" v-text="$t('text.network_usage')"/>
              </div>
              <v-card flat color="indigo text-center" :class="$vuetify.rtl ? 'option-rtl' : 'option-ltr'">
                <h3 class="text-center text-light" v-text="megabyte(user.detail.size)"/>
              </v-card>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <v-card class="d-flex" elevation="2" outlined>
              <div class="d-block text-center w-50 ma-2">
                <v-icon large class="ma-auto d-block">mdi-clock</v-icon>
                <label class="w-100 ma-auto" style="font-size: 13px" v-text="$t('text.time_play')"/>
              </div>
              <v-card flat color="red" :class="$vuetify.rtl ? 'option-rtl' : 'option-ltr'">
                <h3 class="text-center text-light" v-text="timeEstimated(user.detail.time)"/>
              </v-card>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <v-card class="d-flex" elevation="2" outlined>
              <div class="d-block text-center w-50 ma-2">
                <v-icon large class="ma-auto d-block">mdi-calendar</v-icon>
                <label class="w-100 ma-auto" style="font-size: 13px" v-text="$t('text.active_days')"/>
              </div>
              <v-card flat color="amber" :class="$vuetify.rtl ? 'option-rtl' : 'option-ltr'">
                <h3 class="text-center text-light" v-text="abbreviateNumber(user.detail.days)"/>
              </v-card>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <v-card class="d-flex" elevation="2" outlined>
              <div class="d-block text-center w-50 ma-2">
                <v-icon large class="ma-auto d-block">mdi-music-circle</v-icon>
                <label class="w-100 ma-auto" style="font-size: 13px">{{ $t('text.music_play') }}</label>
              </div>
              <v-card flat color="deep-orange" :class="$vuetify.rtl ? 'option-rtl' : 'option-ltr'">
                <h3 class="text-center text-light">{{ abbreviateNumber(user.detail.play) }}</h3>
              </v-card>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-2" v-if="user.most_played">
          <v-col cols="12" sm="4">
            <v-card elevation="2" outlined>
              <v-card-title v-text="$t('text.most_musics')"/>
              <v-divider/>
              <v-list two-line>
                <v-list-item :to="localePath(`/musics/${x.music_id}`)" v-for="(x, i) in user.most_played" :key="i">
                  <v-list-item-avatar width="50" height="50" class="my-1">
                    <v-img width="48" height="48" :aspect-ratio="1" :src="x.music.picture"/>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="$vuetify.rtl ? x.music.titleFa : x.music.title"/>
                    <v-list-item-subtitle
                      v-text="$vuetify.rtl ? x.music.performerFa : x.music.performer"/>
                  </v-list-item-content>
                  <v-list-item-action class="text-start">
                    <small>{{ abbreviateNumber(x.pl) }} {{ $t('text.plays') }}</small>
                    <small>{{ timeEstimated(x.pl * x.music.duration) }} {{ $t('text.hrs') }}</small>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card elevation="2" outlined>
              <v-card-title v-text="$t('text.last_played')"/>
              <v-divider/>
              <v-list two-line>
                <v-list-item :to="localePath(`/musics/${x.music_id}`)" v-for="(x, i) in user.last_played" :key="i">
                  <v-list-item-avatar width="50" height="50" class="my-1">
                    <v-img width="48" height="48" :aspect-ratio="1" :src="x.music.picture"/>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="$vuetify.rtl ? x.music.titleFa : x.music.title"/>
                    <v-list-item-subtitle
                      v-text="$vuetify.rtl ? x.music.performerFa : x.music.performer"/>
                  </v-list-item-content>
                  <v-list-item-action class="text-start">
                    <small>{{ ago(x.created_at) }}</small>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card elevation="2" outlined>
              <v-card-title v-text="$t('text.favorite_artists')"/>
              <v-divider/>
              <v-list two-line>
                <v-list-item :to="localePath(`/artists/${x.artist_id}`)" v-for="(x, i) in user.fav_artists" :key="i">
                  <v-list-item-avatar width="50" height="50" class="my-1">
                    <v-img width="48" height="48" :aspect-ratio="1" :src="x.artist.picture"/>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="$vuetify.rtl ? x.artist.nameFa : x.artist.name"/>
                  </v-list-item-content>
                  <v-list-item-action class="text-start">
                    <small>{{ abbreviateNumber(x.ct) }} {{ $t('text.plays') }}</small>
                    <small>{{ timeEstimated(x.dt) }} {{ $t('text.hrs') }}</small>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "profile",
  auth: false,

  head: () => ({
    title: "Profile",
  }),

  data: () => ({
    user: null
  }),

  created() {
    this.fetch();
  },

  computed: {
    userId() {
      return this.$route.params.slug;
    }
  },

  methods: {
    fetch() {
      this.loading = true;
      this.$api.get(`users/${this.userId}`)
        .then(({data}) => this.user = data)
        .finally(() => this.loading = false);
    }
  }
}
</script>

<style scoped>
.flex-auto {
  flex: auto !important;
}

.truncate {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.option-rtl {
  width: 50%;
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
  padding: 25px;
}

.option-ltr {
  width: 50%;
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
  padding: 25px;
}
</style>
