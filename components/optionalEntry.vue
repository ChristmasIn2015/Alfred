<template>
  <div class="my-entry">
    <div class="entry flex-wrap" :style="config.compo.style">
      <div
        class="entry-card flex-y flex-middle"
        v-for="(item, index) in config.list"
        :key="index"
        @click.stop="entryAction"
      >
        <img :src="item.url" alt />
        <div class="card-tip">{{ item.tip }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "optionalEntry",
  props: {
    config: {
      type: Object,
      default: {
        compo: {},
        list: []
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    entryAction(params) {
      this.$emit("entryAction", params);
    }
  }
};
</script>

<style lang="less" scoped>
  .my-entry {
    position: relative;
    .entry {
      .entry-card {
        width: 16%;
        max-width: 56PX;
        margin: 2%;
        img {
          width: 100%;
          height: 56px;
        }
        .card-tip {
          width: 100%;
          word-wrap: break-word;
          font-family: PingFangSC-Regular;
          color: #303133;
          letter-spacing: 0;
          text-align: center;
          margin-top: 8PX;
        }
        &:nth-child(5n) {
          margin-right: 0px;
        }
      }
    }
  }
</style>
