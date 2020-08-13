<template>
    <div class="index">
        <div class="title">商品管理</div>
        <p>
            <span>商品规格</span>
        </p>
        <div class="over-box flex-wrap">
            <div class="table-tag" v-for="(tag, index) in commodityTagList" :key="index">{{ `${tag.name}: ${tag.valueBy}` }}</div>
        </div>
        <p>
            <span>已选择的商品</span>
        </p>
        <div class="table">
            <div class="row flex">
                <div class="column">Id</div>
                <div class="column">名称</div>
                <div class="column">价格</div>
                <div class="column commodity-tag-column">规格</div>
                <div class="column"></div>
            </div>
        </div>
        <p>
            <span>按名称查找库存</span>
            <input />
        </p>
        <p>
            <span>按价格查找库存</span>
            <input />
        </p>
        <p>
            <span>商品列表</span>
        </p>
        <div class="flex-x-reverse">
            <div class="sj-btn blue">新增商品</div>
        </div>
        <div class="table">
            <div class="row flex">
                <div class="column">Id</div>
                <div class="column">名称</div>
                <div class="column">价格</div>
                <div class="column commodity-tag-column">规格</div>
                <div class="column"></div>
            </div>
            <div class="over-box">
                <div v-for="a in 100">
                    <div class="row flex" v-for="(employee, index) in commodityList" :key="index">
                        <div class="column" v-for="(value, key) in employee" :key="key" :class="{ 'commodity-tag-column': key === 'commodityTags' }">
                            <span v-if="key !== 'commodityTags'">{{ value }}</span>
                            <span v-if="key === 'commodityTags'" class="flex-middle-y">
                                <div class="table-tag" v-for="(tag, index) in value" :key="index">{{ `${tag.name}:${tag.value} ${tag.valueBy}` }}</div>
                            </span>
                        </div>
                        <div class="column">
                            <div class="sj-link" style="color: red;">删除</div>
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
                commodityList: [
                    {
                        id: -1,
                        name: '商品A',
                        price: 999,
                        commodityTags: [
                            { name: '宽度', id: -1, value: '100', valueBy: 'cm' },
                            { name: '长度', id: -2, value: '12', valueBy: 'm' },
                        ],
                    },
                    {
                        id: -1,
                        name: '商品B',
                        price: 1200,
                        commodityTags: [
                            { name: '宽度', id: -1, value: '100', valueBy: 'cm' },
                            { name: '色泽', id: -3, value: '深红', valueBy: '色' },
                            { name: '重量', id: -4, value: '1000', valueBy: 'kg' },
                        ],
                    },
                ],
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
        },
        mounted() {
            this.initNowCommodity()
        },
        methods: {
            // * 初始化商品信息
            initNowCommodity() {
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
