<template>
  <v-container class="pa-0 pa-sm-4" fluid>

    <div class="d-flex ma-3 justify-center align-center" v-if="musics.length > 0">
      <h1 v-text="$t('text.musics')"/>
      <v-spacer/>
      <v-btn color="primary" :to="localePath('/releases/musics')" text rounded v-text="$t('text.see_all')"/>
    </div>
    <music-manager :musics="musics" :loading="loading"/>

    <div class="d-flex ma-3 justify-center align-center" v-if="albums.length > 0">
      <h1 v-text="$t('text.albums')"/>
      <v-spacer/>
      <v-btn color="primary" :to="localePath('/releases/albums')" text rounded v-text="$t('text.see_all')"/>
    </div>
    <div class="d-block px-4">
      <album-manager :albums="albums" :loading="loading"/>
    </div>

    <div class="d-flex ma-3 justify-center align-center" v-if="artists.length > 0">
      <h1 v-text="$t('text.artists')"/>
      <v-spacer/>
    </div>
    <div class="d-block px-4">
      <artist-manager :artists="artists" :loading="loading"/>
    </div>
  </v-container>
</template>

<script>
import AlbumCard from "~/components/albums/albumCard"
import AlbumManager from "~/components/albums/albumManager";
import MusicManager from "~/components/musics/musicManager";
import ArtistAvatar from "~/components/artists/artistAvatar";
import ArtistManager from "~/components/artists/artistManager";

export default {
  name: "releases",

  components: {ArtistManager, AlbumManager, MusicManager, ArtistAvatar, AlbumCard},

  head: () => ({
    title: "Browse"
  }),

  data: () => ({
    loading: false,
    errorMessage: "",
    musics: [],
    albums: [],
    artists: []
  }),

  async fetch() {
    await this.fetch();
  },

  methods: {
    fetch() {
      this.loading = true;
      this.$api.get(`releases`).then(({data}) => {
        this.musics = data.musics;
        this.albums = data.albums;
        this.artists = data.artists;
      }).finally(() => this.loading = false);
    }
  }
}
</script>

<style scoped>

</style>
