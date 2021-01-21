<template>
    <div class="order flex-y" style="height: 100%; overflow: hidden;">
        <div class="flex-middle-y ivu-btn-line">
            <Button size="small" :type="react.customerPicked._id ? 'default' : 'info'" @click.stop="react.toggleCustomerModal">{{
                react.customerPicked._id ? `${react.customerPicked.company} / ${react.customerPicked.contact}` : '点击选择客户'
            }}</Button>
            <Button
                v-show="react.customerPicked._id && !react.orderListModal"
                type="info"
                size="small"
                @click.stop="react.toggleGoodListModal(react.goodListPicked)"
            >
                添加库存
            </Button>
            <Button v-if="react.goodListPicked.length && !react.orderListModal" type="info" size="small" @click.stop="react.postMyOrder">创建订单</Button>
            <div style="margin-left: auto;">
                <Button v-show="react.orderListModal" type="info" size="small" @click.stop="react.toggleOrderListModal">返回开单</Button>
                <Button v-show="react.orderListModal" size="small" @click.stop="react.orderEdit = !react.orderEdit">发货管理</Button>
                <Button v-show="!react.orderListModal" type="info" size="small" @click.stop="react.toggleOrderListModal">打开订单列表 </Button>
            </div>
        </div>
        <!-- 已选库存 -->
        <div v-show="!react.orderListModal" style="height: 100%; overflow-y: auto;">
            <Table stripe :columns="react.orderGoodTableColumn" :data="react.goodListPicked">
                <template slot-scope="{ row }" slot="plugList">
                    <span v-for="(plug, index) in row.plugList" :key="index">{{ plug.value }}{{ plug.name }} </span>
                </template>
                <template slot-scope="{ index }" slot="countList">
                    <div v-for="(count, i) in react.goodListPicked[index].countList" :key="i">
                        <Input class="no-radius" style="width: 7rem;" :value="count.value" disabled />
                        <span>{{ count.name }}</span>
                    </div>
                </template>
                <template slot-scope="{ index }" slot="outCountList">
                    <div v-for="(count, i) in react.goodListPicked[index].outCountList" :key="i">
                        <Input class="no-radius" style="width: 7rem;" v-model="count.value" />
                        <span>{{ count.name }}</span>
                    </div>
                </template>
                <template slot-scope="{ index }" slot="orderGoodPrice">
                    <Input class="no-radius" style="width: 7rem;" v-model="react.goodListPicked[index].orderGoodPrice" />
                    <span>元</span>
                </template>
                <template slot-scope="{ index }" slot="action">
                    <Button type="default" size="small" @click.stop="react.deleteOrderGoodPicked(index)">取消</Button>
                </template>
            </Table>
        </div>

        <!-- 订单列表 -->
        <div v-show="react.orderListModal" style="height: 100%; overflow-y: auto;">
            <Table stripe :columns="react.orderListTableColumn" :data="react.orderList">
                <template slot-scope="{ row }" slot="goodList">
                    <div class="flex" v-for="(good, index) in row.goodListFake" :key="index">
                        <span style="margin-right: 0.5rem">{{ good.name }}</span>
                        <span style="margin-right: 0.5rem">
                            <span style="margin-right: 0.5rem" v-for="(plug, _index) in good.plugList" :key="_index">{{ plug.value + plug.name }}</span>
                        </span>
                        <span style="margin-right: 0.5rem">
                            <div v-for="(counter, _index) in good.outCountList" :key="_index">{{ counter.value + counter.name }}</div>
                        </span>
                        <span style="margin-right: 0.5rem">售出金额：{{ good.price }}元</span>
                    </div>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button type="info" size="small" style="margin-right: 0.5rem;" @click.stop="">打印</Button>
                    <Button v-show="react.orderEdit" type="info" size="small" style="margin-right: 0.5rem;" @click.stop="react.toggleOrderEditModal(row)">
                        发货编辑
                    </Button>
                    <Button v-show="row.priceStatus === 20" size="small" @click.stop="react.changeMyOrderStatus(row._id, null, 21)">
                        转为已回款
                    </Button>
                    <Button v-show="row.priceStatus === 21" type="default" size="small" @click.stop="react.changeMyOrderStatus(row._id, null, 20)">
                        转为未回款
                    </Button>
                </template>
            </Table>
        </div>

        <!-- 客户列表的表单 -->
        <Modal v-model="react.customerModal" title="客户列表">
            <Form label-position="top">
                <FormItem label="新增客户">
                    <Input class="no-radius" style="width: 8rem;" v-model="react.customerModel.company" placeholder="客户公司名称" />
                    <Input class="no-radius" style="width: 8rem;" v-model="react.customerModel.address" placeholder="客户公司地址" />
                    <Input class="no-radius" style="width: 8rem;" v-model="react.customerModel.contact" placeholder="联系人" />
                    <Button type="info" size="small" style="margin-left: 0.5rem;" @click.stop="react.addCustomer">新增客户</Button>
                </FormItem>
                <Table :columns="react.customerTableColumn" :data="react.customerList">
                    <template slot-scope="{ row }" slot="action">
                        <span v-if="row.picked">已选择</span>
                        <Button v-else type="info" size="small" @click="react.pickCustomer(row)">选择</Button>
                    </template>
                </Table>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.customerModal = false">关闭</Button>
            </div>
        </Modal>

        <!-- 库存列表的表单 -->
        <Modal v-model="react.goodListModal" title="库存列表" width="1000">
            <Form label-position="top">
                <div class="flex-middle-y" style="margin-bottom: 1rem;">
                    <Input style="width: 20rem;" v-model="react.filterKey" placeholder="请输入规格" @input="filterGoodList" />
                    <Button size="small" type="success" style="margin-left: 0.5rem;" @click.stop="react.filterClear">清空</Button>
                    <Button type="success" size="small" style="margin-left: 0.5rem;" @click.stop="react.toggleGoodModal">新商品入库</Button>
                </div>
                <div class="flex-wrap" style="margin-bottom: 1rem;">
                    <Button
                        size="small"
                        style="margin-right: 0.5rem;"
                        v-for="(good, index) in react.goodNameList"
                        :key="index"
                        :type="good.checked ? 'success' : 'default'"
                        @click.stop="react.pickGoodName(index)"
                        >{{ good.name }}
                    </Button>
                </div>
                <Table :columns="react.goodTableColumn" :data="react.goodList">
                    <template slot-scope="{ row }" slot="plugList">
                        <span v-for="(plug, index) in row.plugList" :key="index">{{ plug.value }}{{ plug.name }} </span>
                    </template>
                    <template slot-scope="{ row }" slot="countList">
                        <span v-for="(count, index) in row.countList" :key="index">{{ count.value }}{{ count.name }} </span>
                    </template>
                    <template slot-scope="{ row }" slot="action">
                        <span v-if="row.picked">已选择</span>
                        <!-- <Button v-if="row.picked" type="default" size="small" @click.stop="react.deleteGoodPicked(row)">取消</Button> -->
                        <Button v-else type="info" size="small" style="margin-right: 0.5rem;" @click="react.pickGood(row, react.goodListPicked)">选择</Button>
                    </template>
                </Table>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.goodListModal = false">关闭</Button>
            </div>
        </Modal>

        <!-- 商品编辑的表单 -->
        <Modal v-model="react.goodModal" title="商品" width="350">
            <Form label-position="top">
                <FormItem label="名称">
                    <Input v-model="react.goodModel.name" placeholder="请输入商品名称" />
                </FormItem>
                <FormItem>
                    <Button
                        size="small"
                        style="margin-right: 0.5rem;"
                        v-for="(good, index) in react.goodNameList"
                        :key="index"
                        @click.stop="react.goodModel.name = good.name"
                        >{{ good.name }}
                    </Button>
                </FormItem>
                <FormItem label="规格">
                    <Button type="success" size="small" style="margin-right: 0.5rem;" v-for="(plug, index) in react.goodModel.plugList" :key="index">
                        <span>{{ plug.value }}</span>
                        <span>{{ plug.name }}</span>
                    </Button>
                    <Button size="small" @click.stop="react.toggleTagModal">选择规格</Button>
                </FormItem>
                <FormItem v-for="(item, index) in react.goodModel.countList" :key="index" :label="index === 0 ? '单位' : ''">
                    <Input class="no-radius" style="width: 7rem;" v-model="item.value" />
                    <Input class="no-radius" style="width: 7rem;" v-model="item.name" placeholder="张" />
                    <Button v-if="index === 0" size="small" style="margin-left:0.5rem;" @click.stop="react.addGoodCount">增加单位</Button>
                    <Button v-else size="small" style="margin-left:0.5rem;" @click.stop="react.deleteGoodCount(index)">删除</Button>
                </FormItem>
                <FormItem label="成本">
                    <Input v-model="react.goodModel.cost" placeholder="请输入商品成本" />
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="react.goodModel.tip" placeholder="请输入库备注" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.goodModal = false">取消</Button>
                <Button type="success" @click.stop="react.goodModalOk">{{ react.goodModel._id === -1 ? '新增' : '编辑' }}</Button>
            </div>
        </Modal>

        <!-- 编辑规格的表单 -->
        <Modal v-model="react.tagModal" title="规格列表">
            <Form label-position="top">
                <FormItem label="创建规格">
                    <Input class="no-radius" style="width: 7rem;" v-model="react.tagModel.value" placeholder="值" />
                    <Input class="no-radius" style="width: 7rem;" v-model="react.tagModel.name" placeholder="单位" />
                    <Button type="success" size="small" style="margin-left: 0.5rem;" @click.stop="react.createMyTag">创建规格</Button>
                    <Button
                        :type="react.tagEdit ? 'error' : 'default'"
                        size="small"
                        style="margin-left: 0.5rem;"
                        @click.stop="react.tagEdit = !react.tagEdit"
                        >{{ react.tagEdit ? '关闭' : '编辑' }}</Button
                    >
                </FormItem>
                <FormItem label="规格列表">
                    <ButtonGroup style="margin: 0 0.25rem 0.25rem 0;" v-for="(plug, index) in react.tagList" :key="index">
                        <Button :type="plug.checked ? 'success' : 'default'" size="small" @click.stop="plug.checked = !plug.checked">
                            <span>{{ plug.value }}</span>
                            <span>{{ plug.name }}</span>
                        </Button>
                        <Button v-if="react.tagEdit" type="error" size="small" @click.stop="react.deleteMyTag(plug._id, 0)">删除</Button>
                    </ButtonGroup>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.tagModal = false">取消</Button>
                <Button type="success" @click.stop="react.tagModalOk">完成</Button>
            </div>
        </Modal>

        <!-- 发货列表的表单 -->
        <Modal v-model="react.orderEditModal" title="发货列表" width="1000">
            <Form label-position="top">
                <FormItem label="订单发货">
                    <div class="ivu-btn-line" v-if="react.orderEditTarget.customer">
                        <Button size="small">
                            {{ react.orderEditTarget.customer.company }}
                            {{ react.orderEditTarget.customer.contact }}
                            {{ react.orderEditTarget.customer.address }}
                        </Button>
                    </div>
                    <Table :columns="react.orderEditTableColumn" :data="react.orderEditTarget.goodListFake">
                        <template slot-scope="{ row }" slot="plugList">
                            <span v-for="(plug, index) in row.plugList" :key="index">{{ plug.value }}{{ plug.name }} </span>
                            <span v-show="!row.plugList.length">该商品无规格</span>
                        </template>
                        <template slot-scope="{ row }" slot="outCountList">
                            <span v-for="(count, index) in row.outCountList" :key="index">{{ count.value }}{{ count.name }} </span>
                        </template>
                        <template slot-scope="{ row }" slot="price">
                            {{ row.price }}
                        </template>
                        <template slot-scope="{}" slot="action"> </template>
                    </Table>
                </FormItem>
                <FormItem label="实际发货">
                    <div class="ivu-btn-line">
                        <Button type="info" size="small" @click.stop="react.toggleGoodListModal(react.orderEditTarget.goodList)">添加</Button>
                    </div>
                    <Table :columns="react.orderEditTableColumn" :data="react.orderEditTarget.goodList">
                        <template slot-scope="{ row }" slot="plugList">
                            <span v-for="(plug, index) in row.plugList" :key="index">{{ plug.value }}{{ plug.name }} </span>
                            <span v-show="!row.plugList.length">该商品无规格</span>
                        </template>
                        <template slot-scope="{ index }" slot="outCountList">
                            <div v-for="(count, i) in react.orderEditTarget.goodList[index].outCountList" :key="i">
                                <Input class="no-radius" style="width: 7rem;" v-model="count.value" />
                                <span>{{ count.name }}</span>
                            </div>
                        </template>
                        <template slot-scope="{ index }" slot="price">
                            <Input class="no-radius" style="width: 7rem;" v-model="react.orderEditTarget.goodList[index].price" />
                        </template>
                        <template slot-scope="{ index }" slot="action">
                            <Button size="small" @click.stop="react.deleteOrderGood(index)">删除</Button>
                        </template>
                    </Table>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.orderEditModal = false">关闭</Button>
                <Button type="info" @click.stop="react.clearMyOrderGood">仅仅撤回</Button>
                <Button type="info" @click.stop="react.updateMyOrder">重新发货</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import React from './React.js'
    export default {
        data() {
            return {
                react: new React(),
            }
        },
        mounted() {},
        computed: {
            userInfo() {
                return this.$store.state.userInfo
            },
            shopInfo() {
                return this.$store.state.shopInfo
            },
            houseInfo() {
                return this.$store.state.houseInfo
            },
        },
        methods: {
            filterGoodList() {
                this.react.filterGoodList()
            },
        },
    }
</script>

<style lang="scss" scoped></style>
