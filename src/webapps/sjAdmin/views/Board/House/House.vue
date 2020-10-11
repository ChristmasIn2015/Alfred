<template>
    <div class="over-box">
        <div class="box-title">库存管理</div>
        <!-- 筛选 -->
        <div class="box-btn-line">
            <div
                class="sj-btn tip-on"
                v-for="(item, index) in pageModel.goodNameList"
                :key="index"
                :class="{ tip: item.checked }"
                @click.stop="pageModel.pickGoodName(index)"
            >
                {{ item.name }}
            </div>
        </div>

        <!-- 功能 -->
        <div class="box-btn-line flex-x-reverse">
            <div class="sj-btn green" @click.stop="goodFormShow">添加商品</div>
            <input
                type="text"
                v-model="pageModel.goodPlugSearchKey"
                @input.self="pageModel.filterGoodList"
                style="margin-right: auto;"
                placeholder="请输入规格进行搜索"
            />
        </div>

        <!-- 1.库存列表 -->
        <div class="box-table">
            <div class="row">
                <div class="column">商品名称</div>
                <div class="column" style="width: 30rem">规格</div>
                <div class="column">库存</div>
                <div class="column">入库成本</div>
                <div class="column">入库时间</div>
                <div class="column">备注</div>
                <div class="column">操作</div>
            </div>

            <!-- 展示行 -->
            <div style="max-height: 35rem; overflow-y: auto">
                <div class="row flex" v-for="(good, goodIndex) in pageModel.goodList" :key="goodIndex">
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
                    <div class="column">{{ good.timeString }}</div>
                    <div class="column">{{ good.tip }}</div>
                    <div class="column">
                        <div class="sj-btn red tag" @click.stop="pageModel.deleteMyGood(good._id)">
                            删除
                        </div>
                        <div class="sj-btn green tag" @click.stop="goodFormShow($event, good)">
                            编辑
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 商品弹窗 -->
        <GoodForm ref="GoodForm" @formAction="goodFormAction" />
    </div>
</template>

<script>
    import GoodForm from './components/GoodForm/GoodForm.vue'
    import Model from './model/Model.js'
    export default {
        data() {
            return {
                pageModel: new Model(),
            }
        },
        components: {
            GoodForm,
        },
        methods: {
            // ***************************** 商品组件控制 *****************************
            goodFormShow($event, good) {
                this.$refs.GoodForm.pageModel.toggleForm($event, good, this.pageModel.goodNameList)
            },
            goodFormAction(params) {
                if (!params) {
                    this.pageModel.getMyGoodList()
                    return
                }
                this.pageModel.goodEditModel = Object.assign({}, params)
                let model = this.pageModel.goodEditModel
                model._id !== -1 ? this.pageModel.editMyGood() : this.pageModel.addMyGood()
            },
        },
    }
</script>

<style lang="scss" scoped></style>
