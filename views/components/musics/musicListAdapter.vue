<template>
    <div class="d-block">
        <v-list>
            <v-list-item v-for="(x, i) in musics" :key="i" @click="$root.$emit('play', x)" class="music clickable">

                <v-list-item-avatar>
                    <v-img :src="x.picture"/>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-text="$vuetify.rtl ? x.titleFa : x.title" />
                    <v-list-item-subtitle v-text="$vuetify.rtl ? x.performerFa : x.performer" />
                </v-list-item-content>

                <v-list-item-action-text class="d-none d-sm-block" v-text="duration(x.duration)" />

                <v-list-item-action>
                    <div class="d-flex align-center justify-center">
                        <v-icon v-if="x.status === 'deleted'" color="warning">mdi-alert</v-icon>
                        <v-btn @click="$root.$emit('playlist_remove', x.id)" v-if="playlistRemove === true" icon>
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-btn small :to="localePath(`/musics/${x.id}`)" icon>
                            <v-icon>mdi-open-in-new</v-icon>
                        </v-btn>
                    </div>
                </v-list-item-action>

            </v-list-item>
        </v-list>

        <v-row v-if="loading" no-gutters>
            <v-col v-for="x in 6" :key="x" cols="12">
                <v-skeleton-loader class="mx-auto" type="list-item-avatar-two-line"/>
            </v-col>
        </v-row>

    </div>
</template>

<script>
export default {
    name: "musicListAdapter",

    props: {
        musics: Array,
        loading: {
            type: Boolean,
            default: false
        },
        playlistRemove: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style scoped>

</style>
