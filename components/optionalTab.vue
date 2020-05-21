<template>
  <div class="my-tab" :style="config.compo.style">
    <!-- 导航 -->
    <div class="tab-list flex">
      <div
        class="tab"
        v-for="(item, index) in config.tabs.list"
        :key="index"
        :class="{ 'tab-on': tabIndex === index }"
        @click.stop="tabAction(item, index)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 内容 -->
    <div class="tab-content">
      {{ tempValue + '-' + config.tabs.list[tabIndex] }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'optionalTab',
    props: {
      config: {
        type: Object,
        default: {
          compo: {},
          tabs: {},
        },
      },
    },
    data() {
      return {
        tabIndex: 0,
        tempValue: '',
      }
    },
    computed: {},
    methods: {
      tabAction(item, index) {
        this.tabIndex = index
        this.$emit('tabAction', { index, item, next: this.renderADs })
      },
      renderADs(params) {
        this.tempValue = params
      },
    },
  }
</script>

<style lang="less" scoped>
  @import "./public.less";
  .my-tab {
    padding: 12px;
    // 1.
    .tab-list {
      margin: 10px 0px;
      overflow: auto;
      .tab {
        border-radius: 2px;
        padding: 15px 20px;
        background-color: #f6f6f6;
        color: #666;
        margin-right: 6px;
      }
      .tab-on {
        background-color: rgba(255, 175, 30, 0.2);
      }
    }
    // 2.
    .tab-content {
      border-radius: 2px;
      min-height: 300px;
    }
  }
</style>
