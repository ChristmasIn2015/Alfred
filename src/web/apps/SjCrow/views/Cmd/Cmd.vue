<template>
    <div class="cmd">
        <div class="cmd-nav flex">
            <Button type="warning" size="small" @click.stop="react.toggleScript($event)">
                <span class="fa fa-user"></span>
                <span>新增脚本</span>
            </Button>
        </div>
        <div class="cmd-content flex-wrap">
            <div
                class="content-script"
                v-for="(script, index) in react.scripts"
                :key="index"
                @contextmenu="react.deleteBat(script)"
                @dblclick="react.toggleScript($event, script)"
            >
                <div class="name">{{ script.name }}</div>
                <div class="path">{{ script.path || '路径异常' }}</div>
                <div class="log no-scroll-bar">{{ script.log || '暂无日志' }}</div>
                <!-- * -->
                <div class="btns flex-x-reverse">
                    <Button v-if="script.status === 1" type="warning" size="small">执行</Button>
                    <Button v-else type="error" size="small">终止</Button>
                </div>
            </div>
        </div>

        <!-- 弹窗 -->
        <Modal v-model="react.scriptModal" :title="react.scriptModel.name ? `编辑${react.scriptModel.name}` : '新增脚本'" width="350">
            <Form label-position="top">
                <FormItem label="脚本名称">
                    <Input v-model="react.scriptModel.name" placeholder="请输入脚本名称" />
                </FormItem>
                <FormItem label="脚本路径">
                    <!-- <Input v-model="react.scriptModel.path" placeholder="请输入脚本路径" /> -->
                    <Button size="small" type="warning" @click.stop="react.pickScript">{{ react.scriptModel.path || '选择文件' }}</Button>
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
    import React from './React.js'
    export default {
        data() {
            return {
                react: new React(),
            }
        },
        mounted() {},
        methods: {},
    }
</script>

<style lang="scss" scoped>
    @import './Cmd.scss';
</style>
