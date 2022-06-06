<template>
    <v-row v-if="albums.length > 0">
        <v-col cols="6" sm="4" md="2" v-for="x in albums" :key="x.id">
            <album-card :album="x"/>
        </v-col>
        <v-col v-if="loading" v-for="x in 6" :key="x" cols="6" sm="4" md="2">
            <v-skeleton-loader class="mx-auto" type="card"/>
        </v-col>
    </v-row>
</template>

<script>
    import AlbumCard from "./albumCard";

    export default {

        name: "albumManager",

        components: {AlbumCard},

        props: ['albums', 'loading']
    }
</script>

<style scoped>

</style>
