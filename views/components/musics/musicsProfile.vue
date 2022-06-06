<template>
  <div class="d-block" itemscope itemtype="https://schema.org/MusicGroup">
    <div class="d-content" v-if="music != null">
      <v-card dark tile min-height="385" id="app-bar" class="blue-grey py-10">
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <v-img @load="gradient" width="300" height="300" :src="music.picture"
                   class="rounded elevation-4 mx-auto ms-md-auto me-md-0"/>
          </v-col>
          <v-col cols="12" md="8" class="d-flex align-center justify-center justify-md-start">

            <div class="d-block ms-4">

              <div class="d-flex align-center justify-center justify-md-start flex-wrap">
                <v-btn v-if="availabilities" :loading="fullPageLoading"
                       class="me-2" @click="play" color="primary" fab>
                  <v-icon>mdi-play</v-icon>
                </v-btn>
                <h1 class="ms-2" v-text="$vuetify.rtl ? music.titleFa : music.title"/>
              </div>

              <div v-if="availabilities"
                   class="d-flex align-center justify-center justify-md-start my-5 my-md-0 flex-wrap">

                <v-tooltip v-if="music.library" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" class="me-2 mt-2" @click="subLibrary" v-bind="attrs" v-on="on" rounded>
                      <v-icon>mdi-close</v-icon>
                      {{ $t('text.remove') }}
                    </v-btn>
                  </template>
                  <span v-text="$t('text.remove_from_library')"/>
                </v-tooltip>

                <v-tooltip v-else top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" class="me-2 mt-2" @click="addLibrary" v-bind="attrs" v-on="on" rounded>
                      <v-icon>mdi-plus</v-icon>
                      {{ $t('text.add') }}
                    </v-btn>
                  </template>
                  <span v-text="$t('text.add_to_library')"/>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn @click="shareToTelegram" color="secondary" v-bind="attrs" v-on="on" class="me-2 mt-2"
                           rounded>
                      <v-icon small>mdi-send</v-icon>
                      {{ $t('text.telegram') }}
                    </v-btn>
                  </template>
                  <span v-text="$t('text.share_to_telegram')"/>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn @click="share" color="secondary" class="me-2 mt-2" v-bind="attrs" v-on="on" rounded>
                      <v-icon small>mdi-share-variant</v-icon>
                      {{ $t('text.share') }}
                    </v-btn>
                  </template>
                  <span v-text="$t('text.copy_share_url')"/>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark color="secondary" class="me-2 mt-2" :href="`/storage/download/${music.id}`"
                           v-bind="attrs" v-on="on" target="_blank" rounded>
                      <v-icon>mdi-download</v-icon>
                      {{ $t('text.download') }}
                    </v-btn>
                  </template>
                  <span v-text="$t('text.download_music_file')"/>
                </v-tooltip>

                <report object_type="music" :object_id="music.id"
                        :music_name="$vuetify.rtl ? music.titleFa : music.title"/>
              </div>

              <v-alert v-else prominent type="warning">
                {{ $t('text.unavailable_music') }}
              </v-alert>

              <div class="d-flex align-center justify-center justify-md-start flex-wrap">
                <v-chip class="me-2 mt-2" v-ripple pill>
                  <v-icon>mdi-av-timer</v-icon>
                  {{ timeDuration(music.duration) }}
                </v-chip>

                <v-chip class="me-2 mt-2" v-ripple pill>
                  <v-icon>mdi-music-circle-outline</v-icon>
                  {{ megabyte(music.size) }}
                </v-chip>

                <v-chip v-for="(x, i) in music.artists" :key="i" v-ripple pill
                        class="me-2 mt-2" property="byArtist" :to="localePath(`/artists/${x.id}`)">
                  <v-avatar left>
                    <v-img :alt="`${x.nameFa} - ${x.name}`" :src="x.picture"/>
                  </v-avatar>
                  {{ $vuetify.rtl ? x.nameFa : x.name }}
                </v-chip>
              </div>

              <div class="d-flex align-center justify-center justify-md-start flex-wrap">
                <v-btn @click="playlistDialog = true" v-if="$root.user != null" color="blue-grey"
                       class="me-2 mt-2" dark small rounded>
                  <v-icon small>mdi-playlist-music</v-icon>
                  {{ $t('text.add_to_playlist') }}
                </v-btn>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip v-bind="attrs" v-on="on" class="me-2 mt-2">
                      {{ abbreviateNumber(music.users_count) }} {{ $t('text.saved') }}
                    </v-chip>
                  </template>
                  <span v-text="$t('text.user_added_to_their_library', {count: numberFormat(music.users_count)})"/>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip v-bind="attrs" v-on="on" class="me-2 mt-2">
                      {{ abbreviateNumber(music.downloads) }} {{ $t('text.downloads') }}
                    </v-chip>
                  </template>
                  <span
                    v-text="$t('text.download_with_impression', {download: numberFormat(music.downloads), impression: numberFormat(music.impressions)})"/>
                </v-tooltip>


                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip v-bind="attrs" v-on="on" class="me-2 mt-2">
                      {{ ago(music.created_at) }}
                    </v-chip>
                  </template>
                  <span
                    v-text="datetime(music.created_at, $vuetify.rtl ? 'ddd jDD jMMMM jYYYY ساعت HH:mm A' : 'LLLL', $vuetify.rtl)"/>
                </v-tooltip>

              </div>

            </div>

          </v-col>
        </v-row>
      </v-card>

      <full-page-loading :loading="fullPageLoading"/>

      <v-container fluid class="pa-4">
        <v-row justify="center">
          <v-col cols="12" sm="8">
            <music-lyric :music="music" v-on:change="$emit('change')"/>
            <comments-index :object-id="music.id" object-type="App\Music"/>
            <music-similar-artists :artists="music.suggestions.artists" />
            <music-tags-card :tags="music.tags" :share-link="shareLink"/>
          </v-col>
          <v-col cols="12" sm="4">
            <music-album-card :album="music.album"/>
            <music-you-may-like :suggestions="music.suggestions.musics" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import ColorThief from "colorthief";
