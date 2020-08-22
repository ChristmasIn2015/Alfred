<template>
  <div class="index">
    <!-- 1 -->
    <div class="board-title">我管理的店铺</div>
    <div class="btn-line flex-wrap">
      <div
        class="sj-btn blue-on"
        v-for="(shop, index) in shopListOfMaster"
        :key="index"
        :class="{ blue: nowShopId === shop._id }"
        @click.stop="resetNowShop(shop)"
      >
        <span>{{ shop.name }}</span>
        <span class="close" @click.stop="deleteMyShop(shop._id)"></span>
      </div>
      <div class="sj-btn blue" @click.stop="createMyShop">新开店铺</div>
    </div>

    <!-- 2 -->
    <div class="board-title">我加入的店铺</div>
    <div class="btn-line flex-wrap">
      <div
        class="sj-btn blue-on"
        v-for="(shop, index) in shopListOfEmployee"
        :key="index"
        :class="{ blue: nowShopId === shop._id }"
        @click.stop="resetNowShop(shop)"
      >
        <span>{{ shop.name }}</span>
      </div>
    </div>

    <!-- 3 -->
    <div class="board-title">员工列表</div>
    <div class="table">
      <!-- 3.1 -->
      <div class="row flex">
        <div class="column">Id</div>
        <div class="column">姓名</div>
        <div class="column">手机号</div>
        <div class="column" style="width: 100%;"></div>
        <div class="column"></div>
      </div>
      <!-- 3.2 -->
      <div class="row flex">
        <div class="column">-1</div>
        <div class="column">-</div>
        <div class="column">
          <input v-model="newEmployeePhone" />
        </div>
        <div class="column" style="width: 100%;"></div>
        <div class="column">
          <div class="sj-btn blue" @click.stop="addMyEmployee">添加</div>
        </div>
      </div>
      <!-- 3.3 -->
      <div class="row flex" v-for="(employee, index) in employeeList" :key="index">
        <div class="column">
          <span>{{ employee.role === 0 ? "店长":index }}</span>
        </div>
        <div class="column">
          <span>{{ employee.name }}</span>
        </div>
        <div class="column">
          <span>{{ employee.phone }}</span>
        </div>
        <div class="column" style="width: 100%;"></div>
        <div class="column">
          <div
            class="sj-link"
            style="color: red;"
            @click.stop="deleteMyEmployee(employee.employeeId)"
          >删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getShopList,
  createShop,
  deleteShop,
  createEmployee,
  getEmployeeList,
  deleteEmployee,
  getShopListOfEmployee,
} from "@/common/api/shop_apis.js";
export default {
  data() {
    return {
      nowShopId: -1,
      newEmployeePhone: "",
      //
      shopListOfMaster: [],
      shopListOfEmployee: [],
      employeeList: [],
    };
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
  },
  watch: {
    nowShopId(val, old) {
      this.getMyEmployeeList(val); // ASYNC
    },
  },
  mounted() {
    this.initNowShop(); // ASYNC
  },
  methods: {
    //
    async initNowShop() {
      try {
        // 创建的店铺列表
        let list = await getShopList();
        this.shopListOfMaster = Object.assign([], list);

        // 加入的店铺列表
        list = await getShopListOfEmployee();
        this.shopListOfEmployee = Object.assign([], list);

        //
        this.nowShopId = this.shopInfo.id;
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
    // * 添加员工
    async addMyEmployee() {
      try {
        await createEmployee(this.newEmployeePhone, this.nowShopId);
        this.getMyEmployeeList(this.nowShopId); // ASYNC
        $tip("添加员工成功");
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
    // * 删除员工
    async deleteMyEmployee(id) {
      try {
        await deleteEmployee(id);
        $tip("删除成功");
        this.getMyEmployeeList(this.nowShopId); // ASYNC
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
    // * 新开店铺
    async createMyShop() {
      try {
        await createShop();
        this.initNowShop(); // ASYNC
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
    // * 删除店铺
    async deleteMyShop(id) {
      try {
        await deleteShop(id);
        this.$store.commit("initShopInfo", { name: "", id: -1 });
        this.initNowShop(); // ASYNC
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
    // * 重新选择当前店铺
    resetNowShop(shop) {
      this.$store.commit("initShopInfo", { name: shop.name, id: shop._id });
      this.nowShopId = shop._id;
    },
    // * 取得员工列表
    async getMyEmployeeList(id) {
      try {
        let list = await getEmployeeList(id);
        this.employeeList = Object.assign([], list);
      } catch (error) {
        this.employeeList = [];
        $tip(error);
        $warn(error);
      }
    },
  },
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
