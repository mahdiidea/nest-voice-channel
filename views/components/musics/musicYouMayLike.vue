<template>
  <v-card class="mb-4" v-if="suggestions != null" elevation="2" outlined>
    <v-card-title v-text="$t('text.you_may_like')"/>
    <v-divider/>
    <music-list-manager :musics="suggestions"/>
  </v-card>
</template>

<script>
import MusicListManager from "./musicListAdapter";

export default {
  name: "musicYouMayLike",

  components: {MusicListManager},

  props: {
    suggestions: [Array, Object]
  }
}
</script>

<style scoped>

</style>
