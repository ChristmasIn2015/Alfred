<template>
    <div class="employee">
        <Table stripe :columns="model.employeeTableColumn" :data="model.employeeList"> </Table>
    </div>
</template>

<script>
    import Model from '../model/Employee/Model.js'
    export default {
        data() {
            return {
                model: new Model(),
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
    @import '@/public/css/default.scss';
</style>
