<template>
  <v-container fluid>
    <v-dialog v-model="countryPicker" max-width="600" content-class="scrollbar">
      <v-card>
        <v-card-title class="justify-center align-center">
          {{ $t('text.country') }}
          <v-spacer/>
          <span>
                        <v-text-field outlined hide-details :label="$t('text.search')" v-model="search"
                                      autofocus dense append-icon="mdi-magnify"/>
                    </span>
        </v-card-title>
        <v-divider/>
        <v-list>
          <v-list-item v-for="(x, i) in countries"
                       v-if="search.length === 0 || ((x.name+' ' +x.name_fa+' '+x.phone+ ' '+x.alpha3 + ' ' + x.code).toLowerCase().includes(search.toLowerCase()))"
                       :key="i" @click="changeCountry(x)">
            <v-list-item-avatar>
              {{ x.emoji }}
            </v-list-item-avatar>
            <v-list-item-title>
              {{ $vuetify.rtl ? x.name_fa : x.name }} (+{{ x.phone }})
            </v-list-item-title>
            <v-list-item-action-text>
              {{ x.code }}
            </v-list-item-action-text>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>

    <v-row justify="center" v-if="user != null">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="4" :loading="loading" outlined>
          <v-card-title>
            {{ $t('text.your_personal_information') }}
            <v-spacer/>
            <v-icon>mdi-account</v-icon>
          </v-card-title>
          <v-divider/>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="text-center">

                <v-avatar class="clickable changeable" color="blue-grey"
                          width="200" height="200" v-ripple>
                  <v-img :src="user.picture" v-if="user.picture != null && picture == null"/>
                  <span class="white--text headlines" v-else-if="picture == null">
                                        {{ user.name.substring(0, 1) }}
                                    </span>

                  <div id="img"/>
                  <div class="on-hover" @click="choose">
                    <v-icon dark>mdi-camera</v-icon>
                  </div>
                  <input type="file" accept="image/*" id="picture" class="d-none"
                         @change="updatePicture">
                </v-avatar>

              </v-col>
              <v-col cols="12">

                <v-text-field :label="$t('text.name')" outlined v-model="user.name"
                              append-icon="mdi-account"
                              :error-messages="errors.name !== undefined ? errors.name : []"/>

                <v-text-field :label="$t('text.email')" outlined v-model="user.email"
                              :color="user.email_verified_at == null ? 'warning' : 'primary'"
                              :disabled="user.email_verified_at != null"
                              :success="user.email_verified_at != null"
                              :readonly="user.email_verified_at != null "
                              :success-messages="user.email_verified_at != null ? $t('text.mail_verified') : undefined"
                              :messages="user.email_verified_at == null ? $t('text.verify_email_description') : undefined"
                              type="email" ppend-icon="mdi-email" id="email"
                              :error-messages="errors.email"/>

                <v-textarea :label="$t('text.bio')" outlined v-model="user.bio"
                            append-icon="mdi-text" id="bio" :error-messages="errors.email"/>

                <v-text-field :label="$t('text.link')" outlined v-model="user.link"
                              append-icon="mdi-link" id="link" :error-messages="errors.link"/>

                <v-checkbox :label="$t('text.private_history')" v-model="user.private_history"/>

                <p class="warning--text py-2" v-if="user.email_verified_at == null">
                  <v-expand-transition>
                    <v-alert v-if="verify.isSent" prominent icon="mdi-check" type="success">
                      {{ $t('text.verification_mail_sent') }}
                    </v-alert>
                    <v-alert v-if="verify.errorMessage != null" prominent icon="mdi-close"
                             type="error">
                      {{ verify.errorMessage }}
                    </v-alert>
                  </v-expand-transition>
                  <v-btn @click="resendVerification" :loading="verify.loading" class="px-3"
                         color="warning" small rounded text>
                    <v-icon>mdi-refresh</v-icon>
                    {{ $t('text.click_to_resend_verify_mail') }}
                  </v-btn>
                </p>

                <form>
                  <v-card outlined flat>
                    <div class="d-flex justify-center align-center">
                      <v-btn :loading="countriesLoading" @click="countryPicker = true"
                             depressed tile x-large style="max-width: 350px;width: fit-content">
                        <div class="d-none d-md-block">
                          {{
                            user.country == null ?
                              $t('text.country')
                              : `${user.country.emoji} ${$vuetify.rtl ? user.country.name_fa : user.country.name} (+${user.country.phone})`
                          }}
                        </div>
                        <div class="d-block d-md-none">
                          {{
                            user.country == null ?
                              $t('text.country')
                              : `${user.country.emoji} (+${user.country.phone})`
                          }}
                        </div>
                      </v-btn>
                      <v-divider vertical/>
                      <v-text-field :label="$t('text.phone_number')" flat solo hide-details
                                    :error-messages="errors.phone" v-model="user.phone"
                                    @keypress="isNumberKey" append-icon="mdi-phone" type="phone"/>
                    </div>
                  </v-card>
                  <div class="d-block">
                    <small class="px-2 my-1 error--text"
                           v-if="errors.phone !== undefined && errors.phone != null && errors.phone.length > 0">
                      {{ errors.phone[0] }}
                    </small>
                    <br/>
                    <small class="px-2 my-1 error--text"
                           v-if="errors.country !== undefined && errors.country != null && errors.country.length > 0">
                      {{ errors.country[0] }}
                    </small>
                  </div>
                </form>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-spacer/>

            <v-progress-circular v-if="loading" class="mx-2" color="primary"
                                 :rotate="progress * 2" :value="progress">
              <small>{{ progress }}</small>
            </v-progress-circular>

            <v-btn color="primary" rounded class="px-4" :loading="loading" @click="store">
              <v-icon>{{ $vuetify.rtl ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
              {{ $t('text.apply') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="10" lg="8">
        <v-card :loading="password_loading" elevation="2" outlined>
          <v-card-title>
            {{ $t('text.reset_password') }}
            <v-spacer/>
            <v-icon>mdi-lock</v-icon>
          </v-card-title>
          <v-divider/>
          <v-card-text>
            <form autocomplete="off">
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field :label="$t('text.current_password')" outlined type="password"
                                v-model="passwords.current_password" append-icon="mdi-lock" clearable
                                id="current_password" :hide-details="errors.current_password === undefined"
                                :error-messages="errors.current_password !== undefined ? errors.current_password : []"/>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field :label="$t('text.password')" outlined type="password"
                                v-model="passwords.password" append-icon="mdi-lock" clearable
                                id="password" :hide-details="errors.password === undefined"
                                :error-messages="errors.password !== undefined ? errors.password : []"/>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field :label="$t('text.password_confirmation')" outlined
                                type="password" v-model="passwords.password_confirmation"
                                append-icon="mdi-lock" id="password_confirmation"
                                hide-details/>
                </v-col>
              </v-row>
            </form>
          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-spacer/>
            <v-btn @click="resetPassword" rounded color="primary">
              <v-icon>{{ $vuetify.rtl ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
              {{ $t('text.reset_password') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="10" lg="8">
        <v-card :loading="password_loading" elevation="2" outlined>
          <v-card-title>
            {{ $t('text.reset_password') }}
            <v-spacer/>
            <v-icon>mdi-lock</v-icon>
          </v-card-title>
          <v-divider/>
          <v-card-text>
            <vue-telegram-login mode="callback" telegram-login="mositobot" @callback="logged"
                                requestAccess="write" size="large" userpic/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {vueTelegramLogin} from 'vue-telegram-login'

export default {
  name: "profile",

  components: {
    vueTelegramLogin
  },

  head: () => ({
    title: 'Edit profile',
  }),

  data: () => ({
    password_loading: false,
    passwords: {
      current_password: "",
      password_confirmation: "",
      password: "",
    },
    verify: {
      loading: false,
      errorMessage: null,
      isSent: false
    },
    countriesLoading: false,
    countryPicker: false,
    countries: [],
    search: "",
    loading: false,
    picture: null,
    progress: 0,
    errors: {},
    user: null,
  }),

  created() {
    this.fetch();
  },

  methods: {
    logged(e) {
      console.log(`e`, e);
    },
    resendVerification() {
      this.verify.loading = true;
      this.verify.isSent = false;
      this.verify.errorMessage = null;
      this.$api.get('auth/verify')
        .then(({data}) => this.verify.isSent = true)
        .catch(({response}) => {
          if (response.status === 429) {
            this.verify.errorMessage = response.data.message;
          }
        }).finally(() => this.verify.loading = false);
    },
    fetch: function () {
      this.loading = true;
      this.$api.get(`auth`, {
        params: {
          q: 'country'
        }
      }).then(({data}) => {
        this.user = data;
        this.fetch_countries();
      }).finally(() => this.loading = false);
    },
    fetch_countries() {
      this.countriesLoading = true;
      this.$api.get('countries')
        .then(({data}) => this.countries = data)
        .finally(() => this.countriesLoading = false);
    },
    changeCountry(x) {
      this.user.country = x;
      this.countryPicker = false;
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
      formData.append("name", this.user.name);
      formData.append("email", this.user.email);
      formData.append("bio", this.user.bio || '');
      formData.append("link", this.user.link || '');
      formData.append("private_history", this.user.private_history ? '1' : '0');

      if (this.user.phone != null)
        formData.append("phone", this.user.phone);

      if (this.user.country != null)
        formData.append("country", this.user.country.phone);

      if (this.picture != null)
        formData.append("picture", this.picture);

      this.$api.post(`auth/${this.user.id}`, formData, config)
        .then(({data}) => {
          this.user = data;
          this.$root.$emit('success', this.$t('text.success'));
          this.$root.$emit('update-user', data);
        })
        .catch(({response}) => {
          if (response.status === 422)
            this.errors = response.data.errors;
        })
        .finally(() => this.loading = false);
    },
    choose: function () {
      document.getElementById("picture").click();
    },
    updatePicture: function (e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files.length >= 1) {
        this.picture = files[0];
        let preview = document.getElementById("img");
        let fileReader = new FileReader();
        fileReader.onload = function (e) {
          preview.style.backgroundImage = "url('" + this.result + "')";
          preview.style.display = "block";
        };
        fileReader.readAsDataURL(files[0]);
      }
    },
    isNumberKey: function (evt) {
      evt = (evt) ? evt : window.event;
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    resetPassword() {
      this.errors = [];
      this.password_loading = true;
      this.$api.post('reset/password', this.passwords)
        .then(({data}) => {
          this.passwords = {
            current_password: "",
            password_confirmation: "",
            password: "",
          };
          this.user = data;
          this.$root.$emit('success', this.$t('text.success'));
        })
        .catch(({response}) => {
          if (response.data.errors !== undefined)
            this.errors = response.data.errors;
        })
        .finally(() => this.password_loading = false);
    }
  }
}
</script>

<style scoped>
.headline {
  font-size: 70px !important;
}

.changeable:hover .on-hover {
  display: block;
  transition: .3s;
}

#img {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
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

.nowrap {
  white-space: nowrap;
  padding: 0 8px;
  display: flex;
}
</style>
