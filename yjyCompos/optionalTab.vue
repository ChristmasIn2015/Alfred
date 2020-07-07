<template>
  <div class="my-tab" :style="config.compo.style">
    <!-- 导航 -->
    <div class="tab-nav" v-show="messageList.length>1">
      <div class="tab-list">
        <div
          class="tab"
          v-for="(tabValue, index) in messageList"
          :key="index"
          :style="tabIndex === index ? config.tabs.tabStyle : ''"
          @click.stop="tabRender(tabValue, index)"
        >{{ tabValue.title }}</div>
      </div>
      <!-- 导航阴影 -->
      <!-- <div v-show="config.tabs.list.length > 4" class="tab-shadow"></div> -->
    </div>
    <!-- 内容 -->
    <div :style="config.tabs.contentStyle">
      <div
        class="tab-content"
        :style="{
          'background-color': messageTitleBackType === 'color' ? messageTitleBackValue : '',
          'background-image': messageTitleBackType === 'image' ? `url(${messageTitleBackValue})` : ''
        }"
      >
        <div class="con-title">
          <span>{{ messageTitle }}</span>
          <div
            v-show="messageTitleInfo && messageTitleInfo.linkType"
            class="con-title-link"
            v-html="'&gt'"
            @click.stop="clickAction(messageTitleInfo)"
          ></div>
        </div>
        <div class="flex-side flex-wrap">
          <div
            class="con-card flex-middle-x"
            v-for="(item, index) in nowRenderList"
            :key="item.id"
            @click.stop="clickAction(item)"
          >
            <div class="card-info">
              <div class="text-cut-line2">{{ item.title }}</div>
              <div class="text-cut-line2" v-show="index === 3">{{ item.tip }}</div>
            </div>
            <img :src="item.url" alt :onerror="defaultHeader" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "optionalTab",
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          compo: {},
          tabs: {}
        };
      }
    }
  },
  data() {
    return {
      defaultHeader:
        'this.src="http://pic.lvmama.com/uploads/pc/place2/jtour/2020-06-30/jtour_op_sys_1593508573890.png"',
      tabIndex: 0,
      messageTitle: "",
      messageTitleInfo: null,
      messageTitleBackType: "",
      messageTitleBackValue: "",
      messageList: []
    };
  },
  computed: {
    nowRenderList() {
      let list = [];
      let target = this.messageList[this.tabIndex];
      if (target) {
        this.messageTitle = target.title;
        this.messageTitleInfo = target.titleLink || null;
        this.messageTitleBackType = target.titleBackType;
        this.messageTitleBackValue = target.titleBackValue;
        list = target.list;
      }
      return list;
    }
  },
  watch: {
    config: {
      handler(val, old) {
        this.$emit("renderAction", {
          name: "optionalTab",
          value: val,
          next: this.renderFourMessage
        });
      },
      immediate: true
    }
  },
  methods: {
    clickAction(item) {
      this.$emit("clickAction", item);
    },
    tabRender(tabValue, index) {
      if (index === this.tabIndex) return;
      this.tabIndex = index;
    },
    renderFourMessage(list) {
      this.messageList = Object.assign([], list);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/public.less";
/* prettier-ignore */
.my-tab {
  position: relative;
  border-radius: 6PX;
  overflow: hidden;
  // 1.
  .tab-nav {
    position: relative;
    border-radius: 6PX;
    .tab-list {
      margin: 12PX 0PX;
      height: 44PX;
      overflow-x: auto;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      white-space: nowrap;
      .tab {
        margin-right: 12PX;
        display: inline-block;
        min-width: 20%;
        height: 44PX;
        line-height: 44PX;
        text-align: center;
        border-radius: 6PX;
        background-color: rgb(241, 241, 241);
        color: #666666;
        transition: all 0.2s;
        &:nth-child(1) {
          margin-left: 12PX;
        }
      }
    }
    .tab-shadow {
      background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
      );
      width: 10%;
      height: 100%;
      border-radius: 6PX;
      top: 0PX;
      right: 20PX;
      position: absolute;
    }
  }
  // 2.
  .tab-content {
    padding: 12PX;
    border-radius: 6PX;
    min-height: 200PX;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    .con-title {
      color: white;
      margin: 12PX 0PX 24PX;
      position: relative;
      font-size: 20PX;
      line-height: 20PX;
      .con-title-link{
        position: absolute;
        top: 0PX;
        right: -12PX;
        width: 32PX;
        font-size: 16PX;
        padding-left: 12PX;
        border-radius: 20PX 0PX 0PX 20PX;
        background-color: rgba(255, 255, 255, 0.5);
      }
    }
    .con-card {
      width: 30%;
      height: 130PX;
      margin-bottom: 12PX;
      border-radius: 6PX;
      overflow: hidden;
      position: relative;
      img {
        height: 100%;
      }
      .card-info {
        position: absolute;
        font-size: 14PX;
        line-height: 18PX;
        color: white;
        bottom: 0PX;
        margin-bottom: 6PX;
        padding: 0PX 8PX;
        width: 100%;
      }
      &:nth-child(4) {
        width: 100%;
        height: 100PX;
        margin: 0PX;
        justify-content: space-between;
        padding: 8PX 8PX 8PX 0PX;
        background-color: white;
        .card-info {
          position: relative;
          div {
            height: 36PX;
            color: grey;
            &:first-child {
              margin-bottom: 8PX;
              font-size: 16PX;
              color: black;
            }
          }
        }
      }
    }
  }
}
</style>
