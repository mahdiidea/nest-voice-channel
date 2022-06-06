<template>
  <v-container class="pa-0 pa-sm-2" fluid>
    <div class="d-flex">
      <h1 v-text="$t('text.library_musics')"/>
      <v-spacer/>
      <v-btn rounded color="primary" class="my-1" @click="shuffle">
        <v-icon>mdi-shuffle</v-icon>
        {{ $t('text.shuffle') }}
      </v-btn>
    </div>

    <div class="d-block" v-if="musics.total > 0">
      <music-manager :musics="musics.data" :loading="loading"/>

      <small class="my-2" v-intersect="onIntersect" v-text="`Loaded ${musics.data.length} from ${musics.total}`"/>
    </div>
    <empty v-else :text="$t('text.library_empty')" :height="400"/>
  </v-container>
</template>

<script>
import MusicManager from "~/components/musics/musicManager"
import Empty from "~/components/empty";

export default {
  name: "libraryMusics",

  components: {Empty, MusicManager},

  head: () => ({
    title: 'Library musics',
  }),

  data: () => ({
    loading: false,
    errorMessage: "",
    isIntersecting: false,
    showErrorMessage: false,
    showSuccessMessage: false,
    requested: 0,
    musics: {
      data: [],
      total: 1,
      last_page: 1,
      current_page: 0,
    }
  }),

  methods: {
    shuffle: function () {
      let sh = this.shuffleArray(this.musics.data);
      this.$root.$emit('list', sh, sh[0]);
    },
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
      this.$api.get(`libraries`, {
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
    }
  }
}
</script>
