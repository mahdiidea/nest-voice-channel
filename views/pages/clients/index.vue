<template>
  <v-row class="fill-height" align="center" justify="center">
    <v-col cols="12" sm="10" md="8" lg="6" xl="5">
      <v-card elevation="2" outlined :loading="loading">
        <v-card-title v-text="$t('text.android_app')"/>
        <v-divider/>
        <client-item v-if="android != null" :item="android" icon="mdi-android"/>
        <div v-if="android_clients.length" class="d-content">
          <v-divider/>
          <v-card-subtitle>older versions</v-card-subtitle>
          <v-expansion-panels flat popout>
            <v-expansion-panel v-for="(x, i) in android_clients" :key="i">
              <v-expansion-panel-header>
                {{ $t('text.version') }} {{ x.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <client-item :item="x" icon="mdi-android"/>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ClientItem from "~/components/clients/clientItem";

export default {
  name: "index",

  components: {ClientItem},

  data: () => ({
    loading: false,
    android: null,
    android_history: null
  }),

  computed: {
    android_clients: function () {
      if (this.android_history == null) return;
      if (this.android == null) return this.android_history.data;
      return this.android_history.data.filter((x, i) => {
        return x.id !== this.android.id;
      });
    }
  },

  created() {
    this.fetchAndroid()
  },

  methods: {
    async fetchAndroid() {
      this.loading = true;
      await this.$api.get(`clients/android`)
        .then(({data}) => this.android = data)
        .finally(() => this.loading = false);

      await this.$api.get(`clients`, {
        params: {
          platform: 'android'
        }
      }).then(({data}) => this.android_history = data)
        .finally(() => this.loading = false);
    }
  }

}
</script>

<style scoped>

</style>
