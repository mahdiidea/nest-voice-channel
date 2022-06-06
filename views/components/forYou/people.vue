<template>
  <v-card color="transparent" elevation="0" flat>
    <v-card-title v-text="$t('text.people_like_you')"/>

    <div class="d-flex">
      <v-card v-for="(x, i) in people" :key="i" width="500" class="mx-3">
        <v-img :src="x.user.picture" height="100" class="white--text align-center"
               gradient="to top right, rgba(100, 115, 201, 0.66), rgba(25, 32, 72, 0.9)">

          <v-list-item :to="localePath(`/users/${x.user.id}`)" v-if="x.user">
            <v-avatar>
              <v-img :src="x.user.picture"/>
            </v-avatar>

            <v-list-item-content>
              <v-card-title v-text="x.user.name"/>
              <v-card-subtitle v-text="`${$t('text.joined')} ${ago(x.user.created_at)}`"/>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon class="circle" v-text="i + 1"/>
            </v-list-item-action>
          </v-list-item>

        </v-img>
        <v-divider/>
        <music-list-manager :musics="x.musics"/>
      </v-card>
    </div>

  </v-card>
</template>

<script>
import MusicListManager from "~/components/musics/musicListManager";

export default {
  name: "people",
  components: {MusicListManager},
  props: {
    people: [Object, Array]
  }
}
</script>

<style scoped>
.circle {
  border-radius: 100%;
  border: 2px solid white;
  line-height: 20px;
}
</style>
