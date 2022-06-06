import Vue from 'vue';
import i18n from './i18n';
import api from "./plugin/api";
import router from "./router";
import mixins from "./mixin";
import vuetify from './vuetify';
import Vuex from "./vuex";

Vue.component('doc', require('./layout/app.vue').default);

Vue.mixin(mixins);

router.beforeEach(async (to, from, next) => {
    let hasToken = Vuex.state.config.bearer;
    hasToken = hasToken != null && hasToken.length > 0;

    if (to.name === 'login' && hasToken)
        return next({name: 'home'});

    else if (['login', 'index'].includes(to.name) || hasToken)
        return next()

    else
        return next({name: 'login'});
});

api.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        Vuex.commit('config/setBearer', null);
        router.replace({path: '/login'});
    }

    throw error;
});

let access_token = Vuex.state.config.bearer;
if (access_token != null && access_token.length > 0) {
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

new Vue({
    i18n,
    api,
    store: Vuex,
    router,
    vuetify,
}).$mount('#app');
