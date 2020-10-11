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
                    <div class="column" v-if="!pageModel.companyName">
                        <div class="sj-link" @click.stop="pageModel.toggleCustomerModal">点击选择购货单位</div>
                    </div>
                    <div class="column" v-else>
                        <div class="sj-link" @click.stop="pageModel.toggleCustomerModal">{{ pageModel.companyName }}</div>
                    </div>
                    <div class="column fix">地址电话</div>
                    <div class="column">
                        <div>{{ pageModel.companyName ? `${pageModel.companyAddress} ${pageModel.contact}` : '- 自动生成 -' }}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="column">商品编号</div>
                    <div class="column">品名 规格</div>
                    <div class="column">数量/单位</div>
                    <div class="column">单价</div>
                    <div class="column">金额</div>
                    <div class="column">备 注</div>
                </div>
                <div class="row">
                    <div class="column"></div>
                    <div class="column">
                        <div class="sj-link">选择商品</div>
                    </div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                </div>
                <div class="row">
                    <div class="column">大写金额</div>
                    <div class="column">-</div>
                </div>
            </div>
        </div>

        <!-- 客户弹窗 -->
        <div class="sj-modal-right right-scroll-off" :class="{ 'right-scroll-on': pageModel.customerModal }">
            <div class="left" @click.stop="pageModel.toggleCustomerModal"></div>
            <div class="right">
                <div class="card">
                    <div class="title">客户列表</div>
                    <div class="card-line">
                        <input type="text" v-model="pageModel.companyName" placeholder="新客户公司名称" />
                        <input type="text" v-model="pageModel.companyAddress" placeholder="新客户公司地址" />
                        <input type="text" v-model="pageModel.contact" placeholder="新客户公司联系人" />
                        <div class="sj-btn blue" @click.stop="pageModel.addCustomer">
                            + 添加新客户
                        </div>
                    </div>
                    <div class="sj-btn blue" v-for="(customer, index) in pageModel.customerList" :key="index" @click.stop="pageModel.pickCustomer(index)">
                        <span style="margin-right: 1rem;">公司名称：{{ customer.companyName }}</span>
                        <span style="margin-right: 1rem;">公司地址：{{ customer.companyAddress }}</span>
                        <span>联系人：{{ customer.contact }}</span>
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
        width: 64rem;
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
            border-top: 1px solid $sj-tip-lower;
            border-left: 1px solid $sj-tip-lower;
            .row {
                display: flex;
                border-bottom: 1px solid $sj-tip-lower;
                .column {
                    line-height: 2.5rem;
                    text-align: center;
                    border-right: 1px solid $sj-tip-lower;
                    width: 100%;
                }
                .fix {
                    width: 14rem;
                }
            }
        }
    }
</style>
