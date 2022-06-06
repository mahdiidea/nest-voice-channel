<template>
  <v-container class="pa-0" v-resize="onResize" fluid>
    <music-card-manager :playlist-remove="playlistRemove" :musics="musics"
                        :loading="loading" v-if="windowSize.x > 700"/>

    <music-list-manager :playlist-remove="playlistRemove" :musics="musics"
                        :loading="loading" v-else/>
  </v-container>
</template>

<script>
import MusicCardManager from "./musicCardManager";
import MusicListManager from "./musicListAdapter";

export default {
  name: "musicManager",

  props: ['musics', 'loading', 'playlistRemove'],

  components: {MusicListManager, MusicCardManager},

  data: () => ({
    windowSize: {
      x: 0,
      y: 0,
    },
  }),

  mounted() {
    this.onResize()
  },

  methods: {
    onResize() {
      this.windowSize = {x: window.innerWidth, y: window.innerHeight}
    },
  }
}
</script>

<style scoped>

</style>
