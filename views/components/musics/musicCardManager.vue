<template>
    <v-row>
        <v-col cols="6" sm="3" md="2" :key="`${music.id}-${i}`" v-for="(music, i) in musics">
            <music-card :playlist-remove="playlistRemove" :music="music" v-on:play="$root.$emit('list', musics, music)"/>
        </v-col>

        <v-col v-if="loading" v-for="x in 6" :key="x" cols="6" sm="3" md="2" >
            <v-skeleton-loader class="mx-auto" type="card"/>
        </v-col>
    </v-row>
</template>

<script>
    import MusicCard from "./musicCard";

    export default {
        name: "musicCardManager",

        components: {MusicCard},

        props: ['musics', 'loading', 'playlistRemove'],
    }
</script>

<style scoped>

</style>
