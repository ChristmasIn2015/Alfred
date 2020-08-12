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
                @click.stop="initNowShop(shop)"
            >
                {{ shop.name }}
            </div>
        </div>
        <p>员工列表</p>
        <div class="table">
            <div class="row flex">
                <div class="column">Id</div>
                <div class="column">姓名</div>
                <div class="column">手机号</div>
                <div class="flex" style="margin-left: auto;">
                    <div class="column"></div>
                    <div class="column"></div>
                </div>
            </div>
            <div class="row flex" v-for="(employee, index) in employeeList" :key="index">
                <div class="column" v-for="(value, key) in employee" :key="key">{{ value }}</div>
                <div class="flex" style="margin-left: auto;">
                    <div class="column">
                        <div class="sj-link" style="color: red;">删除</div>
                    </div>
                    <div class="column">
                        <div class="sj-link">录用</div>
                    </div>
                </div>
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
                @click.stop="initNowShop(shop)"
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
                    { name: '店铺1号', id: -1 },
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
        created() {},
        methods: {
            // * 初始化APP店铺信息
            initNowShop(shop) {
                this.nowShopId = shop.id
                this.$store.commit('initShopInfo', { name: shop.name, id: shop.id })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .index {
        margin: 1rem;
        padding: 1rem;
        background-color: $sj-white;
        .title {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.5rem;
            .sj-link {
                margin-left: 1rem;
            }
        }
        .cards {
            .shop-card {
                line-height: 4rem;
                padding: 0rem 1rem;
                margin: 1rem 0.5rem;
                &:hover {
                    color: $sj-main;
                }
            }
            .shop-card-on {
                background-color: $sj-main;
                color: $sj-white;
            }
        }
        .table {
            margin: 1rem 0rem;
            .row {
                margin: 0.1rem 0rem;
                .column {
                    background-color: $sj-tip-lower;
                    width: 4rem;
                    text-align: center;
                    line-height: 2rem;
                }
            }
        }
    }
</style>
