<template>
  <div class="my-entry" :style="config.compo.style">
    <div
      class="entry flex-wrap"
      :style="{'justify-content': config.entrys.list.length === 3 ? 'space-between':'flex-start'}"
    >
      <div
        class="entry-card flex-y"
        :style="config.entrys.style"
        v-for="(item, index) in config.entrys.list"
        :key="index"
        @click.stop="myClickAction(item)"
      >
        <img :src="item.url" alt :onerror="defaultHeader" />
        <div class="card-tip">{{ item.title }}</div>
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
      default: () => {
        return {
          compo: {},
          entrys: {
            list: [],
            style: {}
          }
        };
      }
    }
  },
  data() {
    return {
      defaultHeader:
        'this.src="http://pic.lvmama.com/uploads/pc/place2/jtour/2020-06-30/jtour_op_sys_1593508573890.png"'
    };
  },
  methods: {
    myClickAction(params) {
      this.$emit("clickAction", params);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/public.less";
.my-entry {
  position: relative;
  min-height: 40px;
  .entry {
    .entry-card {
      width: 18%;
      margin: 12px 1%;
      img {
        width: 85%;
        margin: 0 auto;
      }
      .card-tip {
        width: 100%;
        word-wrap: break-word;
        font-family: PingFangSC-Regular;
        color: #303133;
        letter-spacing: 0;
        text-align: center;
        margin-top: 8px;
      }
    }
  }
}
</style>
