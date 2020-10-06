<template>
  <div class="over-box">
    <div class="box-title">库存管理</div>
    <!-- 筛选 -->
    <div class="box-btn-line">
      <div
        v-for="(name, index) in pageModel.goodNameList"
        :key="index"
        class="sj-btn tip-on"
      >
        {{ name }}
      </div>
    </div>
    <div class="box-btn-line">
      <input type="text" placeholder="规格搜索" />
      <div
        v-for="(name, index) in pageModel.goodPlugList"
        :key="index"
        class="sj-btn tip-on"
      >
        {{ name }}
      </div>
    </div>

    <!-- 功能 -->
    <div class="box-btn-line flex-x-reverse">
      <div class="sj-btn" v-show="listChecked" @click.stop="orderFormShow">
        售出商品
      </div>
      <div class="sj-btn disable" v-show="!listChecked">售出商品</div>
      <div class="sj-btn" @click.stop="goodFormShow">添加商品</div>
    </div>

    <!-- 1.库存列表 -->
    <div class="box-table">
      <div class="row">
        <div class="column" style="width: 2rem"></div>
        <div class="column">商品名称</div>
        <div class="column" style="width: 30rem">规格</div>
        <div class="column">库存</div>
        <div class="column">入库成本</div>
        <div class="column">入库时间</div>
        <div class="column">备注</div>
        <div class="column">操作</div>
      </div>

      <!-- 展示行 -->
      <div style="max-height: 40rem; overflow-y: auto">
        <div
          class="row flex"
          v-for="(good, goodIndex) in pageModel.goodList"
          :key="goodIndex"
          @click.stop="pageModel.pickGood(good)"
        >
          <div class="column" style="width: 2rem">
            <span
              class="fa"
              :class="{
                'fa-square-o': !good.checked,
                'fa-check-square': good.checked,
              }"
            ></span>
          </div>
          <div class="column">{{ good.name }}</div>
          <div class="column" style="width: 30rem">
            <div
              v-for="(tag, plugIndex) in good.plugList"
              :key="plugIndex"
              class="sj-link"
              style="margin-right: 0.25rem"
            >
              {{ tag.value + tag.name }}
            </div>
          </div>
          <div class="column">
            <div
              class="column-input"
              v-for="(tag, countIndex) in good.countList"
              :key="countIndex"
            >
              <input type="text" disabled :placeholder="tag.value" />
              <div class="sj-btn tag">{{ tag.name }}</div>
            </div>
          </div>
          <div class="column">
            <div>{{ good.cost }}元</div>
          </div>
          <div class="column">{{ good.timeString }}</div>
          <div class="column">{{ good.tip }}</div>
          <div class="column">
            <div
              class="sj-btn red tag"
              @click.stop="pageModel.deleteMyGood(good._id)"
            >
              删除
            </div>
            <div
              class="sj-btn green tag"
              @click.stop="goodFormShow($event, good)"
            >
              编辑
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品弹窗 -->
    <GoodForm ref="GoodForm" @formAction="goodFormAction" />

    <!-- 订单弹窗 -->
    <OrderForm ref="OrderForm" @formAction="orderFormAction" />
  </div>
</template>

<script>
import GoodForm from "./components/GoodForm/GoodForm.vue";
import OrderForm from "./components/OrderForm/OrderForm.vue";
import Model from "./model/Model.js";
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
    // ***************************** 商品组件控制 *****************************
    goodFormShow($event, good) {
      this.$refs.GoodForm.pageModel.toggleForm($event, good);
    },
    goodFormAction(params) {
      this.pageModel.goodEditModel = Object.assign({}, params);
      let model = this.pageModel.goodEditModel;
      model._id !== -1
        ? this.pageModel.editMyGood()
        : this.pageModel.addMyGood();
    },
    // ***************************** 订单组件控制 *****************************
    orderFormShow($event) {
      let list = [];
      // this.pageModel.goodList.forEach((e) => (e.checked ? list.push(e) : ""));
      list = this.pageModel.goodCheckedList;
      this.$refs.OrderForm.pageModel.toggleForm(list);
    },
    orderFormAction(params) {
      this.pageModel.createMyOrder(params);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
