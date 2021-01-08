<template>
    <div class="cmd">
        <div class="cmd-nav flex">
            <Button type="warning" size="small" @click.stop="react.toggleScript($event)">
                <span class="fa fa-user"></span>
                <span>新增CMD</span>
            </Button>
        </div>
        <draggable v-model="react.scripts" class="cmd-content flex-wrap" @end="reactTo('sortCmds')">
            <div
                class="content-script flex-y"
                v-for="(script, index) in react.scripts"
                :key="index"
                @contextmenu="react.deleteBat(script)"
                @dblclick="react.toggleScript($event, script)"
            >
                <div class="name">{{ script.name }}</div>
                <!-- <div class="path">{{ script.path || '路径异常' }}</div> -->
                <div class="log no-scroll-bar" v-html="script.log"></div>
                <!-- * -->
                <div class="btns flex-x-reverse">
                    <Button v-if="script.running" type="error" size="small">终止</Button>
                    <Button v-else type="warning" size="small" @click.stop="react.excuteCMD(index)">执行</Button>
                </div>
            </div>
        </draggable>

        <!-- 弹窗 -->
        <Modal v-model="react.scriptModal" :title="react.scriptModel.name ? `编辑${react.scriptModel.name}` : '新增CMD'" width="700">
            <Form label-position="top">
                <FormItem label="CMD名称">
                    <Input v-model="react.scriptModel.name" placeholder="请输入CMD名称" />
                </FormItem>
                <FormItem label="CMD命令">
                    <Input v-model="react.scriptModel.path" type="textarea" placeholder="请输入CMD命令" />
                    <!-- <Button size="small" type="warning" @click.stop="react.pickScript">{{ react.scriptModel.path || '选择文件' }}</Button> -->
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.toggleScript($event)">取消</Button>
                <Button type="warning" @click.stop="react.commitMyScript">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    // 拖拽
    import draggable from 'vuedraggable'
    import React from './React.js'
    export default {
        data() {
            return {
                react: new React(),
            }
        },
        components: { draggable },
        methods: {
            reactTo(methodName, params) {
                this.react[methodName](params)
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import './Cmd.scss';
</style>
