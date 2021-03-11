<template>
    <div>
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn class="ma-1 mr-0" small color="#64B5F6" @click.stop="toggleGoodTable">商品管理</v-btn>
        </div>
        <v-divider></v-divider>
        <!-- 订单编辑 Nav -->
        <!-- 订单编辑 Nav -->
        <!-- 订单编辑 Nav -->
        <!-- 订单编辑 Nav -->
        <div class="d-flex align-center">
            <v-spacer></v-spacer>
            <v-btn class="ma-1 mr-0" small color="#EF5350" @click.stop="toggleCustomerTable">
                {{ react.customerPicked ? `当前客户: ${react.customerPicked.name}` : '选择客户' }}
            </v-btn>
            <v-btn class="ma-1 mr-0" small color="#EC407A" @click.stop="react.actionOrder">创建订单</v-btn>
        </div>
        <!-- 订单编辑 -->
        <!-- 订单编辑 -->
        <!-- 订单编辑 -->
        <!-- 订单编辑 -->
        <div>
            <v-simple-table fixed-header height="600px">
                <thead>
                    <tr>
                        <th>商品编号</th>
                        <th>品名</th>
                        <th>规格</th>
                        <!-- <th>单价</th> -->
                        <th>数量</th>
                        <th>单位</th>
                        <th>售价</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- 输入行 -->
                    <tr v-for="(orderGood, i) in react.orderGoodList" :key="i">
                        <td><v-text-field v-model="orderGood._id" dense hide-details label="编号" /></td>
                        <td><v-text-field v-model="orderGood.name" dense hide-details label="品名" /></td>
                        <td><v-text-field v-model="orderGood.norm" dense hide-details label="规格" /></td>
                        <!-- <td>{{ Number(orderGood.retailPrice / orderGood.count).toFixed(2) }}元</td> -->
                        <td><v-text-field v-model="orderGood.count" dense hide-details label="数量" /></td>
                        <td><v-text-field v-model="orderGood.countName" dense hide-details label="单位" /></td>
                        <td><v-text-field v-model="orderGood.retailPrice" dense hide-details label="售价" /></td>
                        <td>
                            <v-btn small color="#64B5F6" @click.stop="react.deleteOrderGood(i)">删除</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </div>
        <!-- 客户管理 -->
        <!-- 客户管理 -->
        <!-- 客户管理 -->
        <!-- 客户管理 -->
        <CustomerTable ref="CustomerTable" @pick="getCustomerPicked" />
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
            getCustomerPicked(customer) {
                this.react.customerPicked = customer
            },
            // Good
            toggleGoodTable() {
                this.$refs.GoodTable.react.toggleGoodList()
            },
            getGoodListPicked(goodList) {
                this.react.receiveOrderGood(goodList)
            },
        },
        components: { CustomerTable, GoodTable },
    }
</script>
<style lang="scss"></style>
