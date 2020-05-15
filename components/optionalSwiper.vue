<template>
  <div class="my-swiper" :style="config.compo.style">
    <swiper :options="config.swiper.option">
      <swiper-slide v-for="(item, index) in config.swiper.images" :key="index">
        <div
          class="swiper-block flex-middle"
          :style="config.swiper.style"
          @click.stop="swiperClick(item)"
        >
          <!-- 1.图片 -->
          <img class="block-img" :src="item.url" />
          <!-- 2.文字内容 -->
          <div class="block-info flex-side">
            <!-- 标题 -->
            <div v-show="item.title" class="info-title">
              <div class="text-cut">{{ item.title }}</div>
              <div class="text-cut">{{ item.tip }}</div>
            </div>
            <!-- 右侧图标：一般是播放按钮 -->
            <!-- <div v-show="swiperMediaIcon" class="info-icon">
              <img src="../../../assets/images/mediaPlay.png" alt />
            </div>-->
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "optionalSwiper",
  props: {
    config: {
      type: Object,
      default: {
        swiper: {
          option: {}
        }
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    swiperClick(item) {
      this.$emit("action", item);
    }
  }
};
</script>

<style lang="less" scoped>
  .my-swiper {
    position: relative;
  }
  // 轮播图块
  .swiper-block {
    overflow: hidden;
    background-color: rgba(235, 235, 235, 0.5);
    // 轮播图片
    .block-img {
      height: 100%;
    }
    // 轮播图片信息
    .block-info {
      position: absolute;
      bottom: 0PX;
      left: 0PX;
      width: 100%;
      padding: 0PX 16.13PX 16.13PX;
      align-items: flex-end;
      .info-title {
        width: 70%;
        div {
          color: #ffffff;
          font-size: 12PX;
          opacity: 0.8;
          font-family: PingFangSC-Regular;
          &:first-child {
            opacity: 1;
            margin-bottom: 3PX;
            font-family: PingFangSC-Semibold;
            font-size: 20PX;
          }
        }
      }
      .info-icon {
        width: 28.875PX;
        height: 28.875PX;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
