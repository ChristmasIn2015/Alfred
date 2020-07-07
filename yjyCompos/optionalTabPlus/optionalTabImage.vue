<template>
  <div class="my-tab" :style="config.compo.style">
    <!-- 导航 -->
    <div class="tab-list-container" v-show="tabContentList.length > 1">
      <div class="tab-list flex tab-list-round">
        <div
          class="tab"
          :class="{'tab-on' : index === tabIndex }"
          :style="{
            'background-color': tabType === 2 && index === tabIndex ? config.tabs.mainColor : ''
          }"
          v-for="(item, index) in tabContentList"
          :key="index"
          @click.stop="tabAction(item, index)"
        >
          <!-- {{ item.title }} -->
          <div class="line-middle">{{ item.title }}</div>
        </div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="tab-content">
      <!-- *2 推荐切换 -->
      <div :class="getTabListClassName">
        <div
          class="block"
          v-for="(item, _index) in nowRenderList"
          :key="_index"
          :style="{'width': `${roundLengthMapB[mapB] ? (roundLengthMapB[mapB][_index+1] || roundItemWidth) : roundItemWidth}`}"
          @click.stop="itemAction(item)"
        >
          <div class="image-block">
            <img :src="item.url" alt :onerror="defaultHeader" />
            <div class="title text-cut">{{ item.title }}</div>
            <div
              v-show="item.tag"
              class="tag"
              :style="{'background-color': config.tabs.mainColor}"
            >{{ item.tag }}</div>
          </div>
        </div>
      </div>
      <div class="empty-items" v-show="!nowRenderList.length">{{ loaddingMsg }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "optionalTabImage",
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
      /**
       * 【tabType】
       * *0 Tab列表样式
       * *1 Tab推荐位/锚点样式
       * *2 推荐切换样式
       */
      loaddingMsg: "加载中",
      defaultHeader:
        'this.src="http://pic.lvmama.com/uploads/pc/place2/jtour/2020-06-30/jtour_op_sys_1593508573890.png"',
      tabType: 0,
      tabIndex: 0,
      /**
       * 【listStyle】
       * 0 列表 *0 Tab列表样式
       * 1 小图 *0 Tab列表样式 *1 Tab推荐位/锚点样式
       * 2 大图 *0 Tab列表样式
       * 3 瀑布流 *0 Tab列表样式
       * 4 推荐切换样式 *2 推荐切换样式
       */
      listStyle: 0,
      // *0 Tab列表
      tabContentList: [],
      // *2 推荐切换样式 根据列表个数设置不等宽度
      roundItemWidth: "100%",
      roundLengthMapA: {
        1: "100%",
        2: "48.5%",
        3: "31.5%",
        6: "31.5%",
        9: "31.5%"
      },
      mapB: 0,
      roundLengthMapB: {
        defaultWidth: "31.5%",
        4: {
          1: "100%"
        },
        5: {
          1: "48.5%",
          2: "48.5%"
        },
        7: {
          1: "48.5%",
          2: "48.5%",
          6: "48.5%",
          7: "48.5%"
        },
        8: {
          4: "48.5%",
          5: "48.5%"
        }
      }
    };
  },
  computed: {
    // **** 获取当前需要渲染的列表 ****
    nowRenderList() {
      let list = [];
      if (this.tabContentList[this.tabIndex]) {
        list = this.tabContentList[this.tabIndex].list;
        // 当个数是 1/2/3/4/6/9 时，通过设置 roundItemWidth，mapB 使得每个Item为等宽度
        let myWidth = this.roundLengthMapA[list.length];
        if (this.roundLengthMapA[list.length]) {
          this.roundItemWidth = myWidth;
          this.mapB = 0;
        }
        // 当个数是 5/7/8 时，通过设置 roundItemWidth，mapB 使得每个Item为特殊宽度
        if (this.roundLengthMapB[list.length]) {
          this.mapB = list.length;
          this.roundItemWidth = this.roundLengthMapB.defaultWidth;
        }
      }
      if (list.length === 0) this.loaddingMsg = "暂无数据";
      return list;
    },
    // **** 获取列表的样式 ****
    getTabListClassName() {
      /**
       * 【listStyle】
       * 0 列表 *0 Tab列表样式
       * 1 小图 *0 Tab列表样式 *1 Tab推荐位/锚点样式
       * 2 大图 *0 Tab列表样式
       * 3 瀑布流 *0 Tab列表样式
       * 4 推荐切换样式 *2 推荐切换样式
       */
      let className = "list-items";
      switch (this.listStyle) {
        case 0:
          className = "list-items";
          break;
        case 1:
          className = "mini-items";
          break;
        case 2:
          className = "large-items";
          break;
        case 3:
          className = "fall-items";
          break;
        case 4:
          className = "round-items";
          break;
      }
      return className;
    }
  },
  watch: {
    config: {
      handler(val, old) {
        /**
         * 【tabType】
         * *0 Tab列表样式
         * *1 Tab推荐位/锚点样式
         * *2 推荐切换样式
         */
        this.tabType = val.tabs.tabType;
        this.tabContentListRender(val.tabs.list, 4);
      },
      immediate: true
    }
  },
  methods: {
    // **** Watch Emit 被动取得渲染数据 ****
    tabContentListRender(list, listStyle) {
      /**
       * 【listStyle】
       * 0 列表 *0 Tab列表样式
       * 1 小图 *0 Tab列表样式 *1 Tab推荐位/锚点样式
       * 2 大图 *0 Tab列表样式
       * 3 瀑布流 *0 Tab列表样式
       * 4 推荐切换样式 *2 推荐切换样式
       */
      this.listStyle = listStyle;
      /**
       * 【tabType】
       * *0 Tab列表样式
       * *1 Tab推荐位/锚点样式
       * *2 推荐切换样式
       */
      if (this.config.tabs.tabType === 2) {
        list.forEach(e => {
          e.list = e.list.slice(0, 9);
        });
        if (list.length === 0) this.loaddingMsg = "暂无数据";
      }
      this.tabContentList = Object.assign([], list);
    },
    // **** 切换Tab ****
    tabAction(item, index) {
      if (index === this.tabIndex) return;
      // *2 推荐切换
      if (this.tabType === 2) {
        // 当个数是 1/2/3/4/6/9 时，设置每个Item为等宽度
        let indexLength = this.tabContentList[index].list.length;
        let myWidth = this.roundLengthMapA[indexLength];
        if (this.roundLengthMapA[indexLength]) {
          this.roundItemWidth = myWidth;
        }
      }
      this.tabIndex = index;
    },
    // **** 点击产品 Emit ****
    itemAction(item) {
      this.$emit("clickAction", item);
    },
    // 获取产品的类别 * 资讯 * 门票 * 酒店
    getTagName(tag) {
      let name = "";
      switch (tag) {
        case "TICKET":
          name = "门票";
          break;
        case "NEWS":
          name = "资讯";
          break;
        case "HOTEL":
          name = "酒店";
          break;
      }
      return name;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../common/public.less";
@import "tabStyle.less";
@import "tabListStyle.less";
/* prettier-ignore */
.my-tab {
    position: relative;
    z-index: 1;
    // 1.导航条
    .tab-list-container{
      min-height: 40PX;
      .tab-list {
        // margin: 0PX 12PX;
        padding: 6PX 0PX;
        min-height: 40PX;
        overflow-x: auto;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    // 2.具体Tab内容的样式
    .tab-content{
      // * 通用
      .block{
        box-shadow: 0PX 0PX 4PX 1PX rgba(190, 190, 190, 0.5);
        .tag{
          font-size: 12PX;
          color: white;
          background-color: rgba(0,0,0,0.5);
          padding: 4PX 6PX;
          position: absolute;
          top: 0PX;
          left: 0PX;
          border-radius: 6PX 0PX 6PX 0PX;
        }
      }
      .block-nav{
        padding: 12PX;
        div{
          line-height: 18PX;
          font-size: 16PX;
          color: #999999;
          &:first-child{
            font-weight: bold;
            color: black;
          }
        }
      }
      // 具体Tab内容为空的空白样式
      .empty-items{
        padding: 60PX;
        text-align: center;
        color: rgb(102, 102, 102);
      }
    }
  }
</style>
