<template>
    <v-bottom-sheet inset v-model="react.customerModal">
        <v-sheet class="pa-2 overflow-y-auto" height="700px">
            <!-- 客户表格 -->
            <!-- 客户表格 -->
            <!-- 客户表格 -->
            <!-- 客户表格 -->
            <v-simple-table fixed-header height="600px" dense>
                <thead>
                    <tr>
                        <th>客户名称</th>
                        <th>联系方式</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- 输入行 -->
                    <tr v-for="(customerModel, i) in react.customerModelList" :key="i">
                        <td><v-text-field v-model="customerModel.name" label="客户名称" /></td>
                        <td><v-text-field v-model="customerModel.contact" label="联系方式" /></td>
                        <td><v-text-field v-model="customerModel.remark" label="备注" /></td>
                        <td><v-btn small color="#F44336" @click.stop="react.actionCustomer">添加</v-btn></td>
                    </tr>
                    <!-- 内容行 -->
                    <tr v-for="customer in react.customerList" :key="customer._id">
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.contact }}</td>
                        <td>{{ customer.remark }}</td>
                        <td><v-btn x-small color="#F44336" @click.stop="pickCustomer(customer)" dark>选择</v-btn></td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-sheet>
    </v-bottom-sheet>
</template>
<script>
    import CustomerTableReact from './CustomerTableReact.js'
    export default {
        data() {
            return {
                react: new CustomerTableReact(),
            }
        },
        methods: {
            pickCustomer(customer) {
                this.$emit('pick', customer)
                this.react.toggleCustomerList()
            },
        },
        beforeCreate() {},
    }
</script>
<style lang="scss"></style>