import MusicLyric from "./musicLyric";
import Report from "../reports/report";
import MusicTagsCard from "./musicTagsCard";
import MusicAlbumCard from "./musicAlbumCard";
import MusicYouMayLike from "./musicYouMayLike";
import FullPageLoading from "../fullPageLoading";
import CommentsIndex from "../comments/commentsIndex";
import MusicSimilarArtists from "./musicSimilarArtists";

export default {
  name: "musicsProfile",

  components: {
    MusicSimilarArtists,
    MusicTagsCard,
    MusicYouMayLike,
    MusicAlbumCard,
    MusicLyric,
    CommentsIndex,
    FullPageLoading,
    Report
  },

  props: {
    music: Object,
    fullPageLoading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    availabilities() {
      return this.music != null && this.music.deleted_at == null;
    },
    shareLink: function () {
      if (this.music.performer != null && this.music.performer.length > 0 && this.music.title != null && this.music.title.length > 0)
        return `${this.$config.nuxtUrl}/musics/${this.music.performer.replace(/ /g, '_').toLowerCase()}/${this.music.title.replace(/ /g, '_').toLowerCase()}`;
      else
        return `${this.$config.nuxtUrl}/musics/${this.music.id}`;
    }
  },

  methods: {
    play(x) {
      this.$root.$emit('play', this.music);
    },
    gradient(source) {
      const colorThief = new ColorThief();
      const img = new Image();

      img.addEventListener('load', function () {
        let palette = colorThief.getPalette(img, 2);
        let element = document.getElementById("app-bar");
        element.style.background = `linear-gradient(45deg, rgba(${palette[0][0]},${palette[0][1]},${palette[0][2]},1) 0%, rgba(${palette[1][0]},${palette[1][1]},${palette[1][2]},1) 100%)`
      });

      img.crossOrigin = 'Anonymous';
      img.src = source;
    },
    shareToTelegram() {

    },
    addLibrary() {
      if (!this.$auth.loggedIn) {
        return this.gotoPath('login');
      }

      this.loading = true;
      this.$api.post(`libraries`, {
        art_id: this.music.id,
        art_type: 'music',
      }).then(({data}) => {
        this.music.library = true;
        this.music.users_count += 1;
        this.$root.$emit('success', this.$t('text.added_to_library'));
      })
        .catch(({response}) => this.$root.$emit('error', response.status === 401 ? this.$t('text.please_login_or_register') : response.statusText))
        .finally(() => this.loading = false);
    },
    subLibrary() {
      if (!this.$auth.loggedIn) {
        return this.gotoPath('login');
      }

      this.loading = true;
      this.$api.put(`libraries/${this.music.id}`, {
        art_id: this.music.id,
        art_type: 'music',
      }).then(({data}) => {
        this.music.library = false;
        this.music.users_count -= 1;
        this.$root.$emit('success', this.$t('text.removed_from_library'));
      })
        .catch(({response}) => this.$root.$emit('error', response.status === 401 ? this.$t('text.please_login_or_register') : response.statusText))
        .finally(() => this.loading = false);
    },
    share() {
      const el = document.createElement('textarea');
      el.value = this.shareLink;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$root.$emit('success', this.$t('text.share_link_copied'));
    },
  }
}
</script>

<style scoped>
svg .rotate {
  animation: rotate 5s linear infinite;
  transform-box: fill-box;
  transform-origin: center;
}
</style>
