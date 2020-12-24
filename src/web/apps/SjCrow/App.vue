<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        mounted() {},
        methods: {},
        beforeCreate() {
            window.$load = {
                show: () => this.$Spin.show(),
                hide: () => this.$Spin.hide(),
            }
            window.$tip = (message) =>
                this.$Message['success']({
                    background: true,
                    content: message,
                })
            window.$warn = (message) =>
                this.$Message['error']({
                    background: true,
                    content: message,
                })
            window.$confirm = (message, next) => {
                this.$Modal.confirm({
                    title: message,
                    onOk: next,
                    okText: '确定',
                    cancelText: '取消',
                })
            }
        },
    }
</script>
<style lang="scss">
    @import '../../styles/index.scss';
</style>
