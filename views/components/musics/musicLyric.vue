<template>
  <v-card class="mb-4" v-if="music != null && music.deleted_at == null" :loading="loading" outlined elevation="4">
    <v-card-title>
      {{ $t('text.lyric') }}
      <v-spacer/>
      <div class="d-content" v-if="$auth.loggedIn && $auth.user != null">
        <v-btn v-if="!updating" @click="updating = true" color="primary" rounded>
          <v-icon>mdi-plus</v-icon>
          {{ has_lyric ? $t('text.update_lyric') : $t('text.add_lyric') }}
        </v-btn>
        <small v-else>{{ $t('text.click_on_apply') }}</small>
      </div>
      <div v-else class="d-none d-sm-flex grey--text">
        <v-btn href="/login" class="mx-2" color="primary" small rounded>
          {{ $t('text.login_register') }}
        </v-btn>
        <small>{{ $t('text.auth_to_update_lyric') }}</small>
      </div>
    </v-card-title>
    <v-divider/>
    <v-card flat elevation="0" v-if="updating">
      <v-card-text>
        <v-textarea height="500" v-model="object.lyric" outlined
                    :error-messages="errors.lyric" :disabled="loading"
                    :label="has_lyric ? $t('text.update_lyric') : $t('text.add_lyric')"/>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn v-if="!loading" text rounded @click="updating = false">
          {{ $t('text.cancel') }}
        </v-btn>
        <v-btn @click="store" color="primary"
               :loading="loading" min-width="130" rounded>
          <v-icon>mdi-check</v-icon>
          {{ $t('text.apply') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <div class="d-content" property="description" v-else>
      <v-card-text class="lyric scrollbar" v-if="has_lyric">
        {{ music.lyric }}
      </v-card-text>
      <empty v-else height="400" :text="$t('text.no_lyric')"/>
    </div>
  </v-card>
</template>

<script>
import Empty from "../empty";

export default {
  name: "musicLyric",
  components: {Empty},

  props: {
    music: Object
  },

  data: () => ({
    loading: false,
    updating: false,
    errors: {},
    object: {
      lyric: ''
    }
  }),

  computed: {
    has_lyric() {
      return this.music.lyric != null && this.music.lyric.length > 0;
    }
  },

  created() {
    this.object.lyric = this.music.lyric
  },

  watch: {
    music: {
      handler() {
        this.object.lyric = this.music.lyric
      },
      deep: true
    }
  },

  methods: {
    store() {
      this.loading = true;
      this.$api.post('requestUpdate', {
        type: 'music_lyric',
        object_id: this.music.id,
        object_type: 'App\\Music',
        lyric: this.object.lyric
      }).then(({data}) => {
        if (data.approved_at != null) {
          this.$root.$emit('success', this.$t('text.music_changes_applied'));
          this.$emit('changed')
        } else {
          this.$root.$emit('success', this.$t('text.music_request_change_submitted'));
        }
        this.updating = false;
      }).catch(({response}) => {
        if (response.status === 422)
          this.errors = response.data.errors;
      }).finally(() => this.loading = false);
    }
  }
}
</script>

<style scoped>
.lyric {
  direction: rtl;
  white-space: pre-line;
  font-size: 19px;
  max-height: 500px;
  line-height: 40px;
  overflow-y: scroll;
}
</style>
