<template>
    <div class="layout">
        <LayoutSideBar />
        <div class="layout-content">
            <LayoutNav />
            <div class="content">
                <router-view />
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
        components: {
            LayoutNav,
            LayoutSideBar,
        },
        methods: {},
    }
</script>

<style lang="scss" scoped></style>
