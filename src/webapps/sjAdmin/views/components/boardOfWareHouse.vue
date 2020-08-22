<template>
  <div class="index">
    <!-- ************************** -->
    <div class="board-title">我的仓库</div>
    <div class="btn-line flex-wrap">
      <div
        class="sj-btn blue-on"
        v-for="(wareHouse, index) in wareHouseList"
        :key="index"
        :class="{ blue: nowWareHouseId === wareHouse._id }"
        @click.stop="resetNowWareHouse(index)"
      >
        <span>{{ wareHouse.name }}</span>
        <span class="close" @click.stop="deleteMyWareHouse(wareHouse._id)"></span>
      </div>
      <div class="sj-btn blue">
        <span @click.stop="createMyWareHouse">创建仓库</span>
      </div>
    </div>
    <CommodityInRight ref="CommodityInRight" />

    <!-- ************************** -->
    <!-- 1.库存列表 -->
    <div class="board-title">库存管理</div>
    <div class="btn-line flex">
      <div class="sj-btn blue">筛选</div>
    </div>
    <div class="table">
      <!-- 标题行 -->
      <div class="row flex">
        <div class="column">Id</div>
        <div class="column">名称</div>
        <div class="column">规格</div>
        <div class="column">计量单位</div>
        <div class="column">总价</div>
        <div class="column">单位价格(自动)</div>
        <div class="column">备注</div>
        <div class="column">操作</div>
      </div>
      <!-- 输入行 -->
      <div class="row flex">
        <div class="column">-1</div>
        <div class="column">
          <input />
        </div>
        <div class="column">
          <div class="sj-link" @click.stop="showBoardInRight">1250</div>
          <div class="sj-link" @click.stop="showBoardInRight">1000</div>
          <div class="sj-link" @click.stop="showBoardInRight">9.5</div>
        </div>
        <div class="column">
          <div class="column-input">
            <input />
            <div class="sj-btn blue" @click.stop="showBoardInRight">张</div>
          </div>
          <div class="column-input">
            <input />
            <div class="sj-btn blue" @click.stop="showBoardInRight">吨</div>
          </div>
        </div>
        <div class="column">
          <input />
        </div>
        <div class="column">123</div>
        <div class="column">
          <input />
        </div>
        <div class="column">
          <div class="sj-btn blue">入库</div>
        </div>
      </div>
      <!-- 内容列表 -->
      <div class="row flex">
        <div class="column">999</div>
        <div class="column">商品AAAAA</div>
        <div class="column">
          <div class="sj-btn toggle">长度: 1000 mm</div>
          <div class="sj-btn toggle">宽度: 100 cm</div>
          <div class="sj-btn toggle">宽度: 100 cm</div>
        </div>
        <div class="column">
          <div class="sj-btn toggle">22张</div>
          <div class="sj-btn toggle">22吨</div>
        </div>
        <div class="column">21312312</div>
        <div class="column">123</div>
        <div class="column">
          <input type="text" />
        </div>
        <div class="column">
          <div class="sj-btn red">删除</div>
          <div class="sj-btn">转换</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createWareHouse,
  getShopWareHouseList,
  deleteShopWareHouse,
} from "@/common/api/wareHouse_api.js";
import CommodityInRight from "./CommodityInRight.vue";
export default {
  data() {
    return {
      nowWareHouseId: -1,
      wareHouseList: [],
      wareHouseCommodityMap: {
        "-1": [
          {
            id: -1,
            name: "商品A",
            price: 999,
            quantity: 123,
            commodityTags: [
              { name: "宽度", id: -1, value: "100", valueBy: "cm" },
              { name: "长度", id: -2, value: "12", valueBy: "m" },
            ],
          },
          {
            id: -1,
            name: "商品B",
            price: 1200,
            quantity: 123,
            commodityTags: [
              { name: "宽度", id: -1, value: "100", valueBy: "cm" },
              { name: "色泽", id: -3, value: "深红", valueBy: "色" },
              { name: "重量", id: -4, value: "1000", valueBy: "kg" },
            ],
          },
        ],
        "-3": [
          {
            id: -1,
            name: "商品AAAAA",
            price: 999,
            quantity: 123,
            commodityTags: [
              { name: "宽度", id: -1, value: "100", valueBy: "cm" },
              { name: "长度", id: -2, value: "12", valueBy: "m" },
            ],
          },
          {
            id: -1,
            name: "商品BCSADSA",
            price: 1200,
            quantity: 123,
            commodityTags: [
              { name: "宽度", id: -1, value: "100", valueBy: "cm" },
              { name: "色泽", id: -3, value: "深红", valueBy: "色" },
              { name: "重量", id: -4, value: "1000", valueBy: "kg" },
            ],
          },
        ],
      },
      commodityTagList: [
        { name: "宽度", id: -1, value: "", valueBy: "cm" },
        { name: "色泽", id: -3, value: "", valueBy: "色" },
        { name: "重量", id: -4, value: "", valueBy: "kg" },
        { name: "宽度", id: -1, value: "", valueBy: "cm" },
        { name: "长度", id: -2, value: "", valueBy: "m" },
      ],
    };
  },
  components: {
    CommodityInRight,
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
  mounted() {
    this.getMyShopWareHouseList();
  },
  methods: {
    // *
    resetNowWareHouse(index) {
      let wareHouse = this.wareHouseList[index];
      if (!wareHouse) return;
      this.nowWareHouseId = wareHouse._id;
    },
    // * 新增仓库
    async createMyWareHouse() {
      try {
        let shopId = this.shopInfo.id;
        if (!shopId) return;
        await createWareHouse(shopId);
        $tip("创建仓库成功");
        this.getMyShopWareHouseList();
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
    // * 删除仓库
    async deleteMyWareHouse(wareHouseId) {
      try {
        let shopId = this.shopInfo.id;
        if (!shopId) return;
        await deleteShopWareHouse(shopId, wareHouseId);
        $tip("删除仓库成功");
        this.nowWareHouseId = -1;
        this.getMyShopWareHouseList();
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
    // * 获取仓库列表
    async getMyShopWareHouseList() {
      try {
        let shopId = this.shopInfo.id;
        if (!shopId) return;
        let list = await getShopWareHouseList(shopId);
        this.wareHouseList = Object.assign([], list);
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
    showBoardInRight() {
      this.$refs.CommodityInRight.toShow();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "boardPublic.scss";
.index {
  margin: 1rem;
  padding: 0rem 1rem;
  background-color: $sj-white;
  overflow: hidden;
}
</style>
