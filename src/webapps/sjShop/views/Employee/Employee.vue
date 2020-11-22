<template>
    <div class="employee">
        <div class="flex-wrap" v-if="userInfo._id">
            <Button
                type="info"
                size="small"
                v-for="(shop, index) in model.shopList"
                :key="index"
                :ghost="shopInfo._id !== shop._id"
                @click.stop="model.pickShop(shop)"
                >{{ shop.name }}</Button
            >
            <Button type="info" size="small" style="margin-left: auto;" @click.stop="model.toggleShopModal">创建新店铺</Button>
        </div>
        <div v-if="userInfo._id" class="flex-wrap" style="margin: 1rem 0;">
            <Button
                type="info"
                size="small"
                v-for="(house, index) in model.houseList"
                :key="index"
                :ghost="houseInfo._id !== house._id"
                @click.stop="model.pickHouse(house)"
                >{{ house.name }}</Button
            >
            <Button type="info" size="small" style="margin-left: auto;" @click.stop="model.toggleHouseModal">创建新仓库</Button>
        </div>
        <div class="flex-wrap">
            <Button v-if="!userInfo._id" type="primary" size="small" ghost style="margin-left: auto;" @click.stop="model.loginModal = true">登录</Button>
        </div>

        <!-- 员工列表 -->
        <Table stripe :columns="model.employeeTableColumn" :data="model.employeeList">
            <template slot-scope="{ row }" slot="action">
                <!-- <Button type="error" size="small">删除</Button> -->
                <Button v-if="userInfo.phone === row.phone" type="info" size="small" @click.stop="model.reLogin">注销登录</Button>
            </template>
        </Table>

        <!-- 登录框 -->
        <Modal v-model="model.loginModal" title="用户登录">
            <Form :model="model.userModel" label-position="left" :label-width="100">
                <FormItem label="手机号">
                    <Input v-model="model.userModel.phone" placeholder="请输入手机号" />
                </FormItem>
                <FormItem label="密码">
                    <Input v-model="model.userModel.password" type="password" placeholder="请输入密码" />
                </FormItem>
                <FormItem label="昵称 (可选)">
                    <Input v-model="model.userModel.name" placeholder="请输入昵称 (可选)" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="model.loginModal = false">取消</Button>
                <Button type="info" @click.stop="model.loginConfirm">登录/注册</Button>
            </div>
        </Modal>

        <!-- 店铺列表 -->
        <Modal v-model="model.shopModal" title="创建店铺">
            <div>
                <Input v-model="model.shopCreateName" size="large" placeholder="请输新店铺名称" />
            </div>
            <div slot="footer">
                <Button type="info" @click.stop="model.createMyShop">创建店铺</Button>
            </div>
        </Modal>

        <!-- 仓库列表 -->
        <Modal v-model="model.houseModal" title="创建仓库">
            <div>
                <Input v-model="model.houseCreateName" size="large" placeholder="请输新仓库名称" />
            </div>
            <div slot="footer">
                <Button type="info" @click.stop="model.createMyHouse">创建仓库</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Model from './Model.js'
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
</style>
