<template>
  <div class="my-title flex-middle-y" :style="config.compo.style">
    <div class="part part-icon" :style="config.icon.style"></div>
    <div class="part text-cut" :style="config.title.style">{{ config.title.value }}</div>
    <div class="part text-cut tip" :style="config.tip.style">{{ config.tip.value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang='less' scoped>
.my-title{
  padding: 12PX;
  position:relative;
  .part{
    width: 40%;
    font-family: PingFangSC-Medium;
  }
  .part-icon {
    width: 4PX;
    margin-right: 10px;
  }
  .tip{
    font-family: PingFangSC-Regular;
    color: #999999;
    letter-spacing: 0;
    text-align: right;
    margin-left: auto;
  }
}
</style>
