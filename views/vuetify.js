import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
    dark: true,
    icons: {
        iconfont: 'mdi'
    },
    breakpoint: {scrollbarWidth: 3},
    theme: {
        themes: {
            light: {
                primary: colors.pink.darken2
            },
            dark: {
                primary: colors.pink.lighten1
            }
        }
    },
}

export default new Vuetify(opts)
