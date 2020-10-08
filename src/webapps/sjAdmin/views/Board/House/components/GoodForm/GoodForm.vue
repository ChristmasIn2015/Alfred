<template>
  <div class="sj-modal-back" v-show="pageModel.formShow">
    <div class="modal" style="width: 30rem">
      <div class="title">
        <span>商品</span>
        <span @click.stop="pageModel.toggleForm">✖</span>
      </div>
      <div class="content">
        <div class="form-line">
          <span class="line-title">名称</span>
          <input type="text" v-model="pageModel.name" placeholder="商品名称" />
        </div>
        <div class="form-line">
          <span class="line-title">规格</span>
          <div>
            <input
              type="text"
              v-model="pageModel.newPlugTag.value"
              placeholder="规格值"
              style="width: 5rem"
            />
            <input
              type="text"
              v-model="pageModel.newPlugTag.name"
              placeholder="规格单位"
              style="width: 5rem"
            />
          </div>
          <div class="sj-btn tag" @click.stop="pageModel.postMyTag">
            新增规格
          </div>
          <div @click.stop="pageModel.plugTagEdit = !pageModel.plugTagEdit">
            <span
              class="fa"
              :class="{
                'fa-square-o': !pageModel.plugTagEdit,
                'fa-check-square': pageModel.plugTagEdit,
              }"
            ></span>
          </div>
          <div class="tag-box">
            <div
              class="sj-btn tip-on tag"
              v-for="(tag, index) in pageModel.plugList"
              :key="index"
              :class="{ tip: tag.checked }"
              @click.stop="tag.checked = !tag.checked"
            >
              <span>{{ tag.value }}{{ tag.name }}</span>
              <span
                v-show="pageModel.plugTagEdit"
                class="close"
                @click.stop="pageModel.deleteMyTag(index, 0)"
              ></span>
            </div>
          </div>
        </div>
        <div class="form-line">
          <span class="line-title">单位</span>
          <div>
            <input
              type="text"
              v-model="pageModel.newCountTag.value"
              placeholder="单位值"
              style="width: 5rem"
            />
            <input
              type="text"
              v-model="pageModel.newCountTag.name"
              placeholder="单位名称"
              style="width: 5rem"
            />
          </div>
          <!-- <div class="sj-btn tag" @click.stop="pageModel.postMyCountTag">
            新增单位
          </div> -->
          <!-- <div @click.stop="pageModel.countTagEdit = !pageModel.countTagEdit">
            <span
              class="fa"
              :class="{
                'fa-square-o': !pageModel.countTagEdit,
                'fa-check-square': pageModel.countTagEdit,
              }"
            ></span>
          </div> -->
          <div class="tag-box">
            <div
              class="sj-btn tip-on tag"
              v-for="(tag, index) in pageModel.countList"
              :key="index"
              :class="{ tip: tag.checked }"
              @click.stop="pageModel.toggleCountListCheck(tag)"
            >
              <span>{{ tag.value }}{{ tag.name }}</span>
              <span
                v-show="pageModel.countTagEdit"
                class="close"
                @click.stop="pageModel.deleteMyTag(index, 1)"
              ></span>
            </div>
          </div>
        </div>
        <div class="form-line">
          <span class="line-title">入库金额</span>
          <input
            type="number"
            v-model="pageModel.cost"
            placeholder="入库金额"
          />
          <span>元</span>
        </div>
        <div class="form-line">
          <span class="line-title">备注</span>
          <input type="text" v-model="pageModel.tip" placeholder="备注" />
        </div>
      </div>
      <div class="btns">
        <div class="sj-btn" @click.stop="formAction">
          {{ pageModel._id !== -1 ? "编辑" : "创建" }}
        </div>
        <div class="sj-btn tip-on" @click.stop="pageModel.toggleForm">取消</div>
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
