<template>
  <div class="d-block">
    <div class="pa-4 d-flex justify-center align-center">
      <h1 v-text="$t('text.musics')"/>
      <v-spacer/>
      <v-btn v-if="!playlist.mine && !playlist.library" key="attach" class="mx-1" rounded color="blue"
             dark @click="attach">
        <v-icon>mdi-plus</v-icon>
        {{ $t('text.join_playlist') }}
      </v-btn>
      <v-btn v-else-if="!playlist.mine" key="detach" class="mx-1" rounded @click="detach">
        <v-icon>mdi-close</v-icon>
        {{ $t('text.left_playlist') }}
      </v-btn>
      <v-btn class="mx-1 d-none d-sm-block" rounded color="primary" @click="shuffle">
        <v-icon>mdi-shuffle</v-icon>
        {{ $t('text.shuffle') }}
      </v-btn>
    </div>
    <music-manager :musics="playlist.musics" v-if="playlist.musics.length > 0" :playlist-remove="playlist.mine"/>
    <empty v-else :text="$t('text.playlist_is_empty')" height="400"/>
  </div>
</template>

<script>
import MusicManager from "../musics/musicManager";
import Empty from "../empty";

export default {
  name: "playlistRoot",

  components: {Empty, MusicManager},

  props: ['playlist'],

  methods: {
    shuffle: function () {
      let array = this.shuffleArray(this.playlist.musics);
      this.$root.$emit('list', array, array[0]);
    },
    attach() {
      this.loading = true;
      this.$api.post(`libraries`, {
        art_id: this.playlist.id,
        art_type: 'playlist',
      }).then(({data}) => {
        this.playlist.library = true;
        this.$root.$emit('success', this.$t('text.added_to_library'));
      }).catch(({response}) => this.$root.$emit('error', response.status === 401 ? this.$t('text.please_login_or_register') : response.statusText))
        .finally(() => this.loading = false);
    },
    detach() {
      this.loading = true;
      this.$api.put(`libraries/${this.playlist.id}`, {
        art_id: this.playlist.id,
        art_type: 'playlist',
      }).then(({data}) => {
        this.playlist.library = false;
        this.$root.$emit('success', this.$t('text.removed_from_library'));
      }).catch(({response}) => this.$root.$emit('error', response.status === 401 ? this.$t('text.please_login_or_register') : response.statusText))
        .finally(() => this.loading = false);
    },
  }
}
</script>

<style scoped>

</style>
