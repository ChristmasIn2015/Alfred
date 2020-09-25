<template>
  <div class="over-box">
    <div class="box-title">库存管理</div>
    <div class="box-btn-line flex-x-reverse">
      <div class="sj-btn" v-show="listChecked" @click.stop="showBoardOfOrderForm">售出商品</div>
      <div class="sj-btn disable" v-show="!listChecked">售出商品</div>
      <div class="sj-btn" @click.stop="showBoardOfGoodForm">添加商品</div>
    </div>

    <!-- 1.库存列表 -->
    <div class="box-table">
      <div class="row">
        <div class="column"></div>
        <div class="column">商品名称</div>
        <div class="column" style="width: 30rem;">规格</div>
        <div class="column">库存</div>
        <div class="column">入库成本</div>
        <div class="column">今日价格</div>
        <div class="column">入库时间</div>
        <div class="column">备注</div>
        <div class="column">操作</div>
      </div>

      <!-- 展示行 -->
      <div style="max-height: 40rem; overflow-y: auto;">
        <div
          class="row flex"
          v-for="(good, goodIndex) in pageModel.goodList"
          :key="goodIndex"
          :class="{'row-on': good.checked}"
          @click.stop="good.checked = !good.checked"
        >
          <div class="column">
            <span
              class="fa"
              :class="{'fa-square-o': !good.checked, 'fa-check-square': good.checked}"
            ></span>
          </div>
          <div class="column">{{good.name}}</div>
          <div class="column" style="width: 30rem;">
            <div
              v-for="(tag, plugIndex) in good.plugList"
              :key="plugIndex"
              style="margin-right: 0.5rem;"
            >*{{ tag.value + tag.name }}</div>
          </div>
          <div class="column">
            <div
              v-for="(tag, countIndex) in good.countList"
              :key="countIndex"
              style="margin-right: 0.5rem;"
            >{{tag.value + tag.name }}</div>
          </div>
          <div class="column">
            <div>{{ good.cost }}元</div>
          </div>
          <div class="column">1200</div>
          <div class="column">{{good.timeString}}</div>
          <div class="column">{{good.tip}}</div>
          <div class="column">
            <div class="sj-btn red tag" @click.stop="pageModel.deleteMyGood(good._id)">删除</div>
            <div class="sj-btn green tag" @click.stop="showBoardOfGoodForm($event,good)">编辑</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品弹窗 -->
    <GoodForm ref="GoodForm" @goodFormAction="goodFormAction" />

    <!-- 订单弹窗 -->
    <OrderForm ref="OrderForm" />
  </div>
</template>

<script>
import GoodForm from "@/webapps/sjAdmin/form/Good/GoodForm.vue";
import OrderForm from "@/webapps/sjAdmin/form/Order/OrderForm.vue";
import Model from "./Model.js";
export default {
  data() {
    return {
      pageModel: new Model(),
    };
  },
  components: {
    OrderForm,
    GoodForm,
  },
  computed: {
    userInfo() {
      let info = this.$store.getters.getUserInfo;
      return info;
    },
    shopInfo() {
      let info = this.$store.getters.getShopInfo;
      return info;
    },
    houseInfo() {
      let info = this.$store.getters.getHouseInfo;
      return info;
    },
    listChecked() {
      let checked = false;
      for (let i = 0; i < this.pageModel.goodList.length; i++) {
        if (this.pageModel.goodList[i].checked) {
          checked = true;
          break;
        }
      }
      return checked;
    },
  },
  methods: {
    // ***************************** 商品 *****************************
    showBoardOfGoodForm($event, good) {
      this.$refs.GoodForm.pageModel.toggleForm($event, good);
    },
    // * 组件回调：商品表单
    goodFormAction(params) {
      this.pageModel.goodEditModel = Object.assign({}, params);
      let model = this.pageModel.goodEditModel;
      model._id ? this.pageModel.editMyGood() : this.pageModel.addMyGood();
    },
    // ***************************** 订单 *****************************
    showBoardOfOrderForm() {
      this.$refs.OrderForm.pageModel.toggleOrderForm(this.pageModel.goodList);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
