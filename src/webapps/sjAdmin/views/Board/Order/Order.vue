<template>
  <div class="over-box">
    <div class="box-title">订单列表</div>
    <div class="box-table">
      <!-- 1.订单 -->
      <div
        v-for="(order, index) in pageModel.orderList"
        :key="index"
        style="margin-bottom: 2rem"
      >
        <!-- 1.1 订单标题 -->
        <div class="row">
          <div class="column flex-x-reverse" style="width: 100%">
            <span
              class="sj-btn tag"
              style="margin-left: 0.5rem"
              @click.stop="toPrint(order)"
              >打印</span
            >
            <span>{{ "ID：" + order._id }}</span>
            <span style="margin-right: auto">{{ order.timeString }}</span>
          </div>
        </div>
        <!-- 1.2 订单商品标题 -->
        <div class="row">
          <div class="column">商品名称</div>
          <div class="column">规格</div>
          <div class="column">数量</div>
          <div class="column">售价</div>
        </div>
        <!-- 1.3 订单商品 -->
        <div
          class="row"
          v-for="(good, _index) in order.mockGoodList"
          :key="_index"
        >
          <div class="column">{{ good.goodName }}</div>
          <div class="column">{{ good.plugString }}</div>
          <div class="column">{{ good.countString }}</div>
          <div class="column">{{ good.price }} 元</div>
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
    toPrint(order) {
      let store = {
        user: this.$store.state.userInfo,
        shop: this.$store.state.shopInfo,
        house: this.$store.state.houseInfo,
        order: order,
      };
      window.localStorage["sjAdminOrderInfo"] = JSON.stringify(store);
      window.open(
        `${window.location.origin}/sjAdmin/#/orderPrint`,
        "",
        "top=100,left=100,width=1024,height=768"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
