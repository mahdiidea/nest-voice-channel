<template>
    <v-row>
        <v-col cols="6" sm="4" md="2" v-for="x in artists" :key="x.id">
            <artist-avatar :artist="x"/>
        </v-col>
    </v-row>
</template>

<script>
    import ArtistAvatar from "./artistAvatar";

    export default {
        name: "artistManager",

        components: {ArtistAvatar},

        props: ['artists', 'loading']
    }
</script>

<style scoped>

</style>
