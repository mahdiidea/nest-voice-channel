<template>
  <v-card elevation="2" outlined class="mb-4" v-if="artists != null">
    <v-card-title v-text="$t('text.similar_artists')"/>
    <v-divider/>
    <v-card-text>
      <div class="objects scrollbar" ref="objects" @mousemove="objectMousemove" @mouseup="objectMouseup"
           @mouseleave="objectMouseleave" @mousedown="objectMousedown">
        <v-card v-for="(x, i) in artists" :key="i" :to="localePath(`/artists/${x.id}`)"
                class="object me-3" elevation="0" color="transparent">
          <v-img :src="x.picture" class="rounded-circle overflow-hidden elevation-2" width="250" height="250"
                 :aspect-ratio="1"/>
          <v-card-subtitle class="px-0 text-center" v-text="x.name"/>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "musicSimilarArtists",

  props: {
    artists: [Array, Object]
  },

  data: () => ({
    /** drag and drop **/
    isDown: false,
    startX: null,
    scrollLeft: null,
  }),

  methods: {
    objectMousedown(e) {
      this.isDown = true;
      this.startX = e.pageX - this.$refs.objects.offsetLeft;
      this.scrollLeft = this.$refs.objects.scrollLeft;
    },
    objectMouseleave() {
      this.isDown = false;
    },
    objectMouseup() {
      this.isDown = false;
    },
    objectMousemove(e) {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - this.$refs.objects.offsetLeft;
      const walk = x - this.startX;
      this.$refs.objects.scrollLeft = this.scrollLeft - walk;
    },
  }
}
</script>

<style scoped>
.objects {
  overflow: auto;
  white-space: nowrap;
}

.object {
  display: inline-block;
  text-decoration: none;
}
</style>
