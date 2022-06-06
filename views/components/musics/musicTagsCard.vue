<template>
  <v-card elevation="2" outlined v-if="tags != null" class="mb-4">
    <v-card-title v-text="$t('text.tags')" />
    <v-divider />
    <v-card-text>
      <v-chip class="ma-1" small v-for="(x, i) in tags" :href="shareLink" v-text="x" :key="i"/>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "musicTagsCard",

  props: {
    tags: [Array, Object],
    shareLink: String
  }
}
</script>

<style scoped>

</style>
