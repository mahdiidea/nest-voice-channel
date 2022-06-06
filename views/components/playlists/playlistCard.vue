<template>
  <v-card outlined class="clickable" :to="localePath(`/playlists/${playlist.id}`)" v-ripple>
    <v-img :src="playlist.picture" gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.4)" aspect-ratio="1">
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0 blue-grey" align="center" justify="center">
          <v-icon x-large>mdi-playlist-music</v-icon>
        </v-row>
      </template>
      <v-row no-gutters align="end" class="lightbox white--text px-2 py-1 fill-height">
        <v-col>
          <div class="headlines">{{ playlist.title }}</div>
          <div class="body-1">
            {{ playlist.musics_count }} {{ $t('text.music') }},
            {{ playlist.users_count }} {{ $t('text.member') }}
          </div>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "playlistCard",

  props: ['playlist'],

  data: () => ({
    imgHeight: 150,
  }),
}
</script>

<style scoped>
.body-1 {
  color: #dedede;
}

.headline {
  font-weight: bold;
}
</style>
