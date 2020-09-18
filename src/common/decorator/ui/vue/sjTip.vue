<template>
  <div class="sjTip top-scroll-off" :class="{ 'top-scroll-on': messageShow }">{{ localMessage }}</div>
</template>

<script>
export default {
  name: "sjTip",
  data() {
    return {
      localMessage: "",
      messageShow: false,
      messageTimer: null,
    };
  },
  methods: {
    toShow(message) {
      if (this.messageTimer) return;
      this.localMessage = message;
      this.messageShow = true;
      this.messageTimer = setTimeout(() => {
        this.messageShow = false;
        clearTimeout(this.messageTimer);
        this.messageTimer = null;
      }, 1200);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/sjUI.scss";
.sjTip {
  position: fixed;
  top: 0rem;
  left: 50%;
  z-index: 999; // modal 998
  color: $sj-back;
  background-color: $sj-main;
  padding: 0.5rem 1rem;
  max-width: 20%;
  border-radius: 0.3rem;
  word-break: break-word;
}
</style>
