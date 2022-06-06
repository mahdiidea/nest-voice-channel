<template>
    <div class="d-flex justify-center align-center">
        <input type="file" accept="audio/*" style="display: none" id="image" @change="picked"/>

        <div v-if="errors != null && errors.music.length > 0" class="error--text" v-text="errors.music[0]" />
        <div v-if="progress > 0 && progress < 100" v-text="`${progress}%`"/>
        <v-btn :loading="loading" rounded color="primary" class="my-1 mx-2" @click="pick">
            <v-icon>mdi-upload</v-icon>
            {{ $t('text.upload') }}
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "musicUpload",

    data: () => ({
        errors: null,
        progress: 0,
        loading: false,
    }),

    methods: {
        pick() {
            document.getElementById("image").click();
        },
        picked(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (files.length && files.length >= 1) this.upload(files[0]);
        },
        upload(music) {
            this.errors = null;
            this.loading = true;

            let config = {
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: function (progressEvent) {
                    this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.$forceUpdate();
                }.bind(this)
            };

            let formData = new FormData();
            formData.append("music", music);

            this.$api.post('musics', formData, config)
                .then(({data}) => this.$emit('uploaded', data))
                .catch(({response}) => {
                    this.$root.$emit('error', response.data.message || response.statusText);
                    if (response.status === 422) this.errors = response.data.errors;
                }).finally(() => this.loading = false);
        }
    }
}
</script>

<style scoped>

</style>
