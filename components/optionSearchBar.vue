<template>
  <div class="my-search" :style="config.compo.style">
    <div class="nail flex-side flex-middle-y" :class="{ reFixed: reFixed }">
      <div v-show="config.left.url" class="search-icon">
        <img :src="config.left.url" alt @click.stop="leftAction(config.left)" />
      </div>
      <div
        v-show="config.center.message"
        class="search-bar flex-middle"
        :style="config.center.style"
        @click.stop="centerAction(config.center)"
      >
        <img class="bar-image" :src="searchIcon" alt />
        <span>{{ config.center.message }}</span>
      </div>
      <div v-show="config.right.url" class="search-icon">
        <img :src="config.right.url" alt @click.stop="rightAction(config.right)" />
      </div>
    </div>
  </div>
</template>

<script>
import icons from "./icon.js";
export default {
  name: "optionalSearchBar",
  props: {
    config: {
      type: Object,
      default() {
        return {
          compo: {},
          left: {},
          center: {},
          right: {}
        };
      }
    }
  },
  data() {
    return {
      nailTimer: null,
      reFixed: false,
      searchIcon: ""
    };
  },
  watch: {
    config: {
      handler(newConfig, old) {
        this.searchIcon = icons.search_icon;
        if (newConfig.compo.fixed) {
          window.removeEventListener("scroll", this.setBarTop);
          window.addEventListener("scroll", this.setBarTop);
        }
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
    centerAction(params) {
      this.$emit("centerAction", params);
    },
    rightAction(params) {
      this.$emit("rightAction", params);
    }
  }
};
</script>

<style lang="less" scoped>
  .my-search {
    min-height: 60PX;
    position: relative;
    z-index: 2; // * 由于固定需求 这里需要再次提升层级
    .nail {
      width: 100%;
      transition: all 1s;
      .search-icon {
        width: 20PX;
        height: 20PX;
        margin: 12PX;
        img {
          width: 20PX;
          height: 20PX;
        }
      }
      .search-bar {
        width: 100%;
        border-radius: 6PX;
        height: 36PX;
        margin: 12PX 0PX;
        color: #ffffff;
        .bar-image {
          width: 20PX;
          height: 20PX;
          margin-right: 6PX;
        }
      }
    }
  }
  .reFixed {
    position: '-webkit-sticky'; // 兼容苹果手机手机滚动吸顶问题
    position: 'sticky';
    position: fixed;
    top: 0PX;
    width: 100%;
  }
</style>
