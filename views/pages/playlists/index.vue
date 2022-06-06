<template>
  <v-container fluid>
    <div class="d-flex align-center w-100">
      <h1>
        <span class="d-none d-sm-block">{{ $t('text.your_playlists') }}</span>
        <span class="d-block d-sm-none">{{ $t('text.playlists') }}</span>
      </h1>
      <v-spacer/>
      <v-btn color="primary" :to="localePath('/playlists/create')" rounded>
        <v-icon>mdi-plus</v-icon>
        <span class="d-none d-sm-block">{{ $t('text.new_playlist') }}</span>
        <span class="d-block d-sm-none">{{ $t('text.create') }}</span>
      </v-btn>
    </div>
    <div class="d-block" v-if="mine.total">
      <playlist-manager :playlists="mine.data" :loading="mine.loading"/>
      <small class="my-2" v-intersect="onIntersect">{{ `Loaded ${mine.data.length} from ${mine.total}` }}</small>
    </div>

    <empty :text="$t('text.no_playlist')" :height="400" v-else/>
  </v-container>
</template>

<script>
import PlaylistManager from "~/components/playlists/playlistManager";
import Empty from "~/components/empty";

export default {
  name: "index",

  components: {Empty, PlaylistManager},

  head: () => ({
    title: 'Playlists'
  }),

  data: () => ({
    isIntersecting: false,
    mine: {
      data: [],
      total: 1,
      loading: false,
      last_page: 1,
      current_page: 0
    },
    trend: {
      data: [],
      loading: false,
      last_page: 1,
      current_page: 0
    }
  }),

  methods: {
    onIntersect(entries, observer) {
      if (this.isIntersecting === false && entries[0].isIntersecting === true) {
        let page = this.mine.current_page === undefined ? 1 : (this.mine.current_page + 1);
        this.fetchMine(page);
      }
      this.isIntersecting = entries[0].isIntersecting;
    },
    fetchMine: function (page = 1) {
      if (page > this.mine.last_page) return;
      if (page <= this.mine.current_page) return;
      this.mine.loading = true;
      this.$api.get(`playlists`, {
        params: {
          page: page
        }
      }).then(({data}) => {
        for (let i = 0; i < data.data.length; i++) {
          this.mine.data.push(data.data[i]);
        }
        this.mine.total = data.total;
        this.mine.last_page = data.last_page;
        this.mine.current_page = data.current_page;
        this.$forceUpdate();
      }).finally(() => this.mine.loading = false);
    }
  }
}
</script>

<style scoped>

</style>
