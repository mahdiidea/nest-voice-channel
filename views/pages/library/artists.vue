<template>
  <v-container class="pa-0" fluid>
    <v-container fluid id="main" class="px-0 px-sm-4 pt-6">

      <div class="d-flex mx-4 mx-sm-0">
        <h1>{{ $t('text.library_artists') }}</h1>
        <v-spacer/>
      </div>

      <div v-if="artists.total > 0">
        <artist-manager :loading="artists.loading" :artists="artists.data"/>
        <small class="my-2" v-intersect="onIntersect">
          {{ `Loaded ${artists.data.length} from ${artists.total}` }}
        </small>
      </div>
      <empty v-else :text="$t('text.library_empty')" :height="400"/>

    </v-container>
  </v-container>
</template>

<script>
import ArtistManager from "~/components/artists/artistManager";
import Empty from "~/components/empty";

export default {
  name: "libraryArtists",

  components: {Empty, ArtistManager},

  head: () => ({
    title: 'Library artists',
  }),

  data: () => ({
    loading: false,
    isIntersecting: false,
    artists: {
      data: [],
      total: 0,
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
        let page = this.artists.current_page === undefined ? 1 : (this.artists.current_page + 1);
        this.fetch(page);
      }
      this.isIntersecting = entries[0].isIntersecting;
    },
    fetch: function (page = 1) {
      if (page <= this.artists.requested) return;
      if (page > this.artists.last_page) return;
      if (page <= this.artists.current_page) return;
      this.artists.loading = true;
      this.artists.requested = page;
      this.$api.get(`libraries`, {
        params: {
          page: page,
          art_type: 'artist'
        }
      }).then(({data}) => {
        for (let i = 0; i < data.data.length; i++) {
          this.artists.data.push(data.data[i]);
        }
        this.artists.current_page = page;
        this.artists.total = data.total;
        this.artists.last_page = data.last_page;
        this.artists.current_page = data.current_page;
      }).finally(() => this.artists.loading = false);
    },
  }
}
</script>

<style scoped>

</style>
