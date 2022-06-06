<template>
  <v-card tile color="transparent" v-ripple="false" class="d-block artist text-center"
          elevation="0" :to="localePath(`/artists/${artist.id}`)" v-resize="onResize">
    <v-avatar :height="imgHeight" :width="imgHeight" class="mx-auto my-2 clickable" v-ripple>
      <v-img :src="artist.picture != null ? artist.picture : ''" class="grey lighten-2">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"/>
          </v-row>
        </template>
      </v-img>
    </v-avatar>
    <h2 class="text-center my-2 clickable">{{ $vuetify.rtl ? artist.nameFa : artist.name }}</h2>
  </v-card>
</template>

<script>
export default {
  name: "artistAvatar",

  props: ['artist'],

  data: () => ({
    imgHeight: 150
  }),

  mounted() {
    this.onResize();
  },

  methods: {
    onResize: function () {
      this.imgHeight = document.getElementsByClassName("artist")[0].clientWidth;
    }
  }
}
</script>

<style scoped>

</style>
