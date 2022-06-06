<template>
  <v-container fluid>
    <v-row v-if="playlist != null">
      <v-col cols="12" sm="3">
        <v-card elevation="2" outlined>
          <v-img aspect-ratio="1" :src="playlist.picture"/>

          <v-divider/>

          <v-card-title>
            {{ playlist.title }}
            <v-spacer/>

            <v-chip v-ripple class="clickable mr-2" v-if="playlist.type === 'private'">
              <v-icon left>mdi-lock</v-icon>
              {{ $t('text.private') }}
            </v-chip>
            <v-chip v-ripple class="clickable" v-else>
              <v-icon left>mdi-earth</v-icon>
              {{ $t('text.public') }}
            </v-chip>
          </v-card-title>

          <v-card-subtitle>
            {{
              `${playlist.musics.length} ${$t('text.music')},
                        ${playlist.users_count} ${$t('text.member')}`
            }},
            {{ duration }} {{ $t('text.minute') }}
          </v-card-subtitle>

          <v-divider v-if="playlist.description != null && playlist.description.length"/>

          <v-card-text v-if="playlist.description != null && playlist.description.length">
            {{ playlist.description }}
          </v-card-text>
        </v-card>

        <v-card elevation="2" class="mt-4" outlined>
          <v-list>
            <v-list-item :to="localePath(`/profile/${playlist.creator.id}`)" two-line>
              <v-list-item-avatar>
                <v-avatar color="blue-grey">
                  <v-img v-if="playlist.creator.picture !== null" :src="playlist.creator.picture"/>
                  <span v-else class="white--text headline" v-text="playlist.creator.name.substring(0, 1)"/>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="playlist.creator.name" />
                <v-list-item-subtitle v-text="$t('text.creator')"/>
              </v-list-item-content>
              <v-list-item-action-text v-if="playlist.mine">{{ $t('text.you') }}</v-list-item-action-text>
            </v-list-item>
          </v-list>
        </v-card>

        <div class="d-block mt-4 d-sm-none">
          <playlist-root :playlist="playlist"/>
        </div>

        <v-card elevation="2" class="mt-4" outlined v-if="artists.length > 0">
          <v-card-title>{{ $t('text.artists_in_this_playlist') }}</v-card-title>
          <v-divider/>
          <v-list>
            <v-list-item v-for="x in artists" :key="x.id" :to="localePath(`/artists/${x.id}`)">
              <v-list-item-avatar>
                <v-img :src="x.picture" aspect-ratio="1"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ $vuetify.rtl ? x.nameFa : x.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card elevation="2" class="mt-4" outlined v-if="playlist.mine">
          <v-list>
            <v-list-item @click="dialogShare = true">
              <v-list-item-icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('text.share_playlist') }}</v-list-item-title>
            </v-list-item>
            <v-list-item :to="localePath(`/playlists/${playlistId}/update`)">
              <v-list-item-icon>
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('text.update_playlist') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dialogDelete = true">
              <v-list-item-icon>
                <v-icon>mdi-delete</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('text.delete_playlist') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" sm="9" class="d-none d-sm-block">
        <playlist-root :playlist="playlist"/>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogShare" width="500" v-if="playlist != null">
      <v-card>
        <v-card-title class="headlines">
          {{ $t('text.share_playlist') }}
        </v-card-title>
        <v-divider/>
        <v-card-text class="pa-4" v-if="playlist.type === 'public'">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="9">
              <v-text-field filled :label="$t('text.share_url')" :value="currentURL"
                            readonly hide-details rounded id="shareURL"
                            append-icon="mdi-link"/>
            </v-col>
            <v-col cols="12" sm="3" class="text-center">
              <v-btn rounded color="primary" class="mx-2" @click="copyShareURL">
                <v-icon>mdi-content-copy</v-icon>
                {{ $t('text.copy') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text class="pa-4" v-else>
          {{ $t('text.private_playlist_des') }} <br/> {{ $t('text.private_playlist_des2') }}
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-spacer/>
          <v-btn rounded color="primary" text @click="dialogShare = false" v-text="$t('text.close')"/>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="drop.dialog" width="500">
      <v-card :loading="drop.loading">
        <v-card-title v-text="$t('text.remove_music_from_playlist')"/>
        <v-divider/>
        <v-card-actions>
          <v-spacer/>
          <v-btn rounded color="primary" @click="drop.dialog = false" v-text="$t('text.cancel')"/>
          <v-btn rounded color="primary" :loading="drop.loading" text @click="dropConfirm">
            <v-icon>mdi-delete</v-icon>
            {{ $t('text.remove') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" width="500">
      <v-card>
        <v-card-title class="headlines" v-text="$t('text.delete_playlist')"/>
        <v-divider/>
        <v-card-text class="pa-5" v-text="$t('text.delete_playlist_q')"/>
        <v-divider/>
        <v-card-actions>
          <v-spacer/>
          <v-btn rounded color="primary" @click="dialogDelete = false" v-text="$t('text.cancel')"/>
          <v-btn rounded color="primary" :loading="loading" text @click="destroy">
            <v-icon>mdi-delete</v-icon>
            {{ $t('text.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import PlaylistRoot from "~/components/playlists/playlistRoot";

export default {
  name: "index",

  components: {PlaylistRoot},

  head: () => ({
    title: 'Playlist',
  }),

  data: () => ({
    playlist: null,
    loading: false,
    dialogShare: false,
    dialogDelete: false,
    drop: {
      dialog: false,
      loading: false,
      musicId: null
    }
  }),

  computed: {
    playlistId: function () {
      return this.$route.params.slug;
    },
    artists: function () {
      let array = [];

      for (let i = 0; i < this.playlist.musics.length; i++) {
        for (let j = 0; j < this.playlist.musics[i].artists.length; j++) {
          if (!this.isInArrayObject(array, 'id', this.playlist.musics[i].artists[j].id)) {
            array.push(this.playlist.musics[i].artists[j]);
          }
        }
      }

      return array;
    },
    currentURL: function () {
      return window.location.href;
    },
    duration: function () {
      let dr = 0;
      for (let i = 0; i < this.playlist.musics.length; i++) {
        dr += this.playlist.musics[i].duration;
      }
      return Math.round(dr / 60);
    },
  },

  watch: {
    playlistId: function () {
      this.fetch();
    }
  },

  created() {
    this.fetch();
    this.$root.$on('playlist_remove', this.dropItem);
  },

  destroyed() {
    this.$root.$on('playlist_remove', null);
  },

  methods: {
    dropItem(musicId) {
      this.drop.musicId = musicId;
      this.drop.dialog = true;
    },
    dropConfirm() {
      this.drop.loading = true;
      this.drop.dialog = false;
      this.$api.delete(`playlists/${this.playlistId}`, {
        params: {
          music_id: this.drop.musicId
        }
      }).then(({data}) => {
        this.$root.$emit('success', this.$t('text.success'));
        this.fetch();
      }).finally(() => this.drop.loading = false);
    },
    fetch: function () {
      this.loading = true;
      this.$api.get(`playlists/${this.playlistId}`)
        .then(({data}) => this.playlist = data)
        .finally(() => this.loading = false);
    },
    destroy: function () {
      this.loading = true;
      this.$api.delete(`playlists/${this.playlistId}`)
        .then(({data}) => {
          this.$root.$emit('success', this.$t('text.success'));
          this.gotoPath(`/playlists`);
        }).finally(() => this.loading = false);
    },
    copyShareURL: function () {
      let shareInput = document.getElementById("shareURL");
      shareInput.select();
      shareInput.setSelectionRange(0, 99999);
      document.execCommand("copy");
    }
  }
}
</script>

<style scoped>

</style>
