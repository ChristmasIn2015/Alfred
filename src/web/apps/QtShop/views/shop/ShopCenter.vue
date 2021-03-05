<template>
    <div>
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <div>
            <v-btn class="mr-1 mb-2" color="orange" outlined @click.stop="react.initReact">刷新</v-btn>
        </div>
        <v-divider></v-divider>
        <!-- Shop -->
        <!-- Shop -->
        <!-- Shop -->
        <!-- Shop -->
        <div class="my-4">
            <div>我的店铺 {{ react.shopList.length === 0 ? '(暂无)' : '' }}</div>
            <v-btn v-for="(shop, i) in react.shopList" :key="i" class="mr-2" :color="shop.picked ? 'orange' : ''" @click.stop="react.pickShop($event, shop)">
                {{ shop.name }}
            </v-btn>
            <v-btn class="ma-2 ml-0" color="orange" outlined @click.stop="react.toggleShopModal($event)">创建新店铺</v-btn>
        </div>
        <!-- Office -->
        <!-- Office -->
        <!-- Office -->
        <!-- Office -->
        <div class="my-4">
            <div>我加入的店铺 {{ react.officeList.length === 0 ? '(暂无)' : '' }}</div>
            <v-btn
                v-for="(office, i) in react.officeList"
                :key="i"
                class="mr-2"
                :color="shop.picked ? 'orange' : ''"
                @click.stop="react.pickShop($event, shop)"
                >{{ office.name }}</v-btn
            >
        </div>
        <!-- House -->
        <!-- House -->
        <!-- House -->
        <!-- House -->
        <v-divider></v-divider>
        <div class="my-4" v-show="shopName">
            <div>当前仓库： {{ houseName || '(暂无)' }}</div>
            <v-btn
                v-for="(house, i) in react.houseList"
                :key="i"
                class="mr-2"
                :color="house.picked ? 'orange' : ''"
                @click.stop="react.pickHouse($event, house)"
            >
                {{ house.name }}
            </v-btn>
            <v-btn class="ma-2 ml-0" color="orange" outlined @click.stop="react.toggleHouseModal($event)">创建新仓库</v-btn>
        </div>
        <v-divider></v-divider>
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
    import ReactShopCenter from './React.js'
    export default {
        data() {
            return {
                react: new ReactShopCenter(),
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
