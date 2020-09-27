<template>
  <div class="over-box">
    <div class="box-title">订单列表</div>

    <div class="box-table">
      <!-- 输入行 -->
      <div class="row">
        <div class="column">新增商品</div>
        <div class="column">
          <input v-model="pageModel.goodEditModel.name" placeholder="商品名称" />
        </div>
        <div class="column" style="width: 100%;">
          <div
            v-for="(tag, index) in pageModel.goodEditModel.plugList"
            :key="index"
            style="margin-right: 0.5rem;"
          >*{{ tag.value + tag.name }}</div>
          <div
            class="sj-btn blue"
            @click.stop="showBoardInRight(-1, pageModel.goodEditModel.plugList, 'plug')"
          >添加规格</div>
        </div>
        <div class="column" style="width: 100%;">
          <div
            class="column-input"
            v-for="(tag, index) in pageModel.goodEditModel.countList"
            :key="index"
          >
            <input type="number" :value="tag.value" />
            <div class="sj-btn">{{ tag.name }}</div>
          </div>
          <div
            class="sj-btn blue"
            @click.stop="showBoardInRight(-1, pageModel.goodEditModel.countList, 'count')"
          >添加单位</div>
        </div>
        <div class="column">
          <span style="margin-right: 0.5rem;">成本</span>
          <input type="number" v-model="pageModel.goodEditModel.cost" style="width: 50%;" />
        </div>
        <div class="column">
          <input v-model="pageModel.goodEditModel.tip" placeholder="备注" />
        </div>
        <div class="column"></div>
        <div class="column">
          <div class="sj-btn blue" @click.stop="pageModel.addMyGood">入库</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Model from "./Model.js";
export default {
  data() {
    return {
      pageModel: new Model(),
    };
  },
  computed: {
    userInfo() {
      let info = this.$store.getters.getUserInfo;
      return info;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
