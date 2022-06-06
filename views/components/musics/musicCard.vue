<template>
  <v-card outlined elevation="2" class="clickable">
    <v-hover v-if="music.picture != null" v-slot:default="{ hover }">
      <v-img class="img grey lighten-2" :aspect-ratio="1"
             :src="music.picture" v-ripple @click="$emit('play', music)">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0 blue-grey" align="center" justify="center">
            <v-icon x-large>mdi-headphones</v-icon>
          </v-row>
        </template>
        <v-row v-if="hover" class="fill-height ma-0" style="background: rgba(0,0,0,0.30)"
               align="center" justify="center">
          <v-icon dark x-large>mdi-play</v-icon>
        </v-row>
      </v-img>
    </v-hover>
    <v-list-item class="action">
      <v-list-item-content @click="gotoPath(`/musics/${music.id}`)">
        <v-list-item-title class="headlines">{{ $vuetify.rtl ? music.titleFa : music.title }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ $vuetify.rtl ? music.performerFa : music.performer }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-menu transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on }">
            <v-btn :loading="loading" v-on="on" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-if="music.library && $auth.loggedIn" @click="subLibrary">
              <v-list-item-icon>
                <v-icon>mdi-music-note-off</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('text.remove_from_library') }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-else-if="$auth.loggedIn" @click="addLibrary">
              <v-list-item-icon>
                <v-icon>mdi-music-note-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('text.add_to_library') }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!playlistRemove && $auth.loggedIn" @click="$root.$emit('addToPlaylist', music.id)">
              <v-list-item-icon>
                <v-icon>mdi-playlist-music</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('text.add_to_playlist') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$root.$emit('playlist_remove', music.id)" v-else-if="$auth.loggedIn">
              <v-list-item-icon>
                <v-icon>mdi-playlist-music</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('text.remove_from_playlist') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="share">
              <v-list-item-icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('text.share') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dl">
              <v-list-item-icon>
                <v-icon>mdi-download</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('text.download') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "musicCard",

  props: ['music', 'playlistRemove'],

  data: () => ({
    loading: false,
  }),

  methods: {
    share: function () {
      const el = document.createElement('textarea');
      el.value = `${this.$config.nuxtUrl}/musics/${this.music.id}`;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$root.$emit('success', this.$t('text.share_link_copied'));
    },
    addLibrary: function () {
      this.loading = true;
      this.$api.post(`/libraries`, {
        art_id: this.music.id,
        art_type: 'music',
      }).then(({data}) => {
        this.music.library = true;
        this.$root.$emit('success', this.$t('text.added_to_library'));
      }).catch(({response}) => this.$root.$emit('error', response.statusText))
        .finally(() => this.loading = false);
    },
    subLibrary: function () {
      this.loading = true;
      this.$api.put(`/libraries/${this.music.id}`, {
        art_id: this.music.id,
        art_type: 'music',
      }).then(({data}) => {
        this.music.library = false;
        this.$root.$emit('success', this.$t('text.removed_from_library'));
      }).catch(({response}) => this.$root.$emit('error', response.statusText))
        .finally(() => this.loading = false);
    },
    dl: function () {
      window.open(`/download/${this.music.id}`, '_blank');
    },
  }
}
</script>

<style scoped>
.action .v-list-item__action {
  display: none;
}

.action:hover .v-list-item__action {
  display: block;
}
</style>
