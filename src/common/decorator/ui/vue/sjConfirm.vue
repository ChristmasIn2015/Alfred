<template>
  <div class="sj-modal-back fade-off" :class="{ 'fade-on': modalShow }">
    <div class="modal" style="max-width: 30rem;">
      <div class="title" v-show="title">
        <span>{{ title }}</span>
        <span @click.stop="modalShow = false">✖</span>
      </div>
      <div class="content">{{ content }}</div>
      <div class="btns">
        <div class="sj-btn" @click.stop="postAction(true)">确定</div>
        <div class="sj-btn tip-on" @click.stop="postAction(false)">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sjConfirm",
  data() {
    return {
      title: "",
      content: "",
      modalShow: false,
      nextPointer: null,
    };
  },
  methods: {
    show(option, next) {
      this.title = option.title || "";
      this.content = option.content || "";
      this.nextPointer = next;
      this.modalShow = true;
    },
    postAction(bool) {
      if (this.nextPointer) {
        this.nextPointer(bool);
      }
      this.modalShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/sjUI.scss";
</style>
