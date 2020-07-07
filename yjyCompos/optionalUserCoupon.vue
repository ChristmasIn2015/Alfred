<template>
  <div class="index" :style="config.compo.style">
    <!-- 优惠券列表 -->
    <div class="coupon-list">
      <div class="coupon flex" v-for="(item, index) in couponList" :key="index">
        <div
          class="coupon-title flex-y flex-middle"
          :class="{'coupon-title-grey': item.promotionTimeout || item.remainAmount <= 0}"
        >
          <div class="text-cut">
            <span>￥</span>
            <span style="font-size: 1.2rem;">{{ item.reductionAmount }}</span>
          </div>
          <div class="text-cut">{{ item.fullAmount > 0 ? `满${item.fullAmount}减` : `立减` }}</div>
        </div>
        <div
          class="coupon-info"
          :style="{'background-color': !item.promotionTimeout && item.remainAmount > 0 ? '' : 'white'}"
        >
          <div class="line1 flex-side">
            <div
              class="text-cut"
              :class="{'font-red': !item.promotionTimeout && item.remainAmount > 0}"
            >{{ item.name }}</div>
            <div @click.stop="showCouponContent(item.activityStatement)">
              活动规则
              <span v-html="'&gt'"></span>
            </div>
          </div>
          <div class="line3 flex-side flex-middle-y">
            <span>{{ `${item.validStartTime} ~ ${item.validEndTime}` }}</span>
            <span class="grey-tag" v-if="item.promotionTimeout">已结束</span>
            <span class="grey-tag" v-else-if="item.remainAmount <= 0">已领完</span>
          </div>
        </div>
      </div>
      <div class="coupon" v-show="!couponList.length">
        <div class="tip">暂无优惠券</div>
      </div>
    </div>
    <!-- 登录相关 * 已登录且已点击领取 -->
    <div class="coupon-user" v-if="couponReceived">
      <div class="user-tip">{{ `优惠券已经放入账号：${userPhone}`}}</div>
      <div class="user-btn">
        <div class="coupon-btn" :style="config.coupon.btnStyle">请在游山西app中使用</div>
      </div>
    </div>
    <!-- 登录相关 * 已登录/未登录且未点击领取 -->
    <div class="coupon-user" v-else>
      <div class="user-phone flex">
        <input v-model="phoneString" type="number" maxlength="11" placeholder="请输入手机号" />
      </div>
      <div class="user-code flex-middle-y">
        <input v-model="phoneCodeString" type="number" maxlength="8" placeholder="请输入验证码" />
        <div
          class="coupon-btn"
          :class="{'coupon-btn-on': codePosted}"
          :style="config.coupon.btnStyle"
          @click.stop="phoneCodeAction"
        >{{ `${codePostedMsg}${codePostedTimer?'S':''}`}}</div>
      </div>
      <div class="user-btn">
        <div
          class="coupon-btn"
          :class="{'coupon-btn-on': !phoneString || !phoneCodeString}"
          :style="config.coupon.btnStyle"
          @click.stop="takeCouponAction"
        >一键领取</div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div
      class="coupon-pop-down flex-y-reverse fade-off"
      :class="{'fade-on': couponDetailShow}"
      @click.self="couponDetailShow = false"
    >
      <div class="down-content flex-y" :class="{'down-content-on': couponDetailShow}">
        <div class="title">
          <span>活动规则</span>
          <span style="font-size: 2rem; float: right;" @click.self="couponDetailShow = false">×</span>
        </div>
        <div class="content" v-html="couponDetail"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "optionalUserCoupon",
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      phoneString: "",
      phoneCodeString: "",
      codePosted: false,
      codePostedMsg: "获取验证码",
      codePostedTimer: null,
      couponList: [],
      couponDetail: "",
      couponDetailShow: false,
      couponReceived: false,
      userPhone: ""
    };
  },
  watch: {
    config: {
      handler(val, old) {
        this.$emit("renderAction", {
          name: "optionalUserCoupon",
          value: val,
          next: this.renderCouponList
        });
      },
      immediate: true
    }
  },
  mounted() {
    this.userPhone = "";
    let havePosted = window.localStorage["yjyCouponCodeStartTime"];
    if (havePosted) this.codePostedTimerRun();
  },
  methods: {
    doNothing() {},
    // ****************************************** 点击事件 ******************************************
    phoneCodeAction() {
      if (this.codePostedTimer) return;
      // * 手机号不能为空
      if (!this.phoneString && this.$toast) {
        this.$toast("请输入手机号");
        return;
      }
      let data = {
        linkType: "userCoupon",
        value: {
          target: "getPhoneCode",
          phone: this.phoneString,
          phoneCode: this.phoneCodeString
        },
        next: this.renderPhoneCodeBtn
      };
      this.$emit("clickAction", data);
    },
    takeCouponAction() {
      let data = {
        linkType: "userCoupon",
        value: {
          target: "takeCoupon",
          phone: this.phoneString,
          phoneCode: this.phoneCodeString,
          queryIds: this.config.coupon.queryIds,
          postMessage: this.config.coupon.postMessage,
          next: this.renderAPPBtn
        },
        next: this.renderCouponList
      };
      this.$emit("clickAction", data);
    },
    // ****************************************** 渲染事件 ******************************************
    renderPhoneCodeBtn(bool) {
      if (this.codePostedTimer) return;
      if (bool) {
        // * 验证码已发送成功
        this.codePosted = true; // 按钮颜色置灰
        window.localStorage["yjyCouponCodeStartTime"] = Date.now(); // 本地设置倒计时起点
        this.codePostedMsg = 60;
        this.codePostedTimerRun();
      }
    },
    renderCouponList(data) {
      data.list.forEach(e => {
        e.validStartTime = e.validStartTime
          ? e.validStartTime.substring(0, 10)
          : "";
        e.validEndTime = e.validEndTime ? e.validEndTime.substring(0, 10) : "";
        e.categoryParentId = this.getCouponTypeName(e.categoryParentId);
        e["promotionTimeout"] = e.validEndTime
          ? Date.now() > new Date(e.validEndTime).getTime()
          : true;
      });
      this.couponList = Object.assign([], data.list);
    },
    renderAPPBtn() {
      this.userPhone = window.localStorage["yjyCouponPhone"] || "";
      this.couponReceived = true;
      this.phoneString = "";
      this.phoneCodeString = "";
    },
    // ****************************************** UI通用 ******************************************
    showCouponContent(message) {
      this.couponDetailShow = !this.couponDetailShow;
      this.couponDetail = message ? message.replace(/\n/g, "<br>") : "";
    },
    getCouponTypeName(type) {
      let name = "";
      switch (type) {
        case "1":
          name = "酒店";
          break;
        case "5":
          name = "门票";
          break;
        case "14":
          name = "线路";
          break;
      }
      return name;
    },
    codePostedTimerRun() {
      this.codePosted = true;
      this.codePostedTimer = setInterval(() => {
        if (this.codePostedMsg <= 1) {
          clearInterval(this.codePostedTimer);
          this.codePostedTimer = null;
          window.localStorage["yjyCouponCodeStartTime"] = "";
          this.codePostedMsg = "获取验证码";
          this.codePosted = false;
          return;
        }
        let start = window.localStorage["yjyCouponCodeStartTime"];
        let gap = (Date.now() - start) / 1000;
        this.codePostedMsg = 60 - parseInt(gap);
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/public.less";
/* prettier-ignore */
.index {
    padding: 12PX;
    position: relative;
    background-color: transparent;
    .coupon-list{
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      } 
      .coupon{
        background-color: white;
        margin: 12PX auto;
        margin-top: 0PX;
        border-radius: 6PX;
        overflow: hidden;
        .coupon-title{
          min-width:80PX;
          max-width:80PX;
          background-color: #E92424;
          color: white;
          div{
            width: 100%;
            text-align: center;
            font-size: 12PX;
            margin: 3PX auto;
          }
        }
        .coupon-title-grey{
          background-color: #E5E5E5;
          color: #999999;
        }
        .coupon-info{
          width: 100%;
          padding: 12PX;
          background-color: rgb(252,233,233);
          .line1{
            padding-bottom: 12PX;
            line-height: 1.2rem;
            div{
              width: 100%;
              color: #999999;
              &:last-child{
                width: 50%;
                font-size: 0.8rem;
                text-align: right;
              }
            }
            .font-red{
              color: red;
            }
          }
          .line3{
            font-size: 0.8rem;
            color: rgb(133, 133, 133);
            .grey-tag{
              color: white;
              background-color: #D8D8D8;
              border-radius: 0.25rem;
              padding:0.25rem 0.5rem;
            }
          }
        }
        .tip{
          color: #999999;
          text-align: center;
          line-height: 5rem;
        }
      }
    }
    .coupon-user{
      padding: 12PX 0PX;
      border-radius: 6PX;
      .user-phone{
        height: 44PX;
        input{
          width: 100%;
          height: 100%;
          font-size: 1rem;
          line-height: normal;
          vertical-align: middle;
          outline: none;
          -webkit-appearance: none;
          padding: 0PX 12PX;
          border: 1PX solid rgb(214, 214, 214);
          border-radius: 6PX;
          &:focus{
            border: 1PX solid rgb(37, 150, 255);
          }
        }
      }
      .user-code{
        height: 44PX;
        margin-top: 12PX;
        input{
          width: 180PX;
          padding: 0PX 12PX;
          outline: none;
          -webkit-appearance: none;
          height: 100%;
          font-size: 1rem;
          line-height: normal;
          vertical-align: middle;
          border: 1PX solid rgb(214, 214, 214);
          border-radius: 6PX;
          &:focus{
            border: 1PX solid #1288F0;
          }
        }
        .coupon-btn{
          line-height: 44PX;
          padding: 0PX;
          width: 104PX;
          margin-left: auto;
        }
      }
      .user-tip{
        color: #999999;
        text-align: center;
        line-height: 3rem;
      }
      .user-btn{
        height: 44PX;
        margin-top: 12PX;
        .coupon-btn{
          font-weight: bold;
          padding: 0PX;
          line-height: 44PX;
        }
      }
    }
  }
/* prettier-ignore */
.coupon-btn {
  color: white;
  text-align: center;
  padding: 12PX;
  background-color: #1288f0;
  border-radius: 6PX;
}
/* prettier-ignore */
.btn-white {
  background-color: white;
  color: rgb(214, 214, 214);
  border: 1PX solid rgb(214, 214, 214);
}
.coupon-btn-on {
  opacity: 0.5;
}
// 居中板
/* prettier-ignore */
.fade-off {
  transition: all 0.2s;
  visibility: hidden;
}
.fade-on {
  visibility: visible;
}
/* prettier-ignore */
.coupon-pop-down {
  position: fixed;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  .down-content{
    background-color: white;
    border-radius: 6PX 6PX 0PX 0PX;
    height: 40%;
    transition: all 0.2s;
    padding: 0PX 12PX;
    transform: translateY(100%);
    .title{
      font-size: 1.2rem;
      line-height: 3.5rem;
      text-align: center;
      font-weight: bold;
    }
    .content{
      height: 100%;
      overflow-y: auto;
      font-size: 14PX;
      line-height: 24PX;
      margin-bottom: 12PX;
    }
  }
  .down-content-on{
    transform: translateY(0%);
  }
}
</style>