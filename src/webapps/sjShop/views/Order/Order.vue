<template>
    <div class="order flex-y" style="height: 100%; overflow: hidden;">
        <div class="flex-middle-y">
            <Button size="small" type="info" style="margin-right: 0.5rem;" @click.stop="react.toggleCustomerModal">{{
                react.customerPicked.company ? `${react.customerPicked.company} / ${react.customerPicked.contact}` : '选择联系人'
            }}</Button>
        </div>

        <!-- 客户列表的表单 -->
        <Modal v-model="react.customerModal" title="客户列表">
            <Form label-position="top">
                <FormItem label="新增客户">
                    <Input class="no-radius" style="width: 8rem;" v-model="react.customerModel.company" placeholder="客户公司名称" />
                    <Input class="no-radius" style="width: 8rem;" v-model="react.customerModel.address" placeholder="客户公司地址" />
                    <Input class="no-radius" style="width: 8rem;" v-model="react.customerModel.contact" placeholder="联系人" />
                    <Button type="info" size="small" style="margin-left: 0.5rem;" @click.stop="react.addCustomer">新增客户</Button>
                </FormItem>
                <Table :columns="react.customerTableColumn" :data="react.customerList">
                    <template slot-scope="{ row }" slot="action">
                        <Button type="info" size="small" @click="react.pickCustomer(row)">选择</Button>
                    </template>
                </Table>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.customerModal = false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import React from './React.js'
    export default {
        data() {
            return {
                react: new React(),
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

<style lang="scss" scoped></style>
