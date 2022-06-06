<template>
    <div class="d-flex">
        hello:
        {{ $store.state.user.user }}
    </div>
</template>

<script>

export default {
    name: "index",

    data: () => ({
        loading: null,
        array: null,
    }),

    methods: {}
}
</script>

<style scoped>
.login {
    flex: .5;
    background: cornflowerblue;
    padding: 0 50px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    overflow-y: scroll;
    height: 100vh;
    align-items: center;
    display: flex;
}
</style>
