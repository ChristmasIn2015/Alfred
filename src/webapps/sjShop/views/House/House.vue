<template>
    <div class="house flex-y" style="height: 100%; overflow: hidden;">
        <div class="flex-middle-y flex-side" style="margin-bottom: 1rem; width: 32rem;">
            <Input style="width: 20rem;" v-model="react.filterKey" placeholder="请输入规格" @input="filterGoodList" />
            <Button size="small" type="success" @click.stop="react.filterClear">清空</Button>
            <Button type="success" size="small" @click.stop="react.toggleGoodModal">新商品入库</Button>
            <Button size="small" :type="react.goodEdit ? 'error' : 'default'" @click.stop="react.goodEdit = !react.goodEdit">{{
                react.goodEdit ? '关闭' : '编辑'
            }}</Button>
        </div>
        <div class="flex" style="margin-bottom: 1rem;">
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
        <div style="height: 100%; overflow: auto;">
            <Table stripe :columns="react.goodTableColumn" :data="react.goodList">
                <template slot-scope="{ row }" slot="plugList">
                    <span v-for="(plug, index) in row.plugList" :key="index">{{ plug.value }}{{ plug.name }} </span>
                </template>
                <template slot-scope="{ row }" slot="countList">
                    <span v-for="(count, index) in row.countList" :key="index">{{ count.value }}{{ count.name }} </span>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button v-if="react.goodEdit" type="error" size="small" style="margin-right: 0.25rem;" @click="react.deleteMyGood(row)">删除</Button>
                    <Button type="success" size="small" @click.stop="react.toggleGoodModal(row)">编辑</Button>
                </template>
            </Table>
        </div>

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
