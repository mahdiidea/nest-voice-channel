<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">

        <v-card elevation="2" outlined :loading="loading">

          <v-card-title v-text="$t('text.create_playlist')"/>

          <v-divider/>

          <v-card-text>

            <div class="w-100 text-center mb-5">
              <v-avatar width="200" height="200" class="clickable bordered changeable mx-auto" v-ripple>
                <canvas id="identicon" width="125" height="125" v-if="object.picture == null"/>
                <div id="img"/>
                <div class="on-hover" @click="choose">
                  <v-icon dark>mdi-camera</v-icon>
                </div>
                <input type="file" id="picture" class="d-none" @change="updatePicture">
              </v-avatar>
            </div>

            <v-text-field :label="$t('text.title')" outlined v-model="object.title"
                          :error-messages="errors.title" v-on:keyup="updateJdenticon"/>

            <v-select :label="$t('text.type')" outlined v-model="object.type"
                      :error-messages="errors.type" :items="types"/>

            <v-textarea :label="$t('text.description')" outlined v-model="object.description"
                        :error-messages="errors.description"/>

          </v-card-text>

          <v-divider/>

          <v-card-actions>
            <v-spacer/>

            <v-progress-circular v-if="loading" class="mx-2" color="primary"
                                 :rotate="progress * 2" :value="progress">
              <small>{{ progress }}</small>
            </v-progress-circular>

            <v-btn @click="store" class="px-4" color="primary"
                   :loading="loading" rounded>
              <v-icon>mdi-check</v-icon>
              {{ $t('text.create') }}
            </v-btn>
          </v-card-actions>

        </v-card>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "create",

  head: () => ({
    title: 'Create playlist'
  }),

  data: () => ({
    progress: 0,
    loading: false,
    types: ['public', 'private'],
    errors: {},
    object: {
      title: "",
      type: "",
      picture: null,
      description: ""
    }
  }),

  mounted() {
    this.updateJdenticon();
  },

  methods: {
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

      formData.append("type", this.object.type);
      formData.append("title", this.object.title);
      formData.append("picture", this.object.picture);
      formData.append("description", this.object.description);

      this.$api.post(`playlists`, formData, config).then(({data}) => {
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
        this.object.picture = files[0];
        let preview = document.getElementById("img");
        let fileReader = new FileReader();
        fileReader.onload = function (e) {
          preview.style.backgroundImage = "url('" + this.result + "')";
          preview.style.display = "block";
        };
        fileReader.readAsDataURL(files[0]);
      }
    },
    updateJdenticon: function () {
      let jdenticon = require("jdenticon");
      jdenticon.update("#identicon", this.object.title.length ? this.object.title : Math.random().toString(36).substring(2, 15));
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
