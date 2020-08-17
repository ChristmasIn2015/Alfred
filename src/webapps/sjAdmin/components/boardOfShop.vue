<template>
    <div class="index">
        <div class="board-title">我管理的店铺</div>
        <div class="btn-line flex-wrap">
            <div
                class="sj-btn blue-on"
                v-for="(shop, index) in masterShopList"
                :key="index"
                :class="{ blue: nowShopId === shop.id }"
                @click.stop="resetNowShop(shop)"
            >
                <span>{{ shop.name }}</span>
                <span class="close"></span>
            </div>
            <div class="sj-btn blue">新开店铺</div>
        </div>
        <div class="board-title">我加入的店铺</div>
        <div class="btn-line flex-wrap">
            <div
                class="sj-btn blue-on"
                v-for="(shop, index) in employeeShopList"
                :key="index"
                :class="{ blue: nowShopId === shop.id }"
                @click.stop="resetNowShop(shop)"
            >
                <span>{{ shop.name }}</span>
                <span class="close"></span>
            </div>
            <div class="sj-btn blue">加入店铺</div>
        </div>
        <div class="board-title">员工列表</div>
        <div class="table">
            <div class="row flex">
                <div class="column">Id</div>
                <div class="column">姓名</div>
                <div class="column">手机号</div>
                <div class="column" style="width: 100%;"></div>
                <div class="column"></div>
            </div>
            <div class="row flex">
                <div class="column">-1</div>
                <div class="column">
                    <input />
                </div>
                <div class="column">
                    <input />
                </div>
                <div class="column" style="width: 100%;"></div>
                <div class="column">
                    <div class="sj-btn blue">添加</div>
                </div>
            </div>
            <div class="row flex" v-for="(employee, index) in employeeList" :key="index">
                <div class="column" v-for="(value, key) in employee" :key="key">{{ value }}</div>
                <div class="column" style="width: 100%;"></div>
                <div class="column">
                    <div class="sj-link" style="color: red;">删除</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                nowShopId: -1,
                masterShopList: [
                    { name: '店铺1号', id: -11 },
                    { name: '店铺2号', id: -2 },
                    { name: '店铺3号', id: -3 },
                    { name: '店铺4号', id: -4 },
                ],
                employeeShopList: [
                    { name: '店铺5号', id: -5 },
                    { name: '店铺6号', id: -6 },
                    { name: '店铺7号', id: -7 },
                    { name: '店铺8号', id: -8 },
                ],

                employeeList: [
                    { id: -1, name: '员工A', phone: -1 },
                    { id: -1, name: '员工A', phone: -1 },
                    { id: -1, name: '员工A', phone: -1 },
                    { id: -1, name: '员工A', phone: -1 },
                ],
            }
        },
        computed: {
            userInfo() {
                let info = this.$store.getters.getUserInfo
                return info
            },
        },
        mounted() {
            this.initNowShop()
        },
        methods: {
            // * 重新选择当前店铺
            resetNowShop(shop) {
                this.$store.commit('initShopInfo', { name: shop.name, id: shop.id })
                this.initNowShop()
            },
            // * 初始化APP店铺信息
            initNowShop() {
                this.nowShopId = this.userInfo.nowShopInfo.id
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import 'boardPublic.scss';
    .index {
        margin: 1rem;
        padding: 1rem;
        background-color: $sj-white;
    }
</style>
