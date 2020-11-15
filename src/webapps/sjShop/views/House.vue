<template>
    <div class="house">
        <div class="flex">
            <Button type="primary" @click.stop="model.toggleGoodEditModal">新商品入库</Button>
        </div>
        <div>
            <Table stripe :columns="model.goodTableColumn" :data="model.goodList"> </Table>
        </div>

        <!-- 商品编辑的表单 -->
        <Modal v-model="model.goodEditModal" title="商品">
            <Form :model="model.goodModel" label-position="left" :label-width="100">
                <FormItem label="名称">
                    <Input v-model="model.goodModel.name" placeholder="请输入商品名称" />
                </FormItem>
                <FormItem label="规格">
                    <Button style="margin: 0 0.25rem 0.25rem 0;" size="small" v-for="(plug, index) in model.goodModel.plugList" :key="index" type="dashed">
                        <span>{{ plug.value }}</span>
                        <span>{{ plug.name }}</span>
                    </Button>
                    <Button type="primary" size="small" @click.stop="model.togglePlugTagModal">+</Button>
                </FormItem>
                <FormItem v-for="(item, index) in model.goodModel.countList" :key="index" :label="index === 0 ? '添加单位' : ''">
                    <Input style="width: 6rem;" v-model="item.value" placeholder="库存" />
                    <Input style="width: 3rem;" v-model="item.name" placeholder="单位" />
                    <Button v-if="index === 0" type="primary" size="small" @click.stop="model.addGoodCount">+</Button>
                    <Button v-else type="error" size="small" @click.stop="model.deleteGoodCount(index)">✖</Button>
                </FormItem>
                <FormItem label="成本">
                    <Input v-model="model.goodModel.price" placeholder="请输入库成本" />
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="model.goodModel.tip" placeholder="商品备注" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="model.goodEditModal = false">取消</Button>
                <Button type="primary" @click.stop="model.goodEditModalConfirm">添加</Button>
            </div>
        </Modal>

        <!-- 编辑规格的表单 -->
        <Modal v-model="model.plugTagModal" title="规格列表">
            <div class="flex">
                <div style="width: 30%; margin-right: 1rem; padding-right: 1rem; border-right:1px solid #333333;">
                    <Input v-model="model.plugModel.value" placeholder="请输入规格值" />
                    <Input v-model="model.plugModel.name" placeholder="请输入规格名称" />
                    <Button type="primary" long @click.stop="model.createPlugTag">创建规格</Button>
                </div>
                <div>
                    <span v-show="!model.plugTagList.length">暂无规格</span>
                    <Button
                        style="margin: 0 0.25rem 0.25rem 0;"
                        size="small"
                        v-for="(plug, index) in model.plugTagList"
                        :key="index"
                        :type="plug.checked ? 'primary' : 'dashed'"
                        @click.stop="plug.checked = !plug.checked"
                    >
                        <span>{{ plug.value }}</span>
                        <span>{{ plug.name }}</span>
                    </Button>
                </div>
            </div>
            <div slot="footer">
                <Button @click.stop="model.plugTagModal = false">取消</Button>
                <Button type="primary" @click.stop="model.plugModalConfirm">完成</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Model from '../model/House/Model.js'
    export default {
        data() {
            return {
                model: new Model(),
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

<style lang="scss">
    @import '@/public/css/default.scss';
</style>
