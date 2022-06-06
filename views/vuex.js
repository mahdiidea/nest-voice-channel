import Vue from 'vue'
import Vuex from 'vuex'
import crypto from './helpers/crypto';
import cookie from "./helpers/cookie";

Vue.use(Vuex);

import {default as user} from "./store/user";
import {default as config} from "./store/config.js";
import {default as playlist} from "./store/playlist.js";

const store = new Vuex.Store({
    modules: {
        user,
        config,
        playlist
    }
});

const shouldSave = {
    'config/setBearer': {
        encrypt: true,
        default: null
    }
};

let password = cookie.get('uid', null);

if (password == null) {
    password = crypto.generate();
    cookie.set('uid', password);
}

store.subscribe((mutation, state) => {
    if (Object.keys(shouldSave).includes(mutation.type) && mutation.payload != null) {
        localStorage.setItem(mutation.type,
            shouldSave[mutation.type].encrypt
                ? crypto.encrypt(mutation.payload, password)
                : mutation.payload)
    }
});

Object.keys(shouldSave).forEach(function (x) {
    store.commit(x, shouldSave[x].encrypt
        ? crypto.decrypt(localStorage.getItem(x), shouldSave[x].default, password)
        : localStorage.getItem(x));
});

export default store
