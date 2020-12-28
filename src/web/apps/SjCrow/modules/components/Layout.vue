<template>
    <div class="layout flex">
        <LayoutSideBar />
        <div class="layout-right flex-y">
            <LayoutNav />
            <div class="layout-content no-scroll-bar">
                <!-- 各个模块组件 -->
                <router-view :key="key" />
            </div>
        </div>
    </div>
</template>

<script>
    import LayoutNav from './LayoutNav.vue'
    import LayoutSideBar from './LayoutSideBar.vue'
    export default {
        data() {
            return {}
        },
        computed: {
            key() {
                return this.$route.fullPath
            },
        },
        components: {
            LayoutNav,
            LayoutSideBar,
        },
        methods: {},
    }
</script>

<style lang="scss" scoped></style>
