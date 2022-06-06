<template>
  <v-dialog v-model="dialog" scrollable max-width="800">
    <template v-slot:activator="{ on, attrs }">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="me-2" text rounded v-bind="attrs" v-on="on" @click="dialog = true">
            <v-icon>mdi-alert</v-icon>
            {{ $t(`report.report`) }}
          </v-btn>
        </template>
        <span v-text="$t('report.report_type', type)"/>
      </v-tooltip>
    </template>
    <v-card :loading="loading" outlined elevation="2">
      <v-card-title v-text="$t(`report.report_type`, type)"/>
      <v-divider/>

      <v-expand-transition>
        <v-card-text v-if="object.level === 1">
          <v-checkbox v-for="(x, i) in options.type" :key="i" :label="$t(`report.${x}`)"
                      v-model="object.reports" :messages="$t(`report.${x}_text`,type)" :value="x"/>
        </v-card-text>

        <v-card-text class="mt-5" v-else-if="object.level === 2">

          <v-text-field :label="$t('text.email')" outlined v-model="object.email"
                        class="mt-2" type="email" ppend-icon="mdi-email" id="email"
                        :error-messages="errors.email"/>

          <v-textarea :label="$t('text.description')" outlined v-model="object.description"
                      :error-messages="errors.description" :messages="$t('text.optional')"/>
        </v-card-text>
      </v-expand-transition>
      <v-divider/>
      <v-card-actions>

        <label class="red--text" v-if="object.reports.length === 0">{{ $t('report.null_option') }}</label>
        <v-spacer/>

        <v-btn text @click="back" color="primary" v-if="!loading"
               v-text="object.level === 1 ? $t('text.close') : $t('text.back')"/>

        <v-btn :disabled="object.reports.length === 0" :loading="loading" color="primary" rounded @click="store"
               min-width="140">
          {{ object.level === 1 ? $t('text.next') : $t('text.submit') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "report",

  props: ['object_id', 'object_type', 'music_name'],

  computed: {
    type: function () {
      return {
        type: this.$t(`text.${this.object_type}`)
      };
    }
  },

  data: () => ({
    dialog: false,
    options: {
      type: [
        'violence',
        'fear',
        'sexuality',
        'offensive',
        'drugs',
        'political',
        'religion'
      ]
    },
    object: {
      reports: [],
      level: 1,
      email: "",
      description: ""
    },
    loading: false,
    errors: {}
  }),

  mounted() {
    if (this.$auth.loggedIn && this.$auth.user)
      this.object.email = this.$auth.user.email;
  },

  methods: {
    back() {
      if (this.object.level === 1) {
        this.dialog = false;
      } else {
        this.object.level = 1;
      }
    },
    store() {
      if (this.object.level === 1) {
        this.object.level = 2;
      } else {
        this.loading = true;
        axios.post(`/reports`, {
          email: this.object.email,
          object_id: this.object_id,
          object_type: `${this.object_type}s`,
          reports: this.object.reports,
          description: this.object.description
        }).then(({data}) => {
          this.object.level = 1;
          this.object = {
            reports: [],
            level: 1,
            email: "",
            description: ""
          };

          this.$root.$emit('success', this.$t('report.report_success', {
            music: this.music_name,
            id: data.id
          }));

          this.dialog = false;
        })
          .catch(({response}) => {
            this.$root.$emit('error', response.data.message);
            if (response.data.errors != null) this.errors = response.data.errors;
          })
          .finally(() => this.loading = false);

      }
    }
  }
}
</script>

<style scoped>

</style>
