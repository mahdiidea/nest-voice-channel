<template>
  <v-container class="pa-0 pa-sm-2" fluid>
    <h1 v-text="$t('text.albums')"/>
    <album-manager :loading="loading" :albums="albums.data"/>
    <v-card v-intersect="onIntersect"/>
  </v-container>
</template>

<script>
import albumCard from "~/components/albums/albumCard";
import AlbumManager from "~/components/albums/albumManager";

export default {
  name: "albums",

  components: {AlbumManager, albumCard},

  head: () => ({
    title: 'Browse albums',
  }),

  data: () => ({
    requested: 0,
    loading: false,
    isIntersecting: false,
    albums: {
      data: [],
    },
  }),

  methods: {
    onIntersect(entries, observer) {
      if (this.isIntersecting === false && entries[0].isIntersecting === true) {
        let page = this.albums.current_page === undefined ? 1 : (this.albums.current_page + 1);
        this.fetch(page);
      }
      this.isIntersecting = entries[0].isIntersecting;
    },
    fetch: function (page = 1) {
      if (page <= this.requested) return;
      this.loading = true;
      this.requested = page;
      this.$api.get(`releases/album`, {
        params: {
          page: page
        }
      }).then(({data}) => {
        for (let i = 0; i < data.data.length; i++) {
          this.albums.data.push(data.data[i]);
        }
        this.albums.current_page = page;
      }).finally(() => this.loading = false);
    }
  }
}
</script>

<style scoped>

</style>
