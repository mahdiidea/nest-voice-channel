<template>
    <v-card :to="localePath(`/albums/${album.id}`)" elevation="2" class="clickable">
        <v-img :src="album.cover" aspect-ratio="1" class="grey clickable lighten-2">
            <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"/>
                </v-row>
            </template>
        </v-img>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="headlines">
                    {{ $vuetify.rtl ? album.nameFa : album.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ $vuetify.rtl
                    ? (album.performerFa === null
                    ? album.performer : album.performerFa)
                    : album.performer }}
                </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
                <v-btn icon>
                    <v-icon>mdi-playlist-music</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
    </v-card>
</template>

<script>
    export default {
        name: "albumCard",

        props: ['album'],
    }
</script>

<style scoped>
    .head {
        overflow-x: hidden;
        white-space: nowrap;
    }
</style>
