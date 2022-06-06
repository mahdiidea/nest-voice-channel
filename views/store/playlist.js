export default {
    state: {
        list: []
    },
    mutations: {
        setList(state, text) {
            state.list = text;
        }
    },
    namespaced: true,
}