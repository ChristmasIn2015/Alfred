<template>
  <div class="index flex-side flex-middle-y" :style="config.compo.style">
    <!-- A 标题 -->
    <div
      class="index-title flex-middle-y"
      :style="{'width': config.subTitle.link.show ? '80%;' : '100%'}"
    >
      <!-- Icon -->
      <span :style="config.title.icon.style"></span>
      <!-- 主标题 -->
      <span class="text-cut" :style="config.title.style">{{ config.title.value }}</span>
      <!-- 副标题 -->
      <span
        class="text-cut"
        v-show="config.subTitle.value"
        :style="config.subTitle.style"
      >{{ config.subTitle.value }}</span>
    </div>
    <!-- B 链接 -->
    <div
      class="index-link"
      v-show="config.subTitle.link.show"
      :style="config.subTitle.style"
      @click.stop="clickAction"
    >更多 ></div>
  </div>
</template>

<script>
export default {
  name: "optionalTitle",
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    clickAction() {
      let data = this.config.subTitle.link.info;
      this.$emit("rightAction", data);
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
  .index-title {
    width: 80%;
    span {
      width: 100%;
      &:nth-child(3) {
        text-align: right;
      }
    }
  }
  .index-link {
    word-break: normal;
    font-family: PingFangSC-Regular;
    text-align: right;
    letter-spacing: 0;
  }
}
</style>
