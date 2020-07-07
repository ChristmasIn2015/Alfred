<template>
  <div class="my-tab" :style="config.compo.style">
    <!-- 导航 -->
    <div class="tab-list-container" v-show="tabContentList.length > 1">
      <div
        class="tab-list flex"
        :style="{'background-color':config.compo.style['background-color'],
          'padding-left': `${reFixed ? config.tabs.reFixedPaddingLeft / 16 : 0}rem`,
          'padding-right': `${reFixed ? config.tabs.reFixedPaddingRight / 16 : 0}rem`,
        }"
        :class="getTabClassName"
      >
        <div
          class="tab"
          :class="{'tab-on' : index === tabIndex }"
          :style="{
            'color':index === tabIndex ? config.tabs.mainColor : '',
          }"
          v-for="(item, index) in tabContentList"
          :key="index"
          @click.stop="tabAction(item, index)"
        >
          <span>{{ item.title }}</span>
          <span
            class="tab-list-nail-icon"
            :style="{'background-color': config.tabs.mainColor,
            'visibility': index === tabIndex ? 'visible' : 'hidden'}"
          ></span>
        </div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="tab-content">
      <div v-for="(mytab, index) in nowRenderList" :key="index">
        <!-- 1.Tab推荐位的标题 -->
        <div
          v-if="mytab.hrefValue"
          class="block-nav flex-side"
          :id="`${mytab.hrefValue}${mytab.hrefIndex}`"
        >
          <div>{{ mytab.hrefValue }}</div>
          <div v-show="mytab.titleLink.linkType" @click.stop="rightAction(mytab.titleLink)">更多 ></div>
        </div>
        <!-- 2.Tab推荐位的列表内容 -->
        <div :class="mytab.listClassName">
          <div
            class="block"
            v-for="(item, _index) in mytab.list"
            :key="_index"
            @click.stop="itemAction(item)"
          >
            <div class="img-block flex-middle">
              <img :src="item.url" alt :onerror="defaultHeader" />
            </div>
            <div class="info-block flex-y flex-side">
              <div class="info-title">{{ item.title }}</div>
              <div class="info-tip flex-side">
                <div v-show="item.price">
                  <span :style="{'color': '#E92424'}">￥</span>
                  <span :style="{'color': '#E92424', 'font-size': '1.2rem'}">{{ item.price }}</span>
                  <span>起</span>
                </div>
                <div v-show="item.tip">{{ item.tip }}</div>
                <div v-show="item.score && item.score !== 'null'">{{ item.score }}分</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 3.到底 -->
        <div class="block-bottom-tip" v-show="mytab.listLimit==='x'">已经到底了</div>
      </div>
      <div class="empty-items" v-show="!nowRenderList.length">{{ loaddingMsg }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "optionalTabNail",
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
      tabTimer: null,
      // *0 Tab列表
      tabContentList: [],
      // *1 Tab推荐位/锚点样式
      tabNailList: [],
      nailTimer: null,
      reFixed: false
    };
  },
  beforeDestroy() {
    // 清除监听器
    if (this.tabType === 1)
      window.removeEventListener("scroll", this.setBarTop);
    window.removeEventListener("scroll", this.setTabIndexByScroll);
  },
  computed: {
    // **** 获取当前需要渲染的列表 ****
    nowRenderList() {
      let list = [];
      if (this.tabNailList.length === 0) {
        for (let i = 0; i < this.tabContentList.length; i++) {
          let block = this.tabContentList[i];
          list.push({
            hrefIndex: i,
            hrefValue: block.title,
            list: block.list,
            listLimit: block.listLimit,
            listClassName: this.getTabListClassNameByType(block.listType),
            titleLink: block.titleLink
          });
        }
      } else {
        list = this.tabNailList;
      }
      return list;
    },
    // **** 获取Tab的样式 ****
    getTabClassName() {
      return `tab-list-nail ${this.reFixed ? "reFixed" : ""}`;
    }
  },
  watch: {
    config: {
      handler(val, old) {
        this.tabType = val.tabs.tabType;
        // * 监听TabNav的吸顶
        if (this.tabType === 1) {
          window.removeEventListener("scroll", this.setBarTop);
          window.addEventListener("scroll", this.setBarTop);
          this.$emit("renderAction", {
            name: "optionalTabNail",
            value: val,
            next: this.tabContentListRender
          });
        }
        // * 监听页面高度且修改TabIndex
        if (val.tabs.reFixed) {
          window.removeEventListener("scroll", this.setTabIndexByScroll);
          window.addEventListener("scroll", this.setTabIndexByScroll);
        }
      },
      immediate: true
    }
  },
  methods: {
    // **** Watch Emit 被动取得渲染数据 ****
    tabContentListRender(list) {
      this.tabContentList = Object.assign([], list);
    },
    // **** 切换Tab ****
    tabAction(item, index) {
      if (index === this.tabIndex) return;
      if (this.tabType === 1) {
        let tabHeight =
          event.target.parentElement.parentElement.parentElement.clientHeight;
        let parentTop =
          event.target.parentElement.parentElement.parentElement.parentElement
            .offsetTop;
        let targetHeight = document.getElementById(`${item.title}${index}`);
        window.scrollTo(0, targetHeight.offsetTop + parentTop - tabHeight);
        // this.$nextTick(() => {
        // window.scrollTo({
        //   top: targetHeight.offsetTop + parentTop - tabHeight,
        //   behavior: "smooth"
        // });
        // });
        // window.location.hash = `#${item.title}${index}`;
      }
      this.tabIndex = index;
    },
    // 这个方法监听页面滚动，当到特定高度时候 重新设置 tabIndex
    setTabIndexByScroll() {
      if (this.tabTimer) clearTimeout(this.tabTimer);
      let _event = event;
      this.tabTimer = setTimeout(() => {
        // 取得视口距离页面顶部的高度值
        let pageAwayTop = _event.target.scrollingElement.scrollTop;
        if (this.config.tabs.reFixed) pageAwayTop += 40;
        // 获取目标标题距离页面顶部的高度
        this.nowRenderList.forEach((e, index) => {
          let target = document.getElementById(`${e.hrefValue}${e.hrefIndex}`);
          let parentTop = this.$el.offsetTop;
          let elementTopValue = target.offsetTop + parentTop;
          if (pageAwayTop >= elementTopValue) {
            this.tabIndex = index;
          }
        });
      }, 10);
    },
    // 这个方法监听页面滚动，用于设置本组件的固钉，需要设置函数节流
    setBarTop(event) {
      if (!this.config.tabs.reFixed) return;
      if (this.tabType !== 1) return;
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
    // **** 点击产品 Emit ****
    itemAction(item) {
      this.$emit("clickAction", item);
    },
    rightAction(data) {
      this.$emit("rightAction", data);
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
    },
    getTabListClassNameByType(type) {
      let className = "list-items";
      switch (type) {
        case "小图":
          className = "mini-items";
          break;
        case "大图":
          className = "list-items";
          break;
        case "列表":
          className = "list-items";
          break;
      }
      return className;
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
      min-height: 30PX;
      .tab-list {
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
        // box-shadow: 0PX 0PX 4PX 1PX rgba(190, 190, 190, 0.5);
        .tag{
          font-size: 12PX;
          color: white;
          padding: 4PX 6PX;
          position: absolute;
          top: 0PX;
          left: 0PX;
          border-radius: 6PX 0PX 6PX 0PX;
        }
      }
      .block-nav{
        padding: 12PX 0PX;
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
      .block-bottom-tip{
        line-height: 50PX;
        text-align: center;
        color: #999999;
      }
      // 具体Tab内容为空的空白样式
      .empty-items{
        padding: 60PX;
        text-align: center;
        color: rgb(102, 102, 102);
      }
    }
    .reFixed {
      margin-left: 0PX !important;
      margin-right: 0PX !important;
      position: '-webkit-sticky';
      position: sticky;
      position: fixed;
      top: 0PX;
      left: 0PX;
      width: 100%;
      z-index: 1;
    }
  }
</style>
