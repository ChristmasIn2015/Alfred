<template>
    <div>
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <div class="d-flex">
            <v-btn class="ma-1 ml-0" small color="#F44336" @click.stop="toggleCustomerTable">客户管理</v-btn>
            <v-btn class="ma-1 ml-0" small color="#64B5F6" @click.stop="toggleGoodTable">商品管理</v-btn>
            <v-spacer></v-spacer>
        </div>
        <v-divider></v-divider>
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <div>订单编辑</div>
        <!-- 客户管理 -->
        <CustomerTable ref="CustomerTable" @pick="getCustomerListPicked" />
        <GoodTable ref="GoodTable" @pick="getGoodListPicked" />
    </div>
</template>
<script>
    import ReactSaleCenter from './React.js'
    import CustomerTable from '@/web/apps/QtShop/components/CustomerTable.vue'
    import GoodTable from '@/web/apps/QtShop/components/GoodTable.vue'
    export default {
        data() {
            return {
                react: new ReactSaleCenter(),
            }
        },
        methods: {
            // Customer
            toggleCustomerTable() {
                this.$refs.CustomerTable.react.toggleCustomerList()
            },
            getCustomerListPicked(customerListPicked) {
                console.log(customerListPicked)
            },
            // Good
            toggleGoodTable() {
                this.$refs.GoodTable.react.toggleGoodList()
            },
            getGoodListPicked(goodList) {
                console.log(goodList)
            },
        },
        components: { CustomerTable, GoodTable },
    }
</script>
<style lang="scss"></style>
