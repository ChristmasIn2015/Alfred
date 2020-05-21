<template>
  <div>
    <!-- 1 -->
    <div v-if="!config.swiper.option.threeAD">
      <div class="my-swiper" :style="config.compo.style">
        <swiper :options="config.swiper.option">
          <swiper-slide
            v-for="(item, index) in config.swiper.images"
            :key="index"
          >
            <div
              class="swiper-block flex-middle"
              :style="config.swiper.style"
              @click.stop="swiperClick(item)"
            >
              <img class="block-img" :src="item.url" />
              <div class="block-info flex-side">
                <div v-show="item.title" class="info-title">
                  <div class="text-cut">{{ item.title }}</div>
                  <div class="text-cut">{{ item.tip }}</div>
                </div>
                <div v-show="item.linkType === 'video'" class="info-icon">
                  <img :src="mediaIcon" alt />
                </div>
              </div>
            </div>
          </swiper-slide>
          <div
            v-show="config.swiper.option.pagination"
            class="swiper-pagination"
            slot="pagination"
          ></div>
        </swiper>
      </div>
    </div>
    <!-- 2 -->
    <div v-else>
      <div class="threeAD" :style="config.compo.style">
        <div class="ad-content flex-side">
          <div
            class="ad"
            v-for="(item, index) in imagesHandled"
            :key="index"
            @click.stop="swiperClick(item)"
          >
            <img :src="item.url" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import icons from './icon.js'
  export default {
    name: 'optionalSwiper',
    props: {
      config: {
        type: Object,
        default: {
          swiper: {
            option: {},
          },
        },
      },
    },
    data() {
      return {
        imagesHandled: [],
        mediaIcon: icons.media_icon,
      }
    },
    watch: {
      config: {
        handler(obj, old) {
          if (!obj.swiper.option.threeAD) return
          let list = obj.swiper.images
          let tempList = [{}, {}, {}]
          for (let i = 0; i < 3; i++) {
            if (!list[i]) break
            tempList[i] = list[i]
          }
          this.imagesHandled = Object.assign([], tempList)
        },
        immediate: true,
      },
    },
    methods: {
      swiperClick(item) {
        console.log('swiper emit')
        this.$emit('actionSwiper', item)
      },
    },
  }
</script>

<style lang="less" scoped>
  @import './public.less';
  .my-swiper {
    position: relative;
  }
  // 轮播图块
  .swiper-block {
    overflow: hidden;
    background-color: rgba(175, 175, 175, 0.5);
    // 轮播图片
    .block-img {
      height: 100%;
    }
    // 轮播图片信息
    .block-info {
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      padding: 0px 16.13px 16.13px;
      align-items: flex-end;
      .info-title {
        width: 70%;
        div {
          color: #ffffff;
          font-size: 12px;
          opacity: 0.8;
          font-family: PingFangSC-Regular;
          &:first-child {
            opacity: 1;
            margin-bottom: 3px;
            font-family: PingFangSC-Semibold;
            font-size: 20px;
          }
        }
      }
      .info-icon {
        width: 28.875px;
        height: 28.875px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  // AD three
  .threeAD {
    padding: 6px;
    position: relative;
  }
  .ad-content {
    align-items: flex-start;
    .ad {
      width: 107px;
      height: 126px;
      overflow: hidden;
      border: 1px solid rgb(241, 241, 241);
      img {
        width: 100%;
      }
    }
  }
</style>
