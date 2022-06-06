export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, text) {
            state.user = text;
        }
    },
    namespaced: true,
}
