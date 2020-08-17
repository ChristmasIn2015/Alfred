<template>
  <div id="app" class="flex">
    <router-view />
  </div>
</template>
<script>
import { shopUserLogin } from "@/common/api/shop_apis.js";
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      try {
        let info = await shopUserLogin(-1, "Wqao", "974879409", "974879409");
        localStorage["sjShopToken"] = info.authorization;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss"></style>
