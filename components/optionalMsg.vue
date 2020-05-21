<template>
  <div>
    <div class="my-msg flex-middle-y" :style="config.compo.style">
      <div class="msg-title">
        <img :src="config.compo.icon" alt />
      </div>
      <swiper :options="config.swiper.option">
        <swiper-slide v-for="(item, index) in config.swiper.list" :key="index">
          <div class="msg-block text-cut" @click.stop="swiperClick(item)">
            {{ item.value }}
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'optionalMsg',
    props: {
      config: {
        type: Object,
        default: {
          compo: {
            icon: '',
            style: {},
          },
          swiper: {
            option: {},
            list: {},
          },
        },
      },
    },
    data() {
      return {}
    },
    methods: {
      swiperClick(item) {
        this.$emit('actionSwiper', item)
      },
    },
  }
</script>

<style lang="less" scoped>
  @import './public.less';
  .my-msg {
    height: 50px;
    .msg-title {
      width: 48px;
      height: 32px;
      overflow: hidden;
      margin-right: 1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-container {
      width: 100%;
      height: 32px;
      .msg-block {
        width: 100%;
        height: 100%;
        line-height: 32px;
      }
    }
  }
</style>
