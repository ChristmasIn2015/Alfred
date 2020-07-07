<template>
  <div :style="config.yjyCompoStyle">
    <!-- 1 -->
    <div>
      <sjSwiperX :config="config" @clickAction="clickAction" />
    </div>
  </div>
</template>

<script>
import sjSwiperX from "../common/sjSwiperX.vue";
export default {
  name: "optionalSwiper",
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          pots: false,
          imageRate: 1,
          gap: 0,
          auto: false,
          images: []
        };
      }
    }
  },
  data() {
    return {};
  },
  components: {
    sjSwiperX
  },
  methods: {
    clickAction(data) {
      this.$emit("clickAction", data);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/public.less";
</style>
