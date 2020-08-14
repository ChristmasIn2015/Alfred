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
          <span class="sj-link" @click.stop="reLogin">{{ userInfo.name }}</span>
          <span>，当前店铺:</span>
          <span class="sj-link" @click.stop="setSideIndex(0)">{{ userInfo.nowShopInfo.name }}</span>
        </div>
      </div>
      <!-- 内容区 -->
      <div class="con-board">
        <div v-if="sideIndex === 0">
          <boardOfShop ref="boardOfShop" />
        </div>
        <div v-if="sideIndex === 1">
          <boardOfWareHouse ref="boardOfWareHouse" />
        </div>
        <div v-if="sideIndex === 2">
          <boardOfCustomer ref="boardOfCustomer" />
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
          <sjInput :state="{ type: 'number', holder: '注册或登录' }" />
          <sjInput :state="{ type: 'password' }" />
          <div>Tip: 未注册用户将会自动注册</div>
        </div>
        <div class="btns">
          <div class="sj-btn tip" @click.stop="modalLoginShow = false">取消</div>
          <div class="sj-btn" @click.stop="postLogin">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import boardOfShop from "../../components/boardOfShop.vue";
import boardOfWareHouse from "../../components/boardOfWareHouse.vue";
import boardOfCustomer from "../../components/boardOfCustomer.vue";
export default {
  data() {
    return {
      // * 侧边栏相关
      sideShow: true,
      sideList: [
        { name: "店铺列表", id: 0 },
        { name: "仓库", id: 3 },
        { name: "开单", id: 5 },
      ],
      sideIndex: -1,
      // * 弹窗相关
      modalShopShow: false,
      modalLoginShow: false,
    };
  },
  components: {
    boardOfShop,
    boardOfWareHouse,
    boardOfCustomer,
  },
  mounted() {},
  computed: {
    userInfo() {
      // {
      //     name: '游客',
      //     phone: '',
      //     token: '',
      //     nowShopInfo: { name: '无', id: -1 },
      //     nowWareHouseInfo: { name: '无', id: -1 }
      // }
      let info = this.$store.getters.getUserInfo;
      console.log(info.nowShopInfo);
      return info;
    },
  },
  methods: {
    // ****************************************************** 全局 点击右侧 Side
    setSideIndex(index) {
      if (this.notLogin()) return;
      if (
        index !== 0 &&
        index !== 5 &&
        this.userInfo.nowShopInfo.name === "无"
      ) {
        this.$confirm({ title: "提示", content: "请选择店铺" }, (response) => {
          if (!response) return;
          let item = this.sideList[0];
          this.sideIndex = 0;
        });
        return;
      }
      let item = this.sideList[index];
      this.sideIndex = index;
    },
    // ****************************************************** 用户登录
    // * 登录
    postLogin() {
      this.$store.state.userInfo.name = "test";
      this.$store.state.userInfo.phone = -1;
      this.$store.state.userInfo.token = -1;
      this.$tip("登录成功");
      this.modalLoginShow = false;
    },
    // * 注销登录
    reLogin() {
      if (!this.notLogin()) {
        this.$confirm(
          { title: "注销", content: "您确定要注销登录吗" },
          (response) => {
            if (!response) return;
            this.$store.commit("clearUserInfo");
            this.sideIndex = -1;
          }
        );
      }
    },
    // * 判断是否登录，如果没有登录则唤起登录框
    notLogin() {
      let notLogin = true;
      let token = this.userInfo.token;
      notLogin = token === "";
      if (notLogin) {
        this.$tip("尚未登录");
        this.modalLoginShow = true;
      }
      return notLogin;
    },
    // ****************************************************** 店铺管理
  },
};
</script>

<style lang="scss" scoped>
@import "board.scss";
</style>
