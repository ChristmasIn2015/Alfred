<template>
  <div class="over-box">
    <!-- ************************** -->
    <div class="box-title">库存管理</div>
    <!-- 1.库存列表 -->
    <div class="box-table">
      <!-- 展示行 -->
      <div class="row">
        <div class="column">ID</div>
        <div class="column">商品名称</div>
        <div class="column" style="width: 100%;">
          <div
            class="sj-btn blue"
            @click.stop="showBoardInRight(-1, goodEditModel.plugList, 'plug')"
          >添加规格</div>
        </div>
        <div class="column" style="width: 100%;">
          <div
            class="sj-btn blue"
            @click.stop="showBoardInRight(-1, goodEditModel.countList, 'count')"
          >添加单位</div>
        </div>
        <div class="column">成本</div>
        <div class="column">备注</div>
        <div class="column">创建时间</div>
        <div class="column">操作</div>
      </div>
      <!-- 输入行 -->
      <div class="row">
        <div class="column"></div>
        <div class="column">
          <input v-model="goodEditModel.name" placeholder="商品名称" />
        </div>
        <div class="column" style="width: 100%;">
          <div
            class="sj-btn tag"
            v-for="(tag, index) in goodEditModel.plugList"
            :key="index"
            @click.stop="showBoardInRight(-1, goodEditModel.plugList, 'plug')"
          >{{ tag.value + ' ' + tag.name }}</div>
        </div>
        <div class="column" style="width: 100%;">
          <div class="column-input" v-for="(tag, index) in goodEditModel.countList" :key="index">
            <input type="number" :value="tag.value" />
            <div
              class="sj-btn"
              @click.stop="showBoardInRight(-1, goodEditModel.countList, 'count')"
            >{{ tag.name }}</div>
          </div>
        </div>
        <div class="column">
          <input type="number" v-model="goodEditModel.cost" />
        </div>
        <div class="column">
          <input v-model="goodEditModel.tip" placeholder="备注" />
        </div>
        <div class="column"></div>
        <div class="column">
          <div class="sj-btn blue" @click.stop="addMyGood">入库</div>
        </div>
      </div>

      <!-- 展示行 -->
      <div class="row flex" v-for="(good, goodIndex) in goodList" :key="goodIndex">
        <div class="column">{{ goodIndex }}</div>
        <div class="column">{{good.name}}</div>
        <div class="column" style="width: 100%;">
          <div
            class="sj-btn tag"
            v-for="(tag, plugIndex) in good.plugList"
            :key="plugIndex"
          >{{ tag.value + ' ' + tag.name }}</div>
        </div>
        <div class="column" style="width: 100%;">
          <div
            v-for="(tag, countIndex) in good.countList"
            :key="countIndex"
          >{{tag.value}} {{ tag.name }} /</div>
        </div>
        <div class="column">
          <div>{{ good.cost }}元</div>
        </div>
        <div class="column">{{good.tip}}</div>
        <div class="column">{{good.timeString}}</div>
        <div class="column">
          <div class="sj-btn red" @click.stop="deleteMyGood">删除</div>
        </div>
      </div>
    </div>
    <Tag ref="commodityInRight" @tagPickAction="tagPickAction" />
  </div>
</template>

<script>
import {
  createWareHouse,
  getShopWareHouseList,
  deleteShopWareHouse,
  createGood,
  getGoodList,
} from "@/common/api/apis_sjAdmin.js";
import Tag from "./components/Tag.vue";
import Model from "./Model.js";
export default {
  data() {
    return {
      pageModel: new Model(),
      wareHouseList: [],
      goodList: [],
      goodEditModel: {
        id: -1,
        name: "",
        plugList: [],
        countList: [],
        cost: 0,
        tip: "",
      },
    };
  },
  components: {
    Tag,
  },
  mounted() {
    this.getMyGoodList();
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
  },
  methods: {
    // * 获取某个仓库下所有商品
    async getMyGoodList() {
      try {
        let list = await getGoodList(this.houseInfo._id);
        this.goodList = Object.assign([], list.reverse());
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
    // * 添加商品
    async addMyGood() {
      try {
        let info = await createGood(
          this.houseInfo._id,
          this.goodEditModel.name,
          this.goodEditModel.plugList,
          this.goodEditModel.countList,
          this.goodEditModel.cost,
          this.goodEditModel.tip
        );
        this.getMyGoodList(); // ASYNC
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
    // * 标签回调
    tagPickAction(value) {
      let list = [];
      value.list.forEach((e) => {
        if (e.checked) list.push(e);
      });

      //
      if (value.boardType === "plug") {
        this.goodEditModel.plugList = Object.assign([], list);
      }
      if (value.boardType === "count") {
        this.goodEditModel.countList = Object.assign([], list);
      }
    },
    showBoardInRight(goodId, list, boardType) {
      this.$refs.commodityInRight.toShow(goodId, list, boardType);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
