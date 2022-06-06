<template>
  <v-container fluid>
    <full-page-loading :loading="loading"/>

    <div v-if="faves != null" class="d-content">
      <people :people="faves.people" />
    </div>
  </v-container>
</template>

<script>
import FullPageLoading from "~/components/fullPageLoading";
import People from "~/components/forYou/people";

export default {
  name: "index",

  components: {People, FullPageLoading},

  data: () => ({
    faves: null,
    loading: false
  }),

  async fetch() {
    await this.fetch()
  },

  methods: {
    fetch() {
      this.loading = true;
      this.$api.get(`favorite`)
        .then(({data}) => this.faves = data)
        .finally(() => this.loading = false);
    }
  }
}
</script>

<style scoped>

</style>
