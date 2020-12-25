<template>
    <div id="app" class="no-scroll-bar"><router-view /></div>
</template>
<script>
    export default {
        data() {
            return {
                sideList: [
                    { name: '员工管理', icon: 'fa fa-users', type: 'warning' },
                    { name: '库存管理', icon: 'fa fa-home', type: 'success' },
                    { name: '销售开单', icon: 'fa fa-newspaper-o', type: 'info' },
                ],
            }
        },
        methods: {},
        beforeCreate() {},
    }
</script>
<style lang="scss"></style>
