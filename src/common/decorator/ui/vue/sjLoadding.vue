<template>
  <div class="sj-load" :class="{ 'page-on': loadShow }">
    <div class="load" :style="{'color': mainColor}">
      <span class="fa fa-refresh"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadShow: false,
      mainColor: "#27b495",
    };
  },
  methods: {
    show(color) {
      if (color) this.mainColor = color;
      this.loadShow = true;
    },
    hide() {
      this.loadShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.sj-load {
  visibility: hidden;
  position: fixed;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  z-index: 999;
  .load {
    width: 3rem;
    line-height: 3rem;
    font-size: 1.5rem;
    text-align: center;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0px 0px 10px 2px #e2e2e2;
    //
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    //
    transition: all 0.2s;
    .fa {
      animation: spin 1s infinite;
    }
  }
}
.page-on {
  visibility: visible;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
