<template>
  <div class="d-block">
    <v-list-item>
      <v-list-item-icon>
        <v-icon x-large>{{ icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="$t('text.version') + `: ` + item.name.replace('v', '')"/>
        <v-list-item-subtitle v-text="$t('text.released') + ` ` + ago(item.created_at)"/>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn v-if="item.source != null" target="_blank" :href="item.source" icon>
          <v-icon>mdi-git</v-icon>
        </v-btn>
      </v-list-item-action>

      <v-list-item-action class="d-block d-md-none">
        <v-btn icon target="_blank"
               :href="`${appUrl}/fileManager/${item.file_id}`">
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </v-list-item-action>

      <v-list-item-action class="d-none d-md-block">
        <v-btn rounded color="primary" target="_blank"
               :href="`${appUrl}/fileManager/${item.file_id}`">
          <v-icon>mdi-download</v-icon>
          {{ $t('text.download') }}
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-card-text v-if="item.note">
      <v-alert style="white-space: pre;" text v-text="item.note"/>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "clientItem",

  props: ['item', 'icon'],

  computed: {
    appUrl() {
      return this.$config.appUrl;
    }
  }
}
</script>

<style scoped>

</style>
