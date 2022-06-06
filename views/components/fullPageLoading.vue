<template>
  <v-expand-transition>
    <v-row v-show="loading" class="fill-height w-100" justify="center" align="center">
      <div class="text-center mt-10">
        <v-progress-circular class="mx-auto" indeterminate/>
        <v-card-title v-text="label"/>
      </div>
    </v-row>
  </v-expand-transition>
</template>

<script>
export default {
  name: "fullPageLoading",

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'لطفا صبر کنید ...'
    }
  },

  model: {
    prop: 'loading',
    event: 'valueChange',
  },
}
</script>

<style scoped>

</style>
