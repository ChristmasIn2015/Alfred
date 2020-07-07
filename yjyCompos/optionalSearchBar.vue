<template>
  <div class="my-search flex-middle-y" :style="config.compo.style">
    <div
      class="nail flex-side flex-middle-y"
      :style="config.nail.style"
      :class="{ reFixed: reFixed }"
    >
      <!-- 左边 -->
      <div v-show="config.left.url" class="search-icon">
        <img
          :src="config.left.url"
          alt
          @click.stop="leftAction(config.left.link)"
          :onerror="defaultHeader"
        />
        <span class="search-icon-pot" v-show="leftPot" />
      </div>
      <!-- 中间 -->
      <div
        v-show="config.center.show"
        class="search-bar flex-middle-y"
        :style="config.center.style"
        @click.stop="clickAction(config.center.link)"
      >
        <!-- font-awsome -->
        <span class="fa fa-search" />
        <span>{{ config.center.message }}</span>
      </div>
      <!-- 右边 -->
      <div v-show="config.right.url" class="search-icon">
        <img
          :src="config.right.url"
          alt
          @click.stop="rightAction(config.right.link)"
          :onerror="defaultHeader"
        />
        <span class="search-icon-pot" v-show="rightPot" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "optionalSearchBar",
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          compo: {},
          nail: {},
          left: {},
          center: {},
          right: {}
        };
      }
    }
  },
  data() {
    return {
      defaultHeader:
        'this.src="http://pic.lvmama.com/uploads/pc/place2/jtour/2020-06-30/jtour_op_sys_1593508573890.png"',
      nailTimer: null,
      reFixed: false,
      leftPot: 0,
      rightPot: 0
    };
  },
  watch: {
    config: {
      handler(newConfig, old) {
        if (newConfig.compo.fixed) {
          window.removeEventListener("scroll", this.setBarTop);
          window.addEventListener("scroll", this.setBarTop);
        }
        this.$emit("renderAction", {
          name: "optionalSearchBar",
          value: newConfig,
          next: this.renderRedPot
        });
      },
      immediate: true
    }
  },
  beforeRouteLeave() {
    // 清除监听器
    window.removeEventListener("scroll", this.setBarTop);
  },
  beforeDestroy() {
    // 清除监听器
    window.removeEventListener("scroll", this.setBarTop);
  },
  computed: {},
  methods: {
    // 这个方法用于监听页面滚动，用于设置本组件的固钉，需要设置函数节流
    setBarTop(event) {
      if (this.nailTimer) clearTimeout(this.nailTimer);
      this.nailTimer = setTimeout(() => {
        // 取得视口距离页面顶部的高度值
        let pageAwayTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        // 判断并重新定位本组件
        let charge = pageAwayTop > this.$el.offsetTop;
        if (charge !== this.reFixed) {
          this.reFixed = charge;
        }
      }, 10);
    },
    leftAction(params) {
      this.$emit("leftAction", params);
    },
    clickAction(params) {
      this.$emit("clickAction", params);
    },
    rightAction(params) {
      this.$emit("rightAction", params);
    },
    renderRedPot(isLeft) {
      this.leftPot = isLeft ? 1 : 0;
      this.rightPot = isLeft ? 0 : 1;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/public.less";
/* prettier-ignore */
.my-search {
    position: relative;
    z-index: 3;
    min-height: 60PX;
    font-size: 16PX;
    .nail {
      width: 100%;
      padding: 12PX;
      transition: all 0.2s;
      .search-icon {
        width: auto;
        height: 20PX;
        margin-left: 12PX;
        position: relative;
        &:first-child {
          margin-left: 0PX;
          margin-right: 12PX;
        }
        img {
          width: auto;
          height: 20PX;
        }
        .search-icon-pot{
          width: 6PX;
          height: 6PX;
          border-radius: 6PX;
          position: absolute;
          top: -3PX;
          right: -3PX;
          background-color: red;
        }
      }
      .search-bar {
        width: 100%;
        border-radius: 6PX;
        height: 36PX;
        padding: 0PX 12PX;
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.3);
        span {
          &:nth-child(1) {
            margin-right: 6PX;
          }
        }
      }
    }
  }
.reFixed {
  margin-left: 0px !important;
  margin-right: 0px !important;
  position: "-webkit-sticky";
  position: sticky;
  position: fixed;
  top: 0px;
  width: 100%;
}
</style>
