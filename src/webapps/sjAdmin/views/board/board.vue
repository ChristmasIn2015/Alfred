<template>
  <div class="index sj-board">
    <!-- ** -->
    <div
      class="side left-scroll-off"
      :class="{ 'left-scroll-on': sideShow }"
      :style="{ width: !sideShow ? '0%' : '' }"
    >
      <div class="side-ad"></div>
      <div
        class="side-item"
        v-for="(item, index) in sideList"
        :key="index"
        :class="{ 'side-item-on': index === sideIndex }"
        @click.stop="setSideIndex(index)"
      >{{ item.name }}</div>
    </div>

    <!-- ** -->
    <div class="content flex-y">
      <!-- 用户信息 -->
      <div class="con-nav flex-middle-y">
        <div
          class="sj-btn"
          :class="{ tip: sideShow }"
          @click.stop="sideShow = !sideShow"
        >{{ sideShow ? '关闭菜单' : '展开菜单' }}</div>
        <div>
          <span>欢迎您:</span>
          <span class="sj-link" @click.stop="reLogin">{{ userInfo.phone }}</span>
          <span>，当前店铺:</span>
          <span class="sj-link" @click.stop="setSideIndex(0)">{{ shopInfo.name || '无' }}</span>
        </div>
      </div>
      <!-- 内容区 -->
      <div class="con-board">
        <div v-if="sideIndex === 0">
          <boardOfShop ref="boardOfShop" />
        </div>
        <div v-if="sideIndex === 1">
          <boardOfCustomer ref="boardOfCustomer" />
        </div>
        <div v-if="sideIndex === 2">
          <boardOfWareHouse ref="boardOfWareHouse" />
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <div class="sj-modal-back" v-show="modalLoginShow">
      <div class="modal" style="width: 20%;">
        <div class="title">
          <span>登录</span>
          <span @click.stop="modalLoginShow = false">✖</span>
        </div>
        <div class="content">
          <!-- <sjInput :state="{ type: 'number', holder: '注册或登录' }" />
          <sjInput :state="{ type: 'password' }" />-->
          <input type="text" v-model="userPhone" />
          <input type="text" v-model="userPassword" />
          <div>Tip: 未注册用户将会自动注册</div>
        </div>
        <div class="btns">
          <div class="sj-btn tip-on" @click.stop="modalLoginShow = false">取消</div>
          <div class="sj-btn" @click.stop="postLogin">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import boardOfShop from "../components/boardOfShop.vue";
import boardOfWareHouse from "../components/boardOfWareHouse.vue";
import boardOfCustomer from "../components/boardOfCustomer.vue";
import { shopUserLogin, getUserInfo } from "@/common/api/shop_apis.js";
export default {
  data() {
    return {
      // * 侧边栏相关
      sideShow: true,
      sideList: [
        { name: "店铺管理", id: 0 },
        { name: "订单管理", id: 1 },
        { name: "仓库管理", id: 2 },
      ],
      sideIndex: -1,
      // * 弹窗相关
      modalShopShow: false,
      modalLoginShow: false,
      userPhone: "",
      userPassword: "",
    };
  },
  components: {
    boardOfShop,
    boardOfWareHouse,
    boardOfCustomer,
  },
  mounted() {
    this.initUserInfo(); // ASYNC
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
  methods: {
    // ****************************************************** 全局 点击右侧 Side
    setSideIndex(index) {
      // 任何 Side 都需要登录
      if (!this.haveToken()) return;

      // 除了店铺管理，其他Side都需要选择店铺
      if (index !== 0 && this.shopInfo.id === -1) {
        $confirm({ title: "提示", content: "请选择店铺" }, (response) => {
          if (!response) return;
          let item = this.sideList[0];
          this.sideIndex = 0;
        });
        return;
      }

      // *
      this.sideIndex = index;
    },
    // ****************************************************** 用户
    // * 初始化用户信息
    async initUserInfo() {
      try {
        $load.show();
        let info = await getUserInfo();
        this.$store.state.userInfo.name = info.name;
        this.$store.state.userInfo.phone = info.phone;
        $tip("登录成功");
        this.modalLoginShow = false;
        $load.hide();
      } catch (error) {
        this.$store.commit("clearUserInfo");
        $tip(error);
        $warn(error);
        $load.hide();
      }
    },
    // * 登录
    async postLogin() {
      try {
        $load.show();
        let info = await shopUserLogin("", this.userPhone, this.userPassword);
        localStorage["sjShopToken"] = info.authorization;
        this.$store.state.userInfo.name = info.name;
        this.$store.state.userInfo.phone = info.phone;
        $tip("登录成功");
        $load.hide();
        this.modalLoginShow = false;
      } catch (error) {
        $tip(error);
        $load.hide();
        $warn(error);
      }
    },
    // * 注销登录
    reLogin() {
      if (this.haveToken()) {
        $confirm(
          { title: "注销", content: "您确定要注销登录吗" },
          (response) => {
            if (!response) return;
            this.$store.commit("clearUserInfo");
            this.sideIndex = -1;
          }
        );
      }
    },
    // * 判断是否，如果没有登录则唤起登录框
    haveToken() {
      let haveToken = localStorage["sjShopToken"] ? true : false;
      if (!haveToken) {
        $tip("尚未登录");
        this.modalLoginShow = true;
      }
      return haveToken;
    },
    // ****************************************************** 店铺管理
  },
};
</script>

<style lang="scss" scoped>
@import "board.scss";
</style>
