<template>
    <div id="app" class="no-scroll-bar">
        <div class="app-container">
            <!-- ************************************************************* -->
            <div>
                <Button type="success" @click.stop="model.chargeLogin">
                    <Icon type="md-person" />
                    <span>{{ userInfo.phone || '请登录' }}</span>
                </Button>
                <Button type="warning" @click.stop="model.toggleShopModal">
                    <Icon type="md-home" />
                    <span>{{ shopInfo.name || '请选择店铺' }}</span>
                </Button>
                <Button type="warning" @click.stop="model.toggleHouseModal">
                    <Icon type="ios-paper" />
                    <span>{{ houseInfo.name || '请选择仓库' }}</span>
                </Button>
                <Button
                    v-for="(side, index) in model.sideList"
                    :key="index"
                    :type="model.sideIndex === index ? 'primary' : 'info'"
                    @click.stop="model.pickSide(index)"
                >
                    <Icon :type="side.icon" />
                    <span>{{ side.name }}</span>
                </Button>
            </div>
            <!-- ************************************************************* -->
            <Employee v-if="model.sideIndex === 0" />
            <House v-if="model.sideIndex === 1" />
            <Order v-if="model.sideIndex === 2" />
        </div>

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
                <Button type="info" @click.stop="model.postLogin">登录/注册</Button>
            </div>
        </Modal>

        <!-- 店铺列表 -->
        <Modal v-model="model.shopModal" title="店铺列表">
            <br />
            <div class="flex-middle-y">
                <Input v-model="model.shopCreateName" size="large" placeholder="请输新店铺名称" />
                <Button @click.stop="model.createMyShop">创建</Button>
            </div>
            <br />
            <h3>我的店铺</h3>
            <br />
            <List border>
                <ListItem v-for="(shop, index) in model.shopList" :key="index">
                    <div>{{ shop.name }}</div>
                    <div slot="action">
                        <Button disabled v-show="shop._id === shopInfo._id">已选择</Button>
                        <Button v-show="shop._id !== shopInfo._id" @click.stop="model.pickShop(shop)">选择</Button>
                    </div>
                </ListItem>
            </List>
            <br />
            <h3>我加入的店铺</h3>
            <br />
            <List border>
                <ListItem v-for="(office, index) in model.officeList" :key="index">
                    <div>{{ office.name }}</div>
                    <div slot="action">
                        <Button @click.stop="pickShop(shop)">选择</Button>
                    </div>
                </ListItem>
            </List>
            <div slot="footer"></div>
        </Modal>

        <!-- 仓库列表 -->
        <Modal v-model="model.houseModal" title="仓库列表">
            <br />
            <div class="flex-middle-y">
                <Input v-model="model.houseCreateName" size="large" placeholder="请输新仓库名称" />
                <Button @click.stop="model.createMyHouse">创建</Button>
            </div>
            <br />
            <h3>{{ shopInfo.name }}的仓库列表</h3>
            <br />
            <List border>
                <ListItem v-for="(house, index) in model.houseList" :key="index">
                    <div>{{ house.name }}</div>
                    <div slot="action">
                        <Button disabled v-show="house._id === houseInfo._id">已选择</Button>
                        <Button v-show="house._id !== houseInfo._id" @click.stop="model.pickHouse(house)">选择</Button>
                    </div>
                </ListItem>
            </List>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    import Model from './model/Admin/Model.js'
    import Employee from './views/Employee.vue'
    import House from './views/House.vue'
    import Order from './views/Order.vue'
    export default {
        beforeCreate() {
            window.$load = {
                show: () =>
                    this.$Message.loading({
                        content: '请稍后',
                        duration: 0,
                    }),
                hide: () => this.$Message.destroy(),
            }
            window.$tip = (message) =>
                this.$Message['success']({
                    background: true,
                    content: message,
                })
            window.$warn = (message) =>
                this.$Notice.warning({
                    title: message,
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
        data() {
            return {
                model: new Model(),
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
            test(params) {
                console.log(params)
                model.sideIndex = 0
            },
        },
    }
</script>

<style lang="scss">
    @import '@/public/css/default.scss';
    #app {
        padding: 3rem 0rem;
        background-color: $back-higher;
        .app-container {
            background-color: $back;
            margin: 0rem 3rem;
            border-radius: 1rem;
            height: 100%;
            overflow: hidden;
        }
    }
</style>
