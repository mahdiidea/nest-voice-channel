<template>
  <v-card class="mb-4" :loading="loading" elevation="2" outlined>
    <v-card-text>
      <div class="d-flex align-start" v-if="$auth.loggedIn && $auth.user != null">
        <v-avatar v-if="$auth.user.picture != null" width="56" height="56"
                  class="elevation-4 bordered d-none d-sm-block me-3">
          <v-img :src="$auth.user.picture"/>
        </v-avatar>

        <v-text-field :label="$t('text.write_a_comment')" :counter="255" :error-messages="errors.text"
                      @keypress.enter="store" :loading="loading" v-model="object.text" outlined/>

        <v-btn :loading="loading" @click="store" fab color="primary" class="ms-3">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </div>
      <p class="w-50 pt-4 text-center" v-else>
        <v-btn :to="localePath(`/login`)" class="mx-2" color="primary" rounded>
          {{ $t('text.login_register') }}
        </v-btn>
        {{ $t('text.auth_to_send_comment') }}
      </p>
    </v-card-text>
    <v-divider/>

    <div class="d-content" v-if="comments != null">
      <v-list v-if="comments != null">
        <v-list-item v-for="(x, i) in comments.data" :key="i" :to="localePath(`/users/${x.id}`)">

          <v-list-item-avatar v-if="x.user.picture != null">
            <v-img :src="x.user.picture"/>
          </v-list-item-avatar>

          <v-list-item-icon v-else>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ x.user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ x.text }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action-text>{{ ago(x.created_at) }}</v-list-item-action-text>
        </v-list-item>
      </v-list>
      <empty v-if="comments.total === 0" :text="$t('text.no_comment_yet')" height="300"/>
      <div v-if="comments.last_page > comments.current_page" class="d-block text-center">
        <v-btn small rounded color="secondary" @click="fetch(comments.current_page + 1)"
               class="mb-4 mx-5" v-text="$t('text.load_more')"/>
      </div>
    </div>
  </v-card>
</template>

<script>
import empty from "../empty";
import FullPageLoading from "../fullPageLoading";

export default {
  name: "commentsIndex",

  components: {FullPageLoading, empty},

  props: {
    objectId: [String, Number],
    objectType: String
  },

  data: () => ({
    comments: null,
    loading: false,
    errors: {},
    object: {
      text: '',
    }
  }),

  async fetch() {
    await this.fetch(1);
  },

  methods: {
    fetch(page = 1) {
      this.loading = true;
      this.$api.get(`comments`, {
        params: {
          object_type: this.objectType,
          object_id: this.objectId,
          page: page
        }
      }).then(({data}) => {
        if (this.comments != null) {
          let comments = this.comments.data;
          data.data.forEach(function (x) {
            comments.push(x)
          });
          data.data = comments;
        }

        this.comments = data;
      }).finally(() => this.loading = false);
    },
    store() {
      this.loading = true;
      this.errors = {};
      this.$api.post(`comments`, {
        object_type: this.objectType,
        object_id: this.objectId,
        text: this.object.text
      }).then(({data}) => {
        this.fetch(1);
        this.object.text = '';
        this.$toast.success(this.$t('text.success'));
      }).catch(({response}) => {
        if (response.status === 422) {
          this.errors = response.data.errors;
        }
      }).finally(() => this.loading = false);
    }
  }
}
</script>

<style scoped>

</style>
