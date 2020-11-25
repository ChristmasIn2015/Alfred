<template>
    <div class="employee">
        <div class="flex" style="margin-bottom: 1rem;">
            <Button type="success" size="small" @click.stop="react.newEmployeeModal = true">添加新员工</Button>
        </div>
        <div>
            <Table stripe :columns="react.employeeTableColumn" :data="react.employeeList">
                <template slot-scope="{}" slot="action">
                    <Button type="default" size="small">删除</Button>
                </template>
            </Table>
        </div>

        <!-- 新员工弹窗 -->
        <Modal v-model="react.newEmployeeModal" title="添加新员工" width="350">
            <Form label-position="top">
                <FormItem label="新员工手机号">
                    <Input v-model="react.newEmployeePhone" placeholder="请输入新员工手机号" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.newEmployeeModal = false">取消</Button>
                <Button type="success" @click.stop="react.addMyEmployee">添加</Button>
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
