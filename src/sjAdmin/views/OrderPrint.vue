<template>
    <div class="print flex-y">
        <div id="print-record">
            <div class="title">{{ info.shop.name }} 销售单</div>
            <div class="line-box">
                <div class="line">
                    <span>订单编号</span>
                    <span>{{ info.order._id }}</span>
                </div>
                <div class="line">
                    <span>制单日期</span>
                    <span>{{ info.order.timeString }}</span>
                </div>
                <div class="line">
                    <span>业务员</span>
                    <span>{{ info.user.name + ' ' + info.user.phone }}</span>
                </div>
                <div class="line">
                    <span>客户编码</span>
                    <span>{{ '-' }}</span>
                </div>
                <div class="line">
                    <span>客户名称</span>
                    <span>{{ '-' }}</span>
                </div>
                <div class="line">
                    <span>联系人</span>
                    <span>{{ '-' }}</span>
                </div>
                <div class="line">
                    <span>电话</span>
                    <span>{{ '-' }}</span>
                </div>
                <div class="line">
                    <span>摘要</span>
                    <span>{{ '-' }}</span>
                </div>
            </div>
            <div class="print-table">
                <div class="row">
                    <div class="column">名称</div>
                    <div class="column">规格</div>
                    <div class="column">数量</div>
                    <div class="column">金额</div>
                    <div class="column">备 注</div>
                </div>
                <div class="row" v-for="(good, index) in info.order.mockGoodList" :key="index">
                    <div class="column">{{ good.goodName }}</div>
                    <div class="column">{{ good.plugString }}</div>
                    <div class="column">{{ good.countString }}</div>
                    <div class="column">{{ good.price }} 元</div>
                    <div class="column"></div>
                </div>
                <div class="row">
                    <div class="column">大写金额</div>
                    <div class="column">-</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                info: {
                    user: {},
                    shop: {},
                    house: {},
                    order: {},
                },
            }
        },
        mounted() {
            let info = window.localStorage['sjAdminOrderInfo']
            this.info = JSON.parse(info)
            this.$nextTick(() => window.print())
        },
    }
</script>

<style lang="scss" scoped>
    .print {
        background-color: $back;
        #print-record {
            width: 1024px;
            height: 768px;
            padding: 16px;
            background-color: white;
            .title {
                text-align: center;
                font-size: 24px;
                margin: 8px auto;
            }
            .line-box {
                display: flex;
                flex-wrap: wrap;
                .line {
                    display: flex;
                    font-size: 16px;
                    width: 330px;
                    margin-bottom: 8px;
                    span {
                        &:first-child {
                            width: 96px;
                        }
                        &:last-child {
                            width: 238px;
                            margin-right: 12px;
                            border-bottom: 1px solid black;
                        }
                    }
                }
            }
            .print-table {
                margin-top: 16px;
                font-size: 16px;
                border-top: 1px solid black;
                border-left: 1px solid black;
                .row {
                    display: flex;
                    border-bottom: 1px solid black;
                    .column {
                        line-height: 32px;
                        text-align: center;
                        border-right: 1px solid black;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
