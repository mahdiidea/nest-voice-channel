<template>
  <v-dialog v-model="dialog" width="600px">
    <v-card :loading="loading">
      <v-card-title>{{ $t('text.select_playlist') }}</v-card-title>
      <v-divider/>
      <v-list two-line>
        <v-list-item v-for="(x, i) in playlists.data" :key="`${x.id}-${i}`" @click="pick(x)" two-line>
          <v-list-item-avatar>
            <v-img :src="x.picture" aspect-ratio="1"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="x.title"/>
            <v-list-item-subtitle>
              {{ x.musics_count }} {{ $t('text.music') }}, {{ x.users_counts }} {{ $t('text.member') }},
              {{ $t(`text.${x.type}`) }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="$emit('dialogStatus', false)" color="primary" text rounded v-text="$t('text.close')"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import PlaylistManager from "./playlistManager";

export default {
  name: "playlistPicker",

  components: {PlaylistManager},

  props: ['dialog'],

  model: {
    prop: 'dialog',
    event: 'dialogStatus'
  },

  watch: {
    dialog: function (newVal, oldVal) {
      this.$emit('dialogStatus', newVal);
      if (!oldVal && newVal) {
        this.fetch();
      }
    }
  },

  data: () => ({
    loading: false,
    playlists: {
      data: [],
      total: 0,
      last_page: 1,
      current_page: 0
    }
  }),

  methods: {
    pick: function (x) {
      this.$emit('pick', x);
      this.$emit('dialogStatus', false);
    },
    fetch: function (page = 1) {
      if (page > this.playlists.last_page) return;
      if (page <= this.playlists.current_page) return;
      this.loading = true;
      this.$api.get(`playlists`, {
        params: {
          page: page,
          scope: "mine"
        }
      }).then(({data}) => {
        for (let i = 0; i < data.data.length; i++) {
          this.playlists.data.push(data.data[i]);
        }
        this.playlists.current_page = page;
        this.playlists.total = data.total;
        this.playlists.last_page = data.last_page;
        this.playlists.current_page = data.current_page;
      }).finally(() => this.loading = false);
    }
  }
}
</script>

<style scoped>

</style>
