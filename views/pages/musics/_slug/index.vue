<template>
  <v-container class="pa-0" fluid>
    <musics-profile :full-page-loading="loading" :music="music" v-on:change="fetch"/>
  </v-container>
</template>

<script>
import MusicsProfile from "../../../components/musics/musicsProfile";

export default {
  name: "index",
  auth: false,

  props: {
    musicId: [String, Number]
  },

  components: {MusicsProfile},

  head: () => ({
    title: 'Music',
    meta: []
  }),

  data: () => ({
    loading: false,
    music: null,
    title: "Test"
  }),

  methods: {
    async fetch() {
      this.loading = true;
      return await this.$api.get(`musics/${this.musicId}`)
        .then(({data}) => this.music = data)
        .finally(() => this.loading = false);
    }
  }
}
</script>

<style scoped>

</style>
