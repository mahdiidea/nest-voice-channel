<template>
  <v-card class="mb-4" elevation="2" outlined v-if="album != null">
    <v-card-title v-text="$t('text.album')"/>
    <v-divider/>
    <v-img :src="album.cover" class="grey clickable lighten-2 white--text align-end"
           :to="localePath(`/albums/${album.id}`)" v-ripple
           gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5"/>
        </v-row>
      </template>
      <v-card-title>
        <h2>{{ $vuetify.rtl ? album.nameFa : album.name }}</h2>
        <v-spacer/>
        <v-chip small light class="mx-1">
          <v-icon small>mdi-music-note</v-icon>
          {{ album.musics.length }} {{ $t('text.music') }}
        </v-chip>
        <v-chip small light class="mx-1">
          <v-icon small>mdi-timer</v-icon>
          {{ albumDuration(album.musics) }} {{ $t('text.minute') }}
        </v-chip>
      </v-card-title>
    </v-img>
    <v-divider/>
    <music-list-manager :musics="album.musics"/>
  </v-card>
</template>

<script>
import MusicListManager from "./musicListAdapter";

export default {
  name: "musicAlbumCard",

  components: {MusicListManager},

  props: {
    album: Object
  },

  methods: {
    albumDuration(musics) {
      let dr = 0;
      for (let i = 0; i < musics.length; i++) {
        dr += musics[i].duration;
      }
      return Math.round(dr / 60);
    },
  }
}
</script>

<style scoped>

</style>
