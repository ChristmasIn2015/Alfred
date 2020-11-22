<template>
    <div class="house">订单</div>
</template>

<script>
    // import Model from './model/Admin/Model.js'
    export default {
        data() {
            return {
                // model: new Model(this),
            }
        },
        mounted() {},
        computed: {
            userInfo() {
                return this.$store.state.userInfo
            },
            shopInfo() {
                return this.$store.state.shopInfo
            },
            houseInfo() {
                return this.$store.state.houseInfo
            },
        },
        methods: {},
    }
</script>

<style lang="scss">
    // @import '@/public/css/default.scss';
</style>
