<template>
    <div id="app"></div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            $common.fetch('http://10.52.2.35:80/sjShop/error/list').then((res) => console.log(res.data))
        },
    }
</script>
<style></style>
