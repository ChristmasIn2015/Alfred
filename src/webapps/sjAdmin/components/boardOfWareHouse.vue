<template>
    <div class="index">
        <div class="title">我的仓库</div>
        <div class="cards flex-wrap">
            <div
                class="shop-card sj-shadow"
                v-for="(wareHouse, index) in wareHouseList"
                :key="index"
                :class="{ 'shop-card-on': nowWareHouse && nowWareHouse.id === wareHouse.id }"
                @click.stop="resetNowWareHouse(index)"
            >
                {{ wareHouse.name }}
            </div>
        </div>
        <div class="flex-x-reverse">
            <div class="sj-btn blue">新增仓库</div>
        </div>
        <div class="title">{{ nowWareHouse ? `${nowWareHouse.name}的库存` : '请选择仓库' }}</div>
        <div v-show="nowWareHouse && nowWareHouse.id">
            <p>
                <span>按名称筛选库存</span>
                <input />
            </p>
            <p>
                <span>按价格筛选库存</span>
                <input />
            </p>
            <p>
                <span>按规格筛选</span>
                <span class="sj-link">新增</span>
            </p>
            <div class="over-box flex-wrap">
                <div class="table-tag" v-for="(tag, index) in commodityTagList" :key="index">{{ `${tag.name}: ${tag.valueBy}` }}</div>
            </div>
            <div class="flex-x-reverse">
                <div class="sj-btn blue">商品入库</div>
            </div>
            <div class="table">
                <div class="row flex">
                    <div class="column">Id</div>
                    <div class="column">名称</div>
                    <div class="column">价格</div>
                    <div class="column">剩余数量</div>
                    <div class="column commodity-tag-column">规格</div>
                    <div class="column"></div>
                    <div class="column"></div>
                </div>
                <div class="over-box">
                    <div v-if="nowWareHouse && wareHouseCommodityMap[nowWareHouse.id]">
                        <div class="row flex" v-for="(employee, index) in wareHouseCommodityMap[nowWareHouse.id]" :key="index">
                            <div class="column" v-for="(value, key) in employee" :key="key" :class="{ 'commodity-tag-column': key === 'commodityTags' }">
                                <span v-if="key !== 'commodityTags'">{{ value }}</span>
                                <span v-if="key === 'commodityTags'" class="flex-middle-y">
                                    <div class="table-tag" v-for="(tag, index) in value" :key="index">{{ `${tag.name}:${tag.value} ${tag.valueBy}` }}</div>
                                </span>
                            </div>
                            <div class="column">
                                <div class="sj-link" style="color: red;">删除</div>
                            </div>
                            <div class="column">
                                <div class="sj-link">加工</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                nowWareHouseIndex: -1,
                wareHouseList: [
                    { name: '仓库A', id: -1 },
                    { name: '仓库B', id: -2 },
                    { name: '仓库C', id: -3 },
                ],
                wareHouseCommodityMap: {
                    '-1': [
                        {
                            id: -1,
                            name: '商品A',
                            price: 999,
                            quantity: 123,
                            commodityTags: [
                                { name: '宽度', id: -1, value: '100', valueBy: 'cm' },
                                { name: '长度', id: -2, value: '12', valueBy: 'm' },
                            ],
                        },
                        {
                            id: -1,
                            name: '商品B',
                            price: 1200,
                            quantity: 123,
                            commodityTags: [
                                { name: '宽度', id: -1, value: '100', valueBy: 'cm' },
                                { name: '色泽', id: -3, value: '深红', valueBy: '色' },
                                { name: '重量', id: -4, value: '1000', valueBy: 'kg' },
                            ],
                        },
                    ],
                    '-3': [
                        {
                            id: -1,
                            name: '商品AAAAA',
                            price: 999,
                            quantity: 123,
                            commodityTags: [
                                { name: '宽度', id: -1, value: '100', valueBy: 'cm' },
                                { name: '长度', id: -2, value: '12', valueBy: 'm' },
                            ],
                        },
                        {
                            id: -1,
                            name: '商品BCSADSA',
                            price: 1200,
                            quantity: 123,
                            commodityTags: [
                                { name: '宽度', id: -1, value: '100', valueBy: 'cm' },
                                { name: '色泽', id: -3, value: '深红', valueBy: '色' },
                                { name: '重量', id: -4, value: '1000', valueBy: 'kg' },
                            ],
                        },
                    ],
                },
                commodityTagList: [
                    { name: '宽度', id: -1, value: '', valueBy: 'cm' },
                    { name: '色泽', id: -3, value: '', valueBy: '色' },
                    { name: '重量', id: -4, value: '', valueBy: 'kg' },
                    { name: '宽度', id: -1, value: '', valueBy: 'cm' },
                    { name: '长度', id: -2, value: '', valueBy: 'm' },
                ],
            }
        },
        computed: {
            userInfo() {
                let info = this.$store.getters.getUserInfo
                return info
            },
            nowWareHouse() {
                return this.wareHouseList[this.nowWareHouseIndex] || null
            },
        },
        mounted() {},
        methods: {
            // * 选择仓库
            resetNowWareHouse(index) {
                this.nowWareHouseIndex = index
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
