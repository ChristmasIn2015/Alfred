<template>
  <div class="sj-modal-back" v-if="pageModel.formShow">
    <div class="modal" style="width: 80rem">
      <div class="title">
        <span>订单</span>
        <span @click.stop="pageModel.toggleForm">✖</span>
      </div>
      <div class="content">
        <div class="box-table">
          <!-- 1 -->
          <div class="row">
            <div class="column">名称</div>
            <div class="column" style="width: 30rem">规格</div>
            <div class="column">库存</div>
            <div class="column">入库成本</div>
            <div class="column">最终售价</div>
            <div class="column">操作</div>
          </div>
          <!-- 2 -->
          <div
            class="no-scroll-bar"
            style="max-height: 40rem; overflow-y: auto"
          >
            <div
              class="row"
              v-for="(good, index) in pageModel.orderSource"
              :key="index"
            >
              <div class="column">{{ good.name }}</div>
              <div class="column" style="width: 30rem">
                <div
                  class="column-input"
                  v-for="(tag, countIndex) in good.plugList"
                  :key="countIndex"
                >
                  <input type="number" v-model="tag.value" />
                  <div class="sj-btn tag">{{ tag.name }}</div>
                </div>
              </div>
              <div class="column">
                <div
                  class="column-input"
                  v-for="(tag, countIndex) in good.countList"
                  :key="countIndex"
                >
                  <input type="number" v-model="tag.value" />
                  <div class="sj-btn tag">{{ tag.name }}</div>
                </div>
              </div>
              <div class="column">
                <span>{{ good.cost }}元</span>
              </div>
              <div class="column">
                <input type="number" v-model="good.price" style="width: 70%" />
                <span>元</span>
              </div>
              <div class="column">
                <div
                  class="sj-btn red tag"
                  @click.stop="pageModel.orderSource.splice(index, 1)"
                >
                  删除
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="sj-btn" @click.stop="formAction">创建</div>
        <div class="sj-btn tip-on" @click.stop="pageModel.toggleForm">取消</div>
        <div class="sj-btn tip-on" @click.stop="pageModel.toggleForm">
          添加临时商品
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Model from "./model/Model.js";
export default {
  data() {
    return {
      pageModel: new Model(),
    };
  },
  methods: {
    // * 表单响应
    formAction() {
      let params = this.pageModel.getFormData();
      if (typeof params === "string") return;
      this.$emit("formAction", params);
      this.pageModel.formShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
