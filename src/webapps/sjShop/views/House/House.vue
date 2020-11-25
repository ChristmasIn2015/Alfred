<template>
    <div class="house">
        <div class="flex" style="margin-bottom: 1rem;">
            <Button type="success" size="small" @click.stop="react.toggleGoodModal">新商品入库</Button>
        </div>
        <div>
            <Table stripe :columns="react.goodTableColumn" :data="react.goodList">
                <template slot-scope="{ row }" slot="plugList">
                    <span v-for="(plug, index) in row.plugList" :key="index">{{ plug.value }}{{ plug.name }} </span>
                </template>
                <template slot-scope="{ row }" slot="countList">
                    <span v-for="(count, index) in row.countList" :key="index">{{ count.value }}{{ count.name }} </span>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button type="default" size="small" style="margin-right: 0.25rem;" @click="react.deleteMyGood(index)">删除</Button>
                    <Button type="success" size="small" @click.stop="react.toggleGoodModal(row)">编辑</Button>
                </template>
            </Table>
        </div>

        <!-- 商品编辑的表单 -->
        <Modal v-model="react.goodModal" title="商品" width="350">
            <Form label-position="top">
                <FormItem>
                    <Button
                        type="dashed"
                        size="small"
                        v-for="(good, index) in react.goodNameList"
                        :key="index"
                        @click.stop="react.goodModel.name = good.label"
                        >{{ good.label }}</Button
                    >
                </FormItem>
                <FormItem label="名称">
                    <Input v-model="react.goodModel.name" placeholder="请输入商品名称" />
                </FormItem>
                <FormItem label="规格">
                    <Button
                        type="success"
                        size="small"
                        ghost
                        style="margin: 0 0.25rem 0.25rem 0;"
                        v-for="(plug, index) in react.goodModel.plugList"
                        :key="index"
                    >
                        <span>{{ plug.value }}</span>
                        <span>{{ plug.name }}</span>
                    </Button>
                    <Button type="info" size="small" @click.stop="react.togglePlugTagModal">增加规格</Button>
                </FormItem>
                <FormItem v-for="(item, index) in react.goodModel.countList" :key="index" :label="index === 0 ? '单位' : ''">
                    <Input class="no-radius" style="width: 7rem;" v-model="item.value" />
                    <Input class="no-radius" style="width: 7rem;" v-model="item.name" placeholder="张" />
                    <Button class="right-middle" v-if="index === 0" size="small" @click.stop="react.addGoodCount">增加单位</Button>
                    <Button class="right-middle" v-else type="error" size="small" icon="md-close" @click.stop="react.deleteGoodCount(index)"></Button>
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
                <Button type="success" @click.stop="react.goodEditModalConfirm">{{ react.goodModel._id === -1 ? '新增' : '编辑' }}</Button>
            </div>
        </Modal>

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
        methods: {},
    }
</script>

<style lang="scss" scoped></style>
