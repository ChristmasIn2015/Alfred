<template>
    <div id="app" class="no-scroll-bar">
        <div class="container">
            <div class="side">
                <div class="ad"></div>
                <div
                    class="side-item"
                    v-for="(side, index) in react.sideList"
                    :key="index"
                    :class="{ 'side-item-on': react.sideIndex === index }"
                    @click.stop="react.pickSide(index)"
                >
                    <span :class="side.icon"></span>
                    <span>{{ side.name }}</span>
                </div>
            </div>
            <div class="container-board">
                <div class="nav">
                    <!-- 登录按钮 -->
                    <Button :type="userInfo._id ? 'primary' : 'default'" size="small" @click.stop="react.reLogin">
                        <span class="fa fa-user"></span>
                        <span>{{ userInfo._id ? userInfo.name : '点击登录' }}</span>
                    </Button>
                    <!-- 店铺选择 -->
                    <Dropdown trigger="click">
                        <Button :type="shopInfo._id ? 'warning' : 'default'" size="small">
                            <span class="fa fa-users"></span>
                            <span>{{ shopInfo._id ? shopInfo.name : '点击选择店铺' }}</span>
                        </Button>
                        <DropdownMenu slot="list">
                            <div class="flex-y">
                                <Button
                                    size="small"
                                    v-for="(shop, index) in react.shopList"
                                    :key="index"
                                    :type="shopInfo._id === shop._id ? 'warning' : 'default'"
                                    @click.stop="react.pickShop(shop)"
                                >
                                    {{ shop.name }}
                                </Button>
                                <Button
                                    size="small"
                                    v-for="(shop, index) in react.officeList"
                                    :key="index"
                                    :type="shopInfo._id === shop._id ? 'warning' : 'default'"
                                    @click.stop="react.pickShop(shop)"
                                >
                                    {{ shop.name }}
                                </Button>
                                <Button size="small" @click.stop="react.shopModal = true">
                                    添加店铺 +
                                </Button>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                    <!-- 仓库选择 -->
                    <Dropdown trigger="click" v-show="shopInfo._id">
                        <Button :type="houseInfo._id ? 'success' : 'default'" size="small">
                            <span class="fa fa-home"></span>
                            <span>{{ houseInfo._id ? houseInfo.name : '点击选择仓库' }}</span>
                        </Button>
                        <DropdownMenu slot="list">
                            <div class="flex-y">
                                <Button
                                    size="small"
                                    v-for="(house, index) in react.houseList"
                                    :key="index"
                                    :type="houseInfo._id === house._id ? 'success' : 'default'"
                                    @click.stop="react.pickHouse(house)"
                                >
                                    {{ house.name }}
                                </Button>
                                <Button size="small" @click.stop="react.houseModal = true">
                                    添加仓库 +
                                </Button>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="container-board-content">
                    <Employee v-if="react.sideIndex === 0" />
                    <House v-if="react.sideIndex === 1" />
                    <Order v-if="react.sideIndex === 2" />
                </div>
            </div>
        </div>

        <!-- 登录框 -->
        <Modal v-model="react.loginModal" title="用户登录" width="350">
            <Form label-position="top">
                <FormItem label="手机号">
                    <Input v-model="react.userModel.phone" placeholder="请输入手机号" />
                </FormItem>
                <FormItem label="密码">
                    <Input v-model="react.userModel.password" type="password" placeholder="请输入密码" />
                </FormItem>
                <FormItem label="昵称">
                    <Input v-model="react.userModel.name" placeholder="请输入昵称 (可选)" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.loginModal = false">取消</Button>
                <Button type="primary" @click.stop="react.loginConfirm">登录/注册</Button>
            </div>
        </Modal>

        <!-- 店铺列表 -->
        <Modal v-model="react.shopModal" title="创建店铺" width="350">
            <Form label-position="top">
                <FormItem label="店铺名称">
                    <Input v-model="react.shopCreateName" placeholder="请输新店铺名称" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.shopModal = false">取消</Button>
                <Button type="warning" @click.stop="react.createMyShop">创建店铺</Button>
            </div>
        </Modal>

        <!-- 仓库列表 -->
        <Modal v-model="react.houseModal" title="创建仓库" width="350">
            <Form label-position="top">
                <FormItem label="仓库名称">
                    <Input v-model="react.houseCreateName" placeholder="请输新仓库名称" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.houseModal = false">取消</Button>
                <Button type="success" @click.stop="react.createMyHouse">创建仓库</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import React from './React.js'
    import Employee from '../Employee/Employee.vue'
    import House from '../House/House.vue'
    import Order from '../Order/Order.vue'
    export default {
        data() {
            return {
                react: new React(),
            }
        },
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
        components: {
            Employee,
            House,
            Order,
        },
        methods: {
            test() {
                console.log(123)
            },
        },
        beforeCreate() {
            window.$load = {
                show: () =>
                    this.$Message.loading({
                        content: '请稍后',
                        duration: 0.5,
                    }),
                hide: () => {
                    // this.$Message.destroy()
                },
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
    @import '@/css/sjShop/_index.scss';
</style>
