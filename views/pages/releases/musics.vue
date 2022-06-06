<template>
  <v-container class="pa-0 pa-sm-2" fluid>
    <h1 v-text="$t('text.musics')"/>
    <music-manager :loading="loading" :musics="musics.data"/>
    <small class="my-2" v-intersect="onIntersect">{{ `Loaded ${musics.data.length} from ${musics.total}` }}</small>
  </v-container>
</template>

<script>
import MusicManager from "~/components/musics/musicManager";

export default {
  name: "musics",

  components: {MusicManager},

  head: () => ({
    title: 'Browse musics',
  }),

  data: () => ({
    loading: false,
    isIntersecting: false,
    requested: 0,
    musics: {
      data: [],
      total: 0,
      last_page: 1,
      current_page: 0
    },
  }),

  methods: {
    onIntersect(entries, observer) {
      if (this.isIntersecting === false && entries[0].isIntersecting === true) {
        let page = this.musics.current_page === undefined ? 1 : (this.musics.current_page + 1);
        this.fetch(page);
      }
      this.isIntersecting = entries[0].isIntersecting;
    },
    fetch: function (page = 1) {
      if (page <= this.requested) return;
      if (page > this.musics.last_page) return;
      if (page <= this.musics.current_page) return;
      this.loading = true;
      this.requested = page;
      this.$api.get(`releases/music`, {
        params: {
          page: page
        }
      }).then(({data}) => {
        for (let i = 0; i < data.data.length; i++) {
          this.musics.data.push(data.data[i]);
        }
        this.musics.current_page = page;
        this.musics.total = data.total;
        this.musics.last_page = data.last_page;
        this.musics.current_page = data.current_page;
      }).finally(() => this.loading = false);
    },
  }
}
</script>

<style scoped>

</style>
