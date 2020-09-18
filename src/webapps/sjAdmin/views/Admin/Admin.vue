<template>
  <div class="sj-board">
    <!-- ** -->
    <div
      class="side left-scroll-off"
      :class="{ 'left-scroll-on': pageModel.sideShow }"
      :style="{ width: !pageModel.sideShow ? '00%' : '' }"
    >
      <div class="side-ad">
        <span>DashBoard</span>
      </div>
      <div
        class="sj-btn"
        v-for="(item, index) in pageModel.sideList"
        :key="index"
        :class="{ 'sj-btn-active': index === pageModel.sideIndex }"
        @click.stop="pageModel.setSideIndex(index)"
      >{{ item.name }}</div>
    </div>

    <!-- ** -->
    <div class="side-right flex-y">
      <!-- 用户信息 -->
      <div class="con-nav flex-middle-y">
        <div>
          <span @click.stop="pageModel.sideShow = !pageModel.sideShow">欢迎您：</span>
          <span class="sj-link" @click.stop="pageModel.reLogin">{{ userInfo.phone || '请登录' }}</span>
          <span>，当前店铺：</span>
          <span
            class="sj-link"
            @click.stop="pageModel.toggleShopModal"
          >{{ shopInfo.name || '请选择您的店铺' }}</span>
          <span>，当前仓库：</span>
          <span
            class="sj-link"
            @click.stop="pageModel.toggleHouseModal"
          >{{ houseInfo.name || '请选择您的仓库' }}</span>
        </div>
      </div>
      <!-- 内容区 -->
      <div class="con-board">
        <div class="angle" @click.stop="pageModel.sideShow = !pageModel.sideShow">
          <span
            class="angle fa"
            :class="{'fa-caret-left':pageModel.sideShow, 'fa-caret-right':!pageModel.sideShow }"
          ></span>
        </div>
        <Employee v-if="pageModel.sideIndex === 0" ref="boardOfShop" />
        <House v-if="pageModel.sideIndex === 1" ref="boardOfWareHouse" />
        <boardOfCustomer v-if="pageModel.sideIndex === 2" ref="boardOfCustomer" />
      </div>
    </div>

    <!-- 登录弹窗 -->
    <div class="sj-modal-back" v-show="pageModel.modalLoginShow">
      <div class="modal" style="width: 20%;">
        <div class="title">
          <span>登录</span>
          <span @click.stop="pageModel.modalLoginShow = false">✖</span>
        </div>
        <div class="content">
          <input type="text" v-model="pageModel.userPhone" />
          <input type="text" v-model="pageModel.userPassword" />
          <div>Tip: 未注册用户将会自动注册</div>
        </div>
        <div class="btns">
          <div class="sj-btn" @click.stop="pageModel.postLogin">登录</div>
          <div class="sj-btn tip-on" @click.stop="pageModel.modalLoginShow = false">取消</div>
        </div>
      </div>
    </div>

    <!-- 店铺弹窗 -->
    <div
      class="sj-modal-right right-scroll-off"
      :class="{'right-scroll-on': pageModel.shopModalShow}"
    >
      <div class="left" @click.stop="pageModel.toggleShopModal"></div>
      <div class="right">
        <div class="card">
          <div class="title">创建的店铺</div>
          <div
            class="sj-btn tip-on"
            v-for="(shop, index) in pageModel.shopList"
            :key="index"
            :class="{'tip': shopInfo._id === shop._id}"
            @click.stop="pageModel.pickShop(shop)"
          >{{ shop.name }}</div>
          <div class="sj-btn" @click.stop="pageModel.createMyShop">+ 创建新店铺</div>
        </div>
        <div class="card">
          <div class="title">加入的店铺</div>
          <div
            class="sj-btn tip-on"
            v-for="(shop, index) in pageModel.shopWorkInList"
            :key="index"
            :class="{'tip': shopInfo._id === shop._id}"
            @click.stop="pageModel.pickShop(shop)"
          >{{ shop.name }}</div>
        </div>
      </div>
    </div>

    <!-- 仓库弹窗 -->
    <div
      class="sj-modal-right right-scroll-off"
      :class="{'right-scroll-on': pageModel.houseModalShow}"
    >
      <div class="left" @click.stop="pageModel.toggleHouseModal"></div>
      <div class="right">
        <div class="card">
          <div class="title">创建的仓库</div>
          <div
            class="sj-btn tip-on"
            v-for="(house, index) in pageModel.houseList"
            :key="index"
            :class="{'tip': houseInfo._id === house._id}"
            @click.stop="pageModel.pickHouse(house)"
          >{{ house.name }}</div>
          <div class="sj-btn" @click.stop="pageModel.createMyHouse">+ 创建新仓库</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Model from "./Model.js";
import Employee from "../Board/Employee/Employee.vue";
import House from "../Board/House/House.vue";
import boardOfCustomer from "../Board/boardOfCustomer.vue";
export default {
  data() {
    return {
      pageModel: new Model(),
    };
  },
  components: {
    Employee,
    House,
    boardOfCustomer,
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
};
</script>

<style lang="scss" scoped>
@import "Admin.scss";
</style>
