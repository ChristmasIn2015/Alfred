<template>
  <div class="sj-modal-back" v-if="orderFormShow">
    <div class="modal" style="width: 80rem">
      <div class="title">
        <span>订单</span>
        <span @click.stop="toggleOrderForm">✖</span>
      </div>
      <div class="content">
        <div class="box-table">
          <!-- 1 -->
          <div class="row">
            <div class="column">名称</div>
            <div class="column" style="width: 30rem">规格</div>
            <div class="column" style="width: 30rem">库存</div>
            <div class="column">入库成本</div>
            <div class="column">最终售价</div>
            <div class="column">售出单价</div>
            <div class="column">操作</div>
          </div>
          <!-- 2 -->
          <div
            class="no-scroll-bar"
            style="max-height: 40rem; overflow-y: auto"
          >
            <div class="row" v-for="(good, index) in orderSource" :key="index">
              <div class="column">{{ good.name }}</div>
              <div class="column" style="width: 30rem">
                <div
                  v-for="(tag, plugIndex) in good.plugList"
                  :key="plugIndex"
                  style="margin-right: 0.5rem"
                >
                  *{{ tag.value + tag.name }}
                </div>
                <div v-show="good.plugs">{{ good.plugs }}</div>
              </div>
              <div class="column" style="width: 30rem">
                <div
                  class="column-input"
                  v-for="(tag, countIndex) in good.countList"
                  :key="countIndex"
                >
                  <input type="number" :value="tag.value" />
                  <div class="sj-btn tag">{{ tag.name }}</div>
                </div>
                <div v-show="good.counts">{{ good.counts }}</div>
              </div>
              <div class="column">
                <span>{{ good.cost }}元</span>
              </div>
              <div class="column">
                <input type="number" v-model="good.cost" style="width: 70%" />
                <span>元</span>
              </div>
              <div class="column">
                <div
                  v-for="(tag, countIndex) in good.countList"
                  :key="countIndex"
                  style="width: 100%"
                >
                  {{ (good.cost / tag.value).toFixed(2) }}元 /{{ tag.name }}
                </div>
              </div>
              <div class="column">
                <div
                  class="sj-btn red tag"
                  @click.stop="orderSource.splice(index, 1)"
                >
                  删除
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="sj-btn">创建</div>
        <div class="sj-btn tip-on" @click.stop="toggleOrderForm">取消</div>
        <div class="sj-btn tip-on" @click.stop="toggleOrderForm">
          添加临时商品
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderFormShow: true,
      orderSource: [],
      orderEditModel: {
        name: "",
        plugs: "",
        counts: "",
        price: "",
      },
    };
  },
  methods: {
    tempGoodPush() {
      this.orderSource.unshift({
        isTemp: true,
        name: this.orderEditModel.name,
        plugs: this.orderEditModel.plugs,
        counts: this.orderEditModel.counts,
        cost: this.orderEditModel.price,
      });
    },
    toggleOrderForm(goodList) {
      if (goodList.length) {
        let list = [];
        goodList.forEach((good) => {
          if (good.checked) list.push(good);
        });
        this.orderSource = Object.assign([], list);
      }
      this.orderFormShow = !this.orderFormShow;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
