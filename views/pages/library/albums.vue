<template>
  <v-container class="pa-0" fluid>
    <v-container fluid id="main" class="px-0 px-sm-4 pt-6">

      <h1 class="d-flex mx-4 mx-sm-0 text-start" v-text="$t('text.library_album')"/>

      <div v-if="albums.total > 0">
        <album-manager :loading="albums.loading" :albums="albums.data"/>
        <small class="my-2" v-intersect="onIntersect">
          {{ `Loaded ${albums.data.length} from ${albums.total}` }}
        </small>
      </div>
      <empty v-else :text="$t('text.library_empty')" :height="400"/>

    </v-container>
  </v-container>
</template>

<script>
import AlbumManager from "~/components/albums/albumManager";
import Empty from "~/components/empty";

export default {
  name: "libraryAlbums",

  components: {Empty, AlbumManager},

  head: () => ({
    title: 'Library albums',
  }),

  data: () => ({
    loading: false,
    isIntersecting: false,
    albums: {
      data: [],
      total: 1,
      requested: 0,
      last_page: 1,
      current_page: 0,
      loading: false
    }
  }),

  async fetch() {
    await this.fetch(1)
  },

  methods: {
    onIntersect(entries, observer) {
      if (this.isIntersecting === false && entries[0].isIntersecting === true) {
        let page = this.albums.current_page === undefined ? 1 : (this.albums.current_page + 1);
        this.fetch(page);
      }
      this.isIntersecting = entries[0].isIntersecting;
    },
    fetch: function (page = 1) {
      if (page <= this.albums.requested) return;
      if (page > this.albums.last_page) return;
      if (page <= this.albums.current_page) return;
      this.albums.loading = true;
      this.albums.requested = page;
      this.$api.get(`libraries`, {
        params: {
          page: page,
          art_type: 'album'
        }
      }).then(({data}) => {
        for (let i = 0; i < data.data.length; i++) {
          this.albums.data.push(data.data[i]);
        }
        this.albums.current_page = page;
        this.albums.total = data.total;
        this.albums.last_page = data.last_page;
        this.albums.current_page = data.current_page;
      }).finally(() => this.albums.loading = false);
    },
  }
}
</script>

<style scoped>

</style>
