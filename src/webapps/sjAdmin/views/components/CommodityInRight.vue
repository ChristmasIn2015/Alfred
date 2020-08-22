<template>
    <div class="board-right flex right-scroll-off" :class="{ 'right-scroll-on': boardShow }">
        <div class="left" @click.stop="boardShow = false"></div>
        <div class="right">
            <div class="right-block flex-y">
                <div class="board-title">单位列表</div>
                <div class="table">
                    <div class="row flex">
                        <div class="column">单位名称</div>
                        <div class="column">操作</div>
                    </div>
                    <div class="row flex">
                        <div class="column">
                            <input />
                        </div>
                        <div class="column">
                            <div class="sj-btn blue">新增单位</div>
                        </div>
                    </div>
                </div>
                <div class="block-content flex-wrap">
                    <div v-for="i in 20" class="sj-btn tip-on">{{ (Math.random() * 10).toFixed(4) }}</div>
                </div>
            </div>
            <div class="right-block flex-y">
                <div class="board-title">规格列表</div>
                <div class="table">
                    <div class="row flex">
                        <div class="column">规格名称</div>
                        <div class="column">规格值</div>
                        <div class="column">规格单位</div>
                        <div class="column">操作</div>
                    </div>
                    <div class="row flex">
                        <div class="column">
                            <input />
                        </div>
                        <div class="column">
                            <input />
                        </div>
                        <div class="column">
                            <input />
                        </div>
                        <div class="column">
                            <div class="sj-btn blue">新增规格</div>
                        </div>
                    </div>
                </div>
                <div v-for="i in 3" class="block-content">
                    <div class="sj-btn blue">厚度</div>
                    <div class="flex-wrap">
                        <div v-for="i in 3" class="sj-btn tip-on">{{ (Math.random() * 10).toFixed(4) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // * 这个组件用于展示和选择
    // * 商品单位 * 1
    // * 商品规格 * N
    export default {
        data() {
            return {
                boardShow: false,
            }
        },
        methods: {
            toShow() {
                this.boardShow = true
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import 'boardPublic.scss';
    .board-right {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0rem;
        left: 0rem;
        z-index: 1;
        .left {
            width: 60%;
        }
        .right {
            width: 40%;
            height: 100%;
            overflow-y: auto;
            padding: 0rem 1rem;
            background-color: $sj-tip-higher;
            .right-block {
                .block-content {
                    .sj-btn {
                        margin: 0.5rem;
                        margin-left: 0rem;
                    }
                }
            }
        }
    }
</style>
