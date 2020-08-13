<template>
    <div class="index">
        <div class="title">选择您的店铺</div>
        <p>
            <span>我管理的店铺</span>
            <span class="sj-link">新开店铺</span>
        </p>
        <div class="cards flex-wrap">
            <div
                class="shop-card sj-shadow"
                v-for="(shop, index) in masterShopList"
                :key="index"
                :class="{ 'shop-card-on': nowShopId === shop.id }"
                @click.stop="resetNowShop(shop)"
            >
                {{ shop.name }}
            </div>
        </div>
        <p>
            <span>我加入的店铺</span>
            <span class="sj-link">加入店铺</span>
        </p>
        <div class="cards flex-wrap">
            <div
                class="shop-card sj-shadow"
                v-for="(shop, index) in employeeShopList"
                :key="index"
                :class="{ 'shop-card-on': nowShopId === shop.id }"
                @click.stop="resetNowShop(shop)"
            >
                {{ shop.name }}
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
                console.log('reset', shop.id)
                this.$store.commit('initShopInfo', { name: shop.name, id: shop.id })
                this.initNowShop()
            },
            // * 初始化APP店铺信息
            initNowShop() {
                this.nowShopId = this.userInfo.nowShopInfo.id
                console.log('initNowShop', this.nowShopId)
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
