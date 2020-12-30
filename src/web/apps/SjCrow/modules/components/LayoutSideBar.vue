<template>
    <div class="layout-side flex-y no-scroll-bar">
        <div class="ad"></div>
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
                    // { name: '工作流', icon: 'fa fa-newspaper-o', type: 'info', path: '/flow' },
                    // { name: '脚本集合', icon: 'fa fa-users', type: 'warning', path: '/cmd' },
                    { name: '笔记系统', icon: 'fa fa-home', type: 'success', path: '/note' },
                ],
            }
        },
        mounted() {
            this.sideList.forEach((e, i) => (this.$route.path === e.path ? (this.sideIndex = i) : ''))
        },
        methods: {
            pickPath(index) {
                console.log($electron)
                const side = this.sideList[index]
                if (this.$route.path === side.path) return
                this.sideIndex = index
                $router.push({ path: side.path })
            },
        },
    }
</script>
<style lang="scss" scoped></style>
