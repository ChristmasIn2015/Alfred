<template>
    <div class="index"></div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        computed: {
            userInfo() {
                let info = this.$store.getters.getUserInfo
                return info
            },
        },
        created() {},
        method: {
            init() {},
        },
    }
</script>

<style lang="scss" scoped>
    .index {
    }
</style>
