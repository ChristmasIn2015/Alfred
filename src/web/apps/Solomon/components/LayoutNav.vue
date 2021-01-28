<template>
    <div class="layout-nav flex-middle-y flex-x-reverse">
        <!-- 登录按钮 -->
        <Button type="default" size="small">
            <span class="fa fa-user"></span>
            <span @click.stop="openMyDevTool">打开控制台</span>
        </Button>
    </div>
</template>
<script>
    import { openDevTool } from '../modules/api.js'
    export default {
        data() {
            return {}
        },
        methods: {
            openMyDevTool() {
                openDevTool()
            },
        },
    }
</script>
<style lang="scss" scoped></style>
