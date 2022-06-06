<template>
  <v-container fluid>
    <v-row v-if="detail != null">
      <v-col cols="12" sm="6" md="3">
        <v-card :to="localePath(`/library/artists`)" v-ripple dark
                class="rounded-lg light-blue mx-2 mx-sm-0" outlined>
          <v-card-text class="d-flex">
            <div class="d-block">
              <div class="transition-swing white--text text-h3" v-text="reports.artists"/>
              <v-card-title class="font-weight-black ma-0 pa-0" v-text="$t('text.artists')"/>
            </div>
            <v-spacer/>
            <img src="/account-music.svg" width="80" height="80" alt="">
          </v-card-text>
          <v-card-actions class="light-blue darken-1">
            <v-spacer/>
            {{ $t('text.see_all') }}
            <v-spacer/>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card :to="localePath('/library/musics')" v-ripple dark
                class="rounded-lg deep-orange mx-2 mx-sm-0" outlined>
          <v-card-text class="d-flex">
            <div class="d-block">
              <div class="transition-swing white--text text-h3" v-text=" reports.musics"/>
              <v-card-title class="font-weight-black ma-0 pa-0" v-text="$t('text.musics')"/>
            </div>
            <v-spacer/>
            <v-icon color="deep-orange darken-4" size="80">mdi-music-circle</v-icon>
          </v-card-text>
          <v-card-actions class="deep-orange darken-1">
            <v-spacer/>
            {{ $t('text.see_all') }}
            <v-spacer/>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card :to="localePath('/playlists')" v-ripple dark
                class="rounded-lg deep-purple mx-2 mx-sm-0" outlined>
          <v-card-text class="d-flex">
            <div class="d-block">
              <div class="transition-swing white--text text-h3" v-text="reports.playlists"/>
              <v-card-title class="font-weight-black ma-0 pa-0" v-text="$t('text.playlists')"/>
            </div>
            <v-spacer/>
            <v-icon color="deep-purple darken-3" size="80">mdi-playlist-music</v-icon>
          </v-card-text>
          <v-card-actions class="deep-purple darken-1">
            <v-spacer/>
            {{ $t('text.see_all') }}
            <v-spacer/>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card :to="localePath('/library/albums')" v-ripple dark
                class="rounded-lg light-green mx-2 mx-sm-0" outlined>
          <v-card-text class="d-flex">
            <div class="d-block">
              <div class="transition-swing white--text text-h3" v-text="reports.albums"/>
              <v-card-title class="font-weight-black ma-0 pa-0" v-text="$t('text.albums')"/>
            </div>
            <v-spacer/>
            <v-icon color="light-green darken-2" size="80">mdi-folder-music</v-icon>
          </v-card-text>
          <v-card-actions class="light-green darken-1">
            <v-spacer/>
            {{ $t('text.see_all') }}
            <v-spacer/>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div class="d-block" v-if="musics.total > 0">
      <div class="d-flex my-3">
        <h1 v-text="$t('text.recently_added')"/>
        <v-spacer/>
        <music-upload v-on:uploaded="reload"/>
        <v-btn rounded color="primary" class="my-1 mx-2" @click="shuffle">
          <v-icon>mdi-shuffle</v-icon>
          {{ $t('text.shuffle') }}
        </v-btn>
      </div>

      <music-manager :musics="musics.data" :loading="loading"/>

      <small class="my-2" v-intersect="onIntersect">
        {{ `Loaded ${musics.data.length} from ${musics.total}` }}
      </small>
    </div>
    <empty v-else text="Your library is empty please browse to find musics." :height="400"/>
  </v-container>
</template>

<script>
import MusicManager from "~/components/musics/musicManager";
import MusicUpload from "~/components/musics/musicUpload";
import Empty from "~/components/empty";

export default {
  name: "index",

  components: {MusicUpload, Empty, MusicManager},

  head: () => ({
    title: "Library"
  }),

  data: () => ({
    loading: false,
    isIntersecting: false,
    requested: 0,
    musics: {
      data: [],
      total: 1,
      last_page: 1,
      current_page: 0,
    },
    detail: null
  }),

  async fetch() {
    await this.detailFetch();
  },

  computed: {
    reports: function () {
      if (this.detail === undefined || this.detail == null) {
        return null;
      }

      let array = {
        musics: 0,
        albums: 0,
        artists: 0,
        playlists: 0,
      };

      for (let i = 0; i < this.detail.length; i++) {
        switch (this.detail[i].art_type) {
          case 'App\\Music':
            array.musics = this.detail[i].count;
            break;
          case 'App\\Playlist':
            array.playlists = this.detail[i].count;
            break;
          case 'App\\Album':
            array.albums = this.detail[i].count;
            break;
          case 'App\\Artist':
            array.artists = this.detail[i].count;
            break;
        }
      }

      return array;
    }
  },

  methods: {
    reload() {
      this.requested = 0;
      this.musics = {
        data: [],
        total: 1,
        last_page: 1,
        current_page: 0,
      };
      this.fetch(1);
    },
    shuffle: function () {
      let sh = this.shuffleArray(this.musics.data);
      this.$root.$emit('list', sh, sh[0]);
    },
    onIntersect(entries, observer) {
      if (this.isIntersecting === false && entries[0].isIntersecting === true) {
        let page = this.musics.current_page === undefined ? 1 : (this.musics.current_page + 1);
        this.fetch(page);
      }
      this.isIntersecting = entries[0].isIntersecting;
    },
    detailFetch() {
      this.$api.get(`libraries`, {
        params: {
          art_type: `detail`
        }
      }).then(({data}) => this.detail = data);
    },
    fetch: function (page = 1) {
      if (page <= this.requested) return;
      if (page > this.musics.last_page) return;
      if (page <= this.musics.current_page) return;
      this.loading = true;
      this.requested = page;
      this.$api.get(`libraries`, {
        params: {
          page: page
        }
      }).then(({data}) => {
        for (let i = 0; i < data.data.length; i++) {
          this.musics.data.push(data.data[i]);
        }
        this.musics.current_page = page;
        this.musics.total = data.total;
        this.musics.last_page = data.last_page;
        this.musics.current_page = data.current_page;
      }).catch(({response}) => this.$root.$emit('error', response.statusText))
        .finally(() => this.loading = false);
    }
  }
}
</script>
