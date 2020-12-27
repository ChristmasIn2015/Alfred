<template>
    <div class="cmd">
        <div class="cmd-nav flex">
            <Button type="warning" size="small">
                <span class="fa fa-user"></span>
                <span>新增脚本</span>
            </Button>
        </div>
        <Collapse v-model="cmdIndex">
            <Panel v-for="(cmd, index) in cmds" :key="index" :name="index.toString()">
                {{ cmd.name }}
                <div slot="content" class="flex-wrap">
                    <div class="cmd-script" v-for="(script, _index) in cmd.list" :key="_index">
                        <div class="script-name">{{ script.name }}</div>
                        <div class="script-origin">{{ script.origin }}</div>
                        <div class="script-log no-scroll-bar">{{ script.log || '暂无日志' }}</div>
                        <div class="script-btns flex-x-reverse">
                            <Button v-show="script.status === 0" type="warning" size="small">执行</Button>
                            <Button v-show="script.status === 1" type="error" size="small">终止</Button>
                            <Button v-show="script.status === 0" type="default" size="small">编辑</Button>
                        </div>
                    </div>
                </div>
            </Panel>
        </Collapse>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cmds: [
                    {
                        name: 'Host切换',
                        list: [
                            { name: '我的脚本', origin: 'C://AAAA//bvvv.js', log: '执行中...', status: 1 },
                            { name: '我的脚本', origin: 'C://AAAA//bvvv.js', log: '', status: 0 },
                        ],
                    },
                    {
                        name: '数据服务',
                        list: [
                            { name: '我的脚本', origin: 'C://AAAA//bvvv.js', log: '', status: 0 },
                            { name: '我的脚本', origin: 'C://AAAA//bvvv.js', log: '执行中', status: 1 },
                        ],
                    },
                ],
                cmdIndex: '0',
            }
        },
        mounted() {},
        methods: {},
    }
</script>

<style lang="scss" scoped>
    .cmd {
        .cmd-nav {
            margin-bottom: 1rem;
        }
        .cmd-script {
            box-shadow: 1px 1px 1px 1px $shadow;
            background-color: $back-1;
            margin: 0.5rem 1rem 0 0;
            width: 15rem;
            max-width: 15rem;
            padding: 0.5rem;
            border-radius: 0.25rem;
            .script-name {
                font-size: 1rem;
                color: $font-0;
            }
            .script-log {
                max-height: 10rem;
                overflow-y: scroll;
                margin: 0.5rem 0;
            }
            .script-btns {
                .ivu-btn {
                    margin-left: 0.5rem;
                    &:last-child {
                        margin-left: 0;
                        margin-right: auto;
                    }
                }
            }
        }
    }
</style>
