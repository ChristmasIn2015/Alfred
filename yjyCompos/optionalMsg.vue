<template>
  <div>
    <div class="my-msg flex-middle-y common-shadow" :style="config.yjyCompo.style">
      <div class="msg-title">
        <img :src="config.yjyCompo.icon" alt :onerror="defaultHeader" />
      </div>
      <div class="msg-bar">
        <sjSwiperY :config="swiperConfig" @clickAction="myClickAction" />
      </div>
    </div>
  </div>
</template>

<script>
import sjSwiperY from "../common/sjSwiperY.vue";
export default {
  name: "optionalMsg",
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
      defaultHeader:
        'this.src="http://pic.lvmama.com/uploads/pc/place2/jtour/2020-06-30/jtour_op_sys_1593508573890.png"',
      swiperConfig: {
        images: []
      }
    };
  },
  watch: {
    config: {
      handler(val, old) {
        this.$emit("renderAction", {
          name: "optionalMsg",
          value: val,
          next: this.renderMessageList
        });
      },
      immediate: true
    }
  },
  components: {
    sjSwiperY
  },
  methods: {
    myClickAction(data) {
      this.$emit("clickAction", data);
    },
    renderMessageList(list) {
      this.swiperConfig = Object.assign(
        {},
        { images: list, style: this.config.swiper.style }
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/public.less";
/* prettier-ignore */
.my-msg {
    height: 50PX;
    padding: 12PX;
    .msg-title {
      img {
        width: auto;
        height: 26PX;
      }
    }
    .msg-bar {
      width: 100%;
      margin-left: 12PX;
    }
  }
</style>
