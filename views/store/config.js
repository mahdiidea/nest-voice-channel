export default {
    state: {
        theme: true,
        bearer: null
    },
    mutations: {
        setTheme(state, text) {
            state.theme = text;
        },
        setBearer(state, text) {
            state.bearer = text;
        }
    },
    namespaced: true,
}