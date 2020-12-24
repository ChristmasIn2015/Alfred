<template>
    <div class="container">
        <div class="container">
            <div class="side flex-y">
                <div class="ad"></div>
                <Button
                    size="small"
                    v-for="(side, index) in react.sideList"
                    :key="index"
                    :type="react.sideIndex === index ? side.type : 'default'"
                    @click.stop="react.pickSide(index)"
                >
                    <span :class="side.icon"></span>
                    <span>{{ side.name }}</span>
                </Button>
            </div>
            <div class="container-board">
                <div class="nav">
                    <!-- 登录按钮 -->
                    <Button :type="userInfo._id ? 'default' : 'primary'" size="small" @click.stop="react.reLogin">
                        <span class="fa fa-user"></span>
                        <span>{{ userInfo._id ? userInfo.name : '点击登录' }}</span>
                    </Button>
                </div>
                <div class="container-board-content">
                    <!-- <Employee v-if="react.sideIndex === 0" />
                    <House v-if="react.sideIndex === 1" />
                    <Order v-if="react.sideIndex === 2" /> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {},
    }
</script>
<style lang="scss" scoped>
    .container {
    }
</style>
