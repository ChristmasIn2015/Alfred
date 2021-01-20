<template>
    <div class="cmd">
        <div class="cmd-nav flex">
            <Button type="warning" size="small" @click.stop="react.toggleCmd($event)">
                <span class="fa fa-user"></span>
                <span>新增CMD</span>
            </Button>
        </div>
        <draggable v-model="react.cmds" class="cmd-content flex-wrap" @end="reactTo('sortCmds')">
            <div
                class="content-script flex-y"
                v-for="(localCmd, index) in react.cmds"
                :key="index"
                @contextmenu="react.deleteCmd(localCmd)"
                @dblclick="react.toggleCmd($event, localCmd)"
            >
                <div class="name">{{ localCmd.name }}</div>
                <div class="log no-scroll-bar" v-html="localCmd.log"></div>
                <!-- * -->
                <div class="btns flex-x-reverse">
                    <Button v-if="localCmd.pid" type="error" size="small" @click.stop="react.killLocalCmd(localCmd.pid)">终止:{{ localCmd.pid }}</Button>
                    <Button v-else type="warning" size="small" @click.stop="react.excuteLocalCmd(index)">执行</Button>
                </div>
            </div>
        </draggable>

        <!-- 弹窗 -->
        <Modal v-model="react.cmdModal" :title="react.cmdModel.name ? `编辑${react.cmdModel.name}` : '新增CMD'" width="700">
            <Form label-position="top">
                <FormItem label="CMD名称">
                    <Input v-model="react.cmdModel.name" placeholder="请输入CMD名称" />
                </FormItem>
                <FormItem label="CMD命令">
                    <Input v-model="react.cmdModel.cmdString" type="textarea" placeholder="请输入CMD命令" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.toggleCmd($event)">取消</Button>
                <Button type="warning" @click.stop="react.commitCmd(false)">确定</Button>
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
