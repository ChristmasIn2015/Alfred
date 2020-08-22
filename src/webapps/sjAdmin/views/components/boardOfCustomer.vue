<template>
  <div class="index">
    <div class="board-title">开单</div>
    <div class="board-title">客户管理</div>
    <p>
      <span>客户列表</span>
    </p>
    <div class="table">
      <div class="row flex">
        <div class="column">Id</div>
        <div class="column">名称</div>
        <div class="column">手机</div>
        <div class="column">公司名称</div>
        <div class="column">搜索关键字</div>
        <div class="column commodity-tag-column"></div>
        <div class="column"></div>
      </div>
      <div class="over-box">
        <div class="row flex">
          <div class="column">-1</div>
          <div class="column">
            <input />
          </div>
          <div class="column">
            <input />
          </div>
          <div class="column">
            <input />
          </div>
          <div class="column">
            <input />
          </div>
          <div class="column commodity-tag-column"></div>
          <div class="column">
            <div class="sj-btn blue">添加客户</div>
          </div>
        </div>
        <div class="row flex" v-for="(customer, index) in customerList" :key="index">
          <div
            class="column"
            v-for="(value, key) in customer"
            :key="key"
            :class="{ 'commodity-tag-column': key === 'commodityTags' }"
          >
            <span>{{ value }}</span>
          </div>
          <div class="column commodity-tag-column"></div>
          <div class="column">
            <div class="sj-link" style="color: red;">删除</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowCustomerIndex: -1,
      customerList: [
        {
          id: -11,
          CustomerName: "客户A",
          CustomerPhone: "132****1234",
          CompanyName: "某公司",
          SearchKey: "mgs",
        },
        {
          id: -11,
          CustomerName: "客户A",
          CustomerPhone: "132****1234",
          CompanyName: "某公司",
          SearchKey: "mgs",
        },
      ],
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
@import "boardPublic.scss";
.index {
  margin: 1rem;
  padding: 1rem;
  background-color: $sj-white;
}
</style>
