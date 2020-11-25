<template>
    <div class="house">
        <div class="flex" style="margin-bottom: 1rem;">
            <Button type="warning" size="small" @click.stop="react.toggleGoodEditModal">新商品入库</Button>
        </div>
        <div>
            <!-- <Table stripe :columns="react.goodTableColumn" :data="react.goodList">
                <template slot-scope="{ row }" slot="plugList">
                    <span v-for="(plug, index) in row.plugList" :key="index">{{ plug.value }}{{ plug.name }} </span>
                </template>
                <template slot-scope="{ row }" slot="countList">
                    <span v-for="(count, index) in row.countList" :key="index">{{ count.value }}{{ count.name }} </span>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button type="error" size="small" ghost @click="react.deleteMyGood(index)">删除</Button>
                    <Button type="success" size="small" @click.stop="react.toggleGoodEditModal(row)">编辑</Button>
                </template>
            </Table> -->
        </div>

        <!-- 商品编辑的表单 -->
        <!-- <Modal v-model="model.goodEditModal" title="商品">
            <Form :model="model.goodModel" label-position="left" :label-width="100">
                <FormItem>
                    <Button
                        type="dashed"
                        size="small"
                        v-for="(good, index) in model.goodNameList"
                        :key="index"
                        @click.stop="model.goodModel.name = good.label"
                        >{{ good.label }}</Button
                    >
                </FormItem>
                <FormItem label="名称">
                    <Input v-model="model.goodModel.name" />
                </FormItem>
                <FormItem label="规格">
                    <Button
                        type="success"
                        size="small"
                        ghost
                        style="margin: 0 0.25rem 0.25rem 0;"
                        v-for="(plug, index) in model.goodModel.plugList"
                        :key="index"
                    >
                        <span>{{ plug.value }}</span>
                        <span>{{ plug.name }}</span>
                    </Button>
                    <Button type="success" size="small" @click.stop="model.togglePlugTagModal"> 编辑规格</Button>
                </FormItem>
                <FormItem v-for="(item, index) in model.goodModel.countList" :key="index" :label="index === 0 ? '单位' : ''">
                    <Input style="width: 6rem;" v-model="item.value" />
                    <Input style="width: 6rem;" v-model="item.name" placeholder="张" />
                    <Button v-if="index === 0" type="success" size="small" @click.stop="model.addGoodCount">增加单位</Button>
                    <Button v-else type="error" size="small" icon="md-close" @click.stop="model.deleteGoodCount(index)"></Button>
                </FormItem>
                <FormItem label="成本">
                    <Input v-model="model.goodModel.cost" placeholder="请输入库成本" />
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="model.goodModel.tip" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="success" ghost @click.stop="model.goodEditModal = false">取消</Button>
                <Button type="success" @click.stop="model.goodEditModalConfirm">{{ model.goodModel._id === -1 ? '新增' : '编辑' }}</Button>
            </div>
        </Modal> -->

        <!-- 编辑规格的表单 -->
        <!-- <Modal v-model="model.plugTagModal" title="规格列表">
            <div class="flex">
                <div style="width: 30%; margin-right: 1rem; padding-right: 1rem; border-right:1px solid #E5E5E5;">
                    <Input v-model="model.plugModel.value" type="number" placeholder="规格值" />
                    <Input v-model="model.plugModel.name" placeholder="规格单位" />
                    <Button type="success" long @click.stop="model.createPlugTag">创建规格</Button>
                </div>
                <div>
                    <span v-show="!model.plugTagList.length">暂无规格</span>
                    <ButtonGroup style="margin: 0 0.25rem 0.25rem 0;" v-for="(plug, index) in model.plugTagList" :key="index">
                        <Button type="success" size="small" :ghost="!plug.checked" @click.stop="plug.checked = !plug.checked">
                            <span>{{ plug.value }}</span>
                            <span>{{ plug.name }}</span>
                        </Button>
                        <Button
                            v-if="model.plugTagEditButton"
                            type="error"
                            size="small"
                            ghost
                            icon="md-close"
                            @click.stop="model.deleteMyTag(plug._id, 0)"
                        ></Button>
                    </ButtonGroup>
                </div>
            </div>
            <div slot="footer">
                <Button type="error" ghost @click.stop="model.plugTagEditButton = !model.plugTagEditButton"
                    >{{ model.plugTagEditButton ? '关闭' : '开启' }}编辑</Button
                >
                <Button type="success" ghost @click.stop="model.plugTagModal = false">取消</Button>
                <Button type="success" @click.stop="model.plugModalConfirm">完成</Button>
            </div>
        </Modal> -->
    </div>
</template>

<script>
    import React from './React.js'
    export default {
        data() {
            return {
                model: new React(),
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
        methods: {},
    }
</script>

<style lang="scss" scoped></style>
