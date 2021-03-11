<template>
    <div>
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <div>
            <v-btn class="ma-1 ml-0" color="green" small @click.stop="react.reLogin">{{ userAccount || '点击登录' }}</v-btn>
            <v-btn class="ma-1 ml-0" color="orange" small @click.stop="react.initReact">重置</v-btn>
        </div>
        <v-divider></v-divider>
        <div class="d-flex py-2">
            <!-- Shop -->
            <!-- Shop -->
            <!-- Shop -->
            <!-- Shop -->
            <v-card>
                <v-card-title>店铺列表</v-card-title>
                <v-card-subtitle>我的店铺 {{ react.shopList.length === 0 ? '(暂无)' : '' }}</v-card-subtitle>
                <v-card-text class="d-flex flex-column">
                    <v-btn
                        class="mb-1"
                        small
                        v-for="(shop, i) in react.shopList"
                        :key="i"
                        :color="shop.picked ? 'orange' : ''"
                        @click.stop="react.pickShop($event, shop)"
                    >
                        {{ shop.name }}
                    </v-btn>
                    <v-btn class="mt-1" color="orange" outlined small @click.stop="react.toggleShopModal($event)">创建新店铺</v-btn>
                </v-card-text>
                <v-card-subtitle>我加入的店铺 {{ react.officeList.length === 0 ? '(暂无)' : '' }}</v-card-subtitle>
                <v-card-text class="d-flex flex-column">
                    <v-btn
                        class="mb-1"
                        small
                        v-for="(office, i) in react.officeList"
                        :key="i"
                        :color="shop.picked ? 'orange' : ''"
                        @click.stop="react.pickShop($event, shop)"
                    >
                        {{ office.name }}
                    </v-btn>
                </v-card-text>
            </v-card>
            <!-- House -->
            <!-- House -->
            <!-- House -->
            <!-- House -->
            <v-card class="mx-2">
                <v-card-title>仓库列表</v-card-title>
                <v-card-subtitle>我的仓库</v-card-subtitle>
                <v-card-text class="d-flex flex-column">
                    <v-btn
                        class="mb-1"
                        small
                        v-for="(house, i) in react.houseList"
                        :key="i"
                        :color="house.picked ? 'orange' : ''"
                        @click.stop="react.pickHouse($event, house)"
                    >
                        {{ house.name }}
                    </v-btn>
                    <v-btn color="orange" outlined small @click.stop="react.toggleHouseModal($event)">创建新仓库</v-btn>
                </v-card-text>
            </v-card>
            <!-- Employee -->
            <!-- Employee -->
            <!-- Employee -->
            <!-- Employee -->
            <v-card>
                <v-card-title>雇员列表</v-card-title>
                <v-card-text class="d-flex flex-column">
                    <v-simple-table fixed-header dense>
                        <thead>
                            <tr>
                                <th>账号</th>
                                <th>角色</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="employee in react.employeeList" :key="employee.account">
                                <td>{{ employee.account }}</td>
                                <td>{{ employee.roleName }}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </div>
        <!-- 登录对话 -->
        <!-- 登录对话 -->
        <!-- 登录对话 -->
        <!-- 登录对话 -->
        <v-dialog v-model="react.loginModal" persistent width="400">
            <v-card>
                <v-card-title>登录</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field v-model="react.userModel.account" label="账号" hint="请输入账号，长度至少为5位" />
                        <v-text-field v-model="react.userModel.password" label="密码" hint="请输入账号，长度至少为5位" type="password" />
                        <v-text-field v-model="react.userModel.nickname" label="昵称 (可选)" />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click.stop="react.loginModal = false">取消</v-btn>
                    <v-btn color="green" dark @click.stop="react.loginModalOk">登录</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 新增/编辑店铺的弹窗 -->
        <!-- 新增/编辑店铺的弹窗 -->
        <!-- 新增/编辑店铺的弹窗 -->
        <!-- 新增/编辑店铺的弹窗 -->
        <v-dialog v-model="react.shopModal" persistent width="500">
            <v-card>
                <v-card-title>店铺</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field v-model="react.shopModel.name" label="店铺名称" hint="请输入店铺名称" />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click.stop="react.toggleShopModal($event)">取消</v-btn>
                    <v-btn color="orange" dark @click.stop="react.actionShop">{{ react.shopModel._id ? `编辑店铺` : '新增店铺' }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 新增/编辑仓库的弹窗 -->
        <!-- 新增/编辑仓库的弹窗 -->
        <!-- 新增/编辑仓库的弹窗 -->
        <!-- 新增/编辑仓库的弹窗 -->
        <v-dialog v-model="react.houseModal" persistent width="500">
            <v-card>
                <v-card-title>仓库</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field v-model="react.houseModel.name" label="仓库名称" hint="请输入仓库名称" />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click.stop="react.toggleHouseModal($event)">取消</v-btn>
                    <v-btn color="orange" dark @click.stop="react.actionHouse">{{ react.houseModel._id ? `编辑仓库` : '新增仓库' }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    // import draggable from 'vuedraggable'
    import ReactHall from './React.js'
    export default {
        data() {
            return {
                react: new ReactHall(),
            }
        },
        computed: {
            userAccount() {
                return $store.state.userInfo.account
            },
            shopName() {
                return $store.state.shopInfo.name
            },
            houseName() {
                return $store.state.houseInfo.name
            },
        },
        methods: {},
        beforeCreate() {},
    }
</script>
<style lang="scss" scoped></style>
