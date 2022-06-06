<template>
    <v-row>
        <v-col cols="6" sm="3" md="2" :key="`${x.id}-${i}`" v-for="(x, i) in playlists">
            <playlist-card :playlist="x"/>
        </v-col>

        <v-col v-if="loading" v-for="x in 6" :key="x" cols="6" sm="4" md="2">
            <v-skeleton-loader class="mx-auto" type="card"/>
        </v-col>
    </v-row>
</template>

<script>
    import PlaylistCard from "./playlistCard";

    export default {
        name: "playlistManager",

        components: {PlaylistCard},

        props: ['playlists', 'loading'],
    }
</script>

<style scoped>

</style>
