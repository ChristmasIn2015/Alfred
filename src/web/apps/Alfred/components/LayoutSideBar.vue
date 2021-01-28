<template>
    <div class="layout-side flex-y no-scroll-bar">
        <div class="ad">Alfred Beta</div>
        <Button size="small" v-for="(side, index) in sideList" :key="index" :type="sideIndex === index ? side.type : 'default'" @click.stop="pickPath(index)">
            <span :class="side.icon"></span>
            <span>{{ side.name }}</span>
        </Button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                sideIndex: null,
                sideList: [
                    // { name: '本地运维', icon: 'fa fa-handshake-o', type: 'info', path: '/alfred' },
                    { name: '脚本集合', icon: 'fa fa-users', type: 'warning', path: '/cmd' },
                    { name: '笔记系统', icon: 'fa fa-sticky-note', type: 'success', path: '/note' },
                ],
            }
        },
        mounted() {
            this.sideList.forEach((e, i) => (this.$route.path === e.path ? (this.sideIndex = i) : ''))
        },
        methods: {
            pickPath(index) {
                const side = this.sideList[index]
                if (this.$route.path === side.path) return
                if ((side.path === '/note' || side.path === '/cmd') && global.$electron === undefined) {
                    $warn('请在客户端中使用')
                    return
                }
                this.sideIndex = index
                $router.push({ path: side.path })
            },
        },
    }
</script>
<style lang="scss" scoped></style>
