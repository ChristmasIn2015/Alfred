<template>
    <div>
        <!-- 订单列表 Nav -->
        <div class="d-flex">
            <v-btn @click.stop="react.initReact">刷新</v-btn>
        </div>
        <!-- 订单列表 -->
        <div v-for="order in react.orderList" :key="order._id">
            <div class="d-flex ma-2 mt-4">
                <div>订单Id:{{ order._id }}</div>
                <v-spacer></v-spacer>
                <div>创建时间:{{ order.timeCreate }}</div>
            </div>
            <v-data-table :headers="react.orderListHeader" :items="order.saleGoodList" dense hide-default-footer />
        </div>
    </div>
</template>
<script>
    import ReactOrderCenter from './React.js'
    export default {
        data() {
            return {
                react: new ReactOrderCenter(),
            }
        },
        methods: {},
        beforeCreate() {},
    }
</script>
<style lang="scss"></style>
