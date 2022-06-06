import Vue from "vue";
import VueRouter from 'vue-router';

import index from './pages/index';
import login from './pages/login';
import music from './pages/musics/_slug/index';

let lang = ['fa', 'en'];

let map = [
    {path: '/musics/:musicId', name: 'music', component: music, props: true},
    {path: '/login', name: 'login', component: login, props: true},
    {path: '*', name: 'home', component: index},
];

let routes = [];

for (let i = 0; i < map.length; i++) {
    routes.push(map[i]);
    for (let j = 0; j < lang.length; j++) {
        let path = map[i].path.startsWith('/') ? map[i].path : `/${map[i].path}`;
        routes.push({
            path: `/${lang[j]}${path}`,
            name: `/${lang[j]}_${map[i].name}`,
            component: map[i].component,
            props: map[i].props || false
        });
    }
}

Vue.use(VueRouter);

const router = new VueRouter({
    base: '/',
    mode: 'history',
    routes: routes,
});

export default router;
