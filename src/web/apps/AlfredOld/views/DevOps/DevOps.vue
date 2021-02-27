<template>
    <div class="cmd">
        <div class="cmd-nav flex">
            <Button v-if="react.ws_key" type="info" size="small" @click.stop="react.toggleCmd($event)">
                <span class="fa fa-user"></span>
                <span>新增CMD</span>
            </Button>
            <Button type="info" size="small" @click.stop="react.initReact">
                <span>刷新</span>
            </Button>
        </div>
        <draggable v-model="react.cmds" class="cmd-content flex-wrap" @end="reactTo('sortCmds')">
            <div
                class="content-script flex-y"
                v-for="(remoteCmd, index) in react.cmds"
                :key="index"
                @contextmenu="react.deleteCmd(remoteCmd, true)"
                @dblclick="react.toggleCmd($event, remoteCmd)"
            >
                <div class="name">{{ remoteCmd.name }}</div>
                <div class="log no-scroll-bar" v-html="remoteCmd.log"></div>
                <div class="btns flex-x-reverse">
                    <Button v-if="remoteCmd.pid" type="error" size="small" @click.stop="react.killRemoteCmd(remoteCmd._id)">终止:{{ remoteCmd.pid }}</Button>
                    <Button v-else type="info" size="small" @click.stop="react.excuteRemoteCmd(index)">执行</Button>
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
                <Button type="info" @click.stop="react.commitCmd(true)">确定</Button>
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
    @import './DevOps.scss';
</style>
