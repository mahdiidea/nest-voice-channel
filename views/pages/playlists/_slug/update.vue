<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">

        <v-card elevation="2" outlined :loading="loading" v-if="playlist != null">
          <v-card-title v-text="$t('text.update_playlist')"/>
          <v-divider/>
          <v-card-text>

            <div class="w-100 text-center mb-5">
              <v-avatar width="150" height="150" class="clickable bordered changeable" v-ripple>
                <v-img class="picture" :src="playlist.picture" aspect-ratio="1"/>
                <div class="on-hover" @click="choose">
                  <v-icon dark>mdi-camera</v-icon>
                </div>
                <input type="file" id="picture" class="d-none" @change="updatePicture">
              </v-avatar>
            </div>

            <v-text-field :label="$t('text.title')" outlined v-model="playlist.title"
                          :error-messages="errors.title"/>

            <v-select :label="$t('text.type')" outlined v-model="playlist.type"
                      :error-messages="errors.type" :items="types"/>

            <v-textarea :label="$t('text.description')" outlined
                        :error-messages="errors.description"
                        v-model="playlist.description"/>

          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-spacer/>
            <v-progress-circular v-if="loading" class="mx-2" color="primary"
                                 :rotate="progress * 2" :value="progress">
              <small v-text="progress"/>
            </v-progress-circular>

            <v-btn @click="store" color="primary" class="px-4" :loading="loading" rounded>
              <v-icon>mdi-check</v-icon>
              {{ $t('text.update') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "update",

  head: () => ({
    title: 'Update playlist'
  }),

  data: () => ({
    errors: {},
    progress: 0,
    loading: false,
    types: ['public', 'private'],
    playlist: null,
    picture: null,
  }),

  computed: {
    playlistId: function () {
      return this.$route.params.slug;
    },
  },

  created() {
    this.fetch();
  },

  methods: {
    fetch: function () {
      this.loading = true;
      this.$api.get(`playlists/${this.playlistId}`)
        .then(({data}) => this.playlist = data)
        .finally(() => this.loading = false);
    },
    store: function () {
      this.errors = [];
      this.loading = true;

      let config = {
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress: function (progressEvent) {
          this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          this.$forceUpdate();
        }.bind(this)
      };

      let formData = new FormData();

      formData.append("_method", "PUT");
      formData.append("type", this.playlist.type);
      formData.append("title", this.playlist.title);
      formData.append("description", this.playlist.description);

      if (this.picture != null) formData.append("picture", this.picture);

      this.$api.post(`playlists/${this.playlistId}`, formData, config).then(({data}) => {
        this.$root.$emit('success', this.$t('text.success'));
        this.gotoPath(`/playlists/${data.id}`);
      }).catch(({response}) => {
        if (response.status === 422) this.errors = response.data.errors;
      }).finally(() => this.loading = false);
    },
    choose: function () {
      document.getElementById("picture").click();
    },
    updatePicture: function (e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files.length >= 1) {
        this.picture = files[0];
        let preview = document.getElementsByClassName("picture")[0].getElementsByClassName("v-image__image")[0];
        let fileReader = new FileReader();
        fileReader.onload = function (e) {
          preview.style.backgroundImage = "url('" + this.result + "')";
        };
        fileReader.readAsDataURL(files[0]);
      }
    }
  }
}
</script>

<style scoped>
.changeable:hover .on-hover {
  display: block;
  transition: .3s;
}

#img {
  top: 0;
  left: 0;
  width: 100%;
  display: none;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.on-hover {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  transition: .3s;
  position: absolute;
  text-align: center;
  background: rgba(0, 0, 0, 0.40);
}
</style>
