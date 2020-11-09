<template>
    <div class="over-box">
        <div class="order-form">
            <div class="title">{{ shopInfo.name }}</div>
            <div class="title2">现货销售单</div>
            <div class="flex-side">
                <div>
                    <span style="margin-right: 1rem;">开单日期</span>
                    <span>{{ new Date().toLocaleString('chinese', { hour12: false }) }}</span>
                </div>
                <div>
                    <span style="margin-right: 1rem;">No.</span>
                    <span>- 自动生成 -</span>
                </div>
            </div>
            <div class="print-table">
                <div class="row">
                    <div class="column fix">购货单位</div>
                    <div class="column" style="text-align: left; padding: 0rem 1rem;">
                        <div class="sj-link" @click.stop="pageModel.toggleCustomerModal">{{ pageModel.companyName || '点击选择购货单位' }}</div>
                    </div>
                    <div class="column fix">地址电话</div>
                    <div class="column" style="text-align: left; padding: 0rem 1rem;">
                        <div>{{ pageModel.companyName ? `${pageModel.companyAddress} ${pageModel.contact}` : '- 自动生成 -' }}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="column">商品编号</div>
                    <div class="column">品名 规格</div>
                    <div class="column">数量/单位</div>
                    <div class="column">金额</div>
                    <div class="column">备 注</div>
                </div>
                <div class="row" v-for="(good, index) in pageModel.goodListPicked" :key="index">
                    <div class="column">
                        {{ good._id }}
                    </div>
                    <div class="column">
                        <span>{{ good.name }}</span>
                        <span v-for="(tag, plugIndex) in good.plugList" :key="plugIndex" style="margin-right: 0.25rem">
                            {{ tag.value + tag.name }}
                        </span>
                    </div>
                    <div class="column">
                        <div style="margin-right: 0.5rem" v-for="(tag, countIndex) in good.countList" :key="countIndex">
                            <span>{{ tag.value }}</span>
                            <span>{{ tag.name }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div>{{ good.cost }}元</div>
                    </div>
                    <div class="column">
                        <span>{{ good.tip }}</span>
                        <span v-show="good._id" class="sj-link red" style="margin-left: 1rem;" @click.stop="pageModel.deleteGoodPicked(index)">删除商品</span>
                    </div>
                </div>
                <div class="row">
                    <div class="column">大写金额</div>
                    <div class="column">-</div>
                </div>
            </div>
        </div>

        <!-- 底部按钮 -->
        <div class="box-btn-line" style="margin-top: 1rem;">
            <div class="sj-btn" style="margin-left: auto;" @click.stop="pageModel.toggleGoodModal">选择商品</div>
            <div class="sj-btn">创建订单</div>
        </div>

        <!-- 客户弹窗 -->
        <div class="sj-modal-right right-scroll-off" :class="{ 'right-scroll-on': pageModel.customerModal }">
            <div class="left" @click.stop="pageModel.toggleCustomerModal"></div>
            <div class="right">
                <div class="card">
                    <div class="title">客户列表</div>
                    <div class="card-line">
                        <input type="text" v-model="pageModel.companyName" placeholder="公司名称" />
                        <input type="text" v-model="pageModel.companyAddress" placeholder="公司地址" />
                        <input type="text" v-model="pageModel.contact" placeholder="公司联系人" />
                        <div class="sj-btn blue" @click.stop="pageModel.addCustomer">
                            + 添加新客户
                        </div>
                    </div>
                    <div class="sj-btn tip-on" v-for="(customer, index) in pageModel.customerList" :key="index" @click.stop="pageModel.pickCustomer(index)">
                        <span style="margin-right: 1rem;">{{ customer.companyName }}({{ customer.contact }})：{{ customer.companyAddress }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 商品弹窗 -->
        <div class="sj-modal-back" v-show="pageModel.goodModal">
            <div class="modal">
                <div class="title">
                    <span>库存</span>
                    <span @click.stop="pageModel.toggleGoodModal">✖</span>
                </div>
                <div class="content">
                    <!-- 筛选区域 -->
                    <div class="box-btn-line">
                        <div
                            class="sj-btn tip-on tag"
                            v-for="(item, index) in pageModel.goodNameList"
                            :key="index"
                            :class="{ tip: item.checked }"
                            @click.stop="pageModel.pickGoodName(index)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                    <div class="box-btn-line flex-x-reverse">
                        <input
                            type="text"
                            v-model="pageModel.goodPlugSearchKey"
                            @input.self="pageModel.filterGoodList"
                            style="margin-right: auto;"
                            placeholder="请输入规格进行搜索"
                        />
                    </div>

                    <!-- 商品列表 -->
                    <div class="box-table">
                        <div class="row">
                            <div class="column">商品名称</div>
                            <div class="column" style="width: 30rem">规格</div>
                            <div class="column">库存</div>
                            <div class="column">入库成本</div>
                            <div class="column">备注</div>
                            <div class="column">操作</div>
                        </div>
                    </div>
                    <div class="box-table" style="max-height: 30rem; overflow-y: auto;">
                        <div class="row" v-for="(good, index) in pageModel.goodList" :key="index">
                            <div class="column">{{ good.name }}</div>
                            <div class="column" style="width: 30rem">
                                <div v-for="(tag, plugIndex) in good.plugList" :key="plugIndex" style="margin-right: 0.25rem">
                                    {{ tag.value + tag.name }}
                                </div>
                            </div>
                            <div class="column">
                                <div style="margin-right: 0.5rem" v-for="(tag, countIndex) in good.countList" :key="countIndex">
                                    <span>{{ tag.value }}</span>
                                    <span>{{ tag.name }}</span>
                                </div>
                            </div>
                            <div class="column">
                                <div>{{ good.cost }}元</div>
                            </div>
                            <div class="column">{{ good.tip }}</div>
                            <div class="column">
                                <div v-if="!good.inOrder" class="sj-btn green tag" @click.stop="pageModel.pickGoodInForm(good)">
                                    开单
                                </div>
                                <div v-else>已选择</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Model from './model/Model.js'
    export default {
        data() {
            return {
                pageModel: new Model(),
            }
        },
        computed: {
            userInfo() {
                let info = this.$store.state.userInfo
                return info
            },
            shopInfo() {
                let info = this.$store.state.shopInfo
                return info
            },
            houseInfo() {
                let info = this.$store.state.houseInfo
                return info
            },
        },
        mounted() {},
    }
</script>

<style lang="scss" scoped>
    .order-form {
        // width: 64rem;
        margin: 0 auto;
        .title {
            text-align: center;
            font-size: 2.5rem;
            margin: 0.5rem auto 0rem;
        }
        .title2 {
            text-align: center;
            font-size: 1.5rem;
            margin: 0.5rem auto 1rem;
        }
        .print-table {
            margin-top: 1rem;
            font-size: 1rem;
            border-top: 1px solid $tip-lower;
            border-left: 1px solid $tip-lower;
            .row {
                min-height: 3rem;
                display: flex;
                border-bottom: 1px solid $tip-lower;
                .column {
                    line-height: 2.5rem;
                    text-align: center;
                    border-right: 1px solid $tip-lower;
                    width: 100%;
                }
                .fix {
                    width: 14rem;
                }
            }
        }
    }
</style>
