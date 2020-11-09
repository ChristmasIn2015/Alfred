<template>
    <div>
        <div class="sj-modal-back" v-show="pageModel.formShow">
            <div class="modal" style="width: 30rem">
                <div class="title">
                    <span>{{ pageModel._id !== -1 ? '修改' : '创建商品' }}</span>
                    <span @click.stop="closeAndRenderGoods">✖</span>
                </div>
                <div class="content">
                    <div class="form-line">
                        <span class="line-title">名称</span>
                        <input type="text" v-model="pageModel.name" placeholder="商品名称" />
                        <div class="tag-box">
                            <div
                                class="sj-btn tip-on tag"
                                v-for="(item, index) in pageModel.goodNameList"
                                :key="index"
                                @click.stop="pageModel.name = item.name"
                            >
                                <span>{{ item.name }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-line">
                        <span class="line-title">规格</span>
                        <div class="sj-link" @click.stop="pageModel.togglePlugRight">点击添加规格 +</div>
                        <div class="tag-box">
                            <div class="sj-btn tag" v-for="(tag, index) in pageModel.plugListChecked" :key="index" :class="{ tip: tag.checked }">
                                <span>{{ tag.value }}{{ tag.name }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-line">
                        <span class="line-title">单位</span>
                        <div>
                            <input type="text" v-model="pageModel.newCountTag.value" placeholder="单位值" style="width: 7rem" />
                            <input type="text" v-model="pageModel.newCountTag.name" placeholder="单位名称" style="width: 7rem" />
                        </div>
                    </div>
                    <div class="form-line">
                        <span class="line-title">入库金额</span>
                        <input type="number" v-model="pageModel.cost" placeholder="入库金额" />
                        <span>元</span>
                    </div>
                    <div class="form-line">
                        <span class="line-title">备注</span>
                        <input type="text" v-model="pageModel.tip" placeholder="备注" />
                    </div>
                </div>
                <div class="btns">
                    <div class="sj-btn" @click.stop="formAction">
                        {{ pageModel._id !== -1 ? '修改' : '创建商品' }}
                    </div>
                    <div class="sj-btn tip-on" @click.stop="closeAndRenderGoods">
                        取消
                    </div>
                </div>
            </div>
        </div>

        <!-- 规格弹窗 -->
        <div class="sj-modal-right right-scroll-off" :class="{ 'right-scroll-on': pageModel.plugModal }">
            <div class="left" @click.stop="pageModel.togglePlugRight"></div>
            <div class="right">
                <div class="card">
                    <div class="title">规格列表</div>
                    <div class="card-line">
                        <input type="text" v-model="pageModel.newPlugTag.value" placeholder="新规格值" />
                        <input type="text" v-model="pageModel.newPlugTag.name" placeholder="新规格单位" />
                        <div class="sj-btn blue" @click.stop="pageModel.postMyTag">
                            + 添加新规格
                        </div>
                        <div class="sj-btn" style="margin-left: auto;" @click.stop="pageModel.togglePlugRight">
                            完成
                        </div>
                    </div>
                    <div class="card-line">
                        <div v-for="(plug, index) in pageModel.plugList" :key="index">
                            <div class="sj-btn tip-on" :class="{ tip: plug.checked }" @click.stop="plug.checked = !plug.checked">
                                <span> {{ plug.value + plug.name }}</span>
                                <span class="close" @click.stop="pageModel.deleteMyTag(index, 0)"></span>
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
        methods: {
            // * 表单响应
            formAction() {
                let params = this.pageModel.getFormData()
                if (typeof params === 'string') return
                this.$emit('formAction', params)
                this.pageModel.formShow = false
            },
            // *
            closeAndRenderGoods() {
                this.$emit('formAction', false)
                this.pageModel.formShow = false
            },
        },
    }
</script>

<style lang="scss" scoped></style>
