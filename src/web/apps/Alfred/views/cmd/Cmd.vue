<template>
    <div>
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <div>
            <v-btn class="mr-2" color="orange" @click.stop="react.toggleCmdModal($event)">新增CMD</v-btn>
            <v-btn class="mr-2" color="orange" @click.stop="react.renderCmdList">清空日志/刷新</v-btn>
            <v-btn color="green" @click.stop="react.openLocalDevTool">打开控制台</v-btn>
        </div>
        <!-- List -->
        <!-- List -->
        <!-- List -->
        <!-- List -->
        <draggable v-model="react.cmds" class="mt-2 d-flex flex-wrap" @end.stop="react.sortCmds">
            <v-card
                class="ma-1"
                width="256"
                v-for="(cmd, i) in react.cmds"
                :key="i"
                @contextmenu.prevent="react.deleteCmd(cmd)"
                @dblclick="react.toggleCmdModal($event, cmd)"
            >
                <v-card-title>{{ cmd.name }}</v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-if="cmd.pid" dark color="red" @click.stop="react.killCmd(i, cmd.pid)">终止{{ cmd.pid }}</v-btn>
                    <v-btn v-else dark color="orange" @click.stop="react.excuteCmd(i, cmd)">执行</v-btn>
                    <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="ml-1" color="primary" v-show="cmd.log" v-bind="attrs" v-on="on">查看日志</v-btn>
                        </template>
                        <span style="height: 500px; overflow: scroll;" v-html="cmd.log"></span>
                    </v-tooltip>
                </v-card-actions>
            </v-card>
        </draggable>
        <!-- 新增/编辑远程命令的弹窗 -->
        <!-- 新增/编辑远程命令的弹窗 -->
        <!-- 新增/编辑远程命令的弹窗 -->
        <!-- 新增/编辑远程命令的弹窗 -->
        <v-dialog v-model="react.cmdModal" persistent width="500">
            <v-card>
                <v-card-title>远程命令</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field v-model="react.cmdModel.name" label="本地命令名称" hint="请输入命令名称" />
                        <v-textarea v-model="react.cmdModel.command" outlined label="本地命令内容" />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click.stop="react.toggleCmdModal($event)">取消</v-btn>
                    <v-btn color="green" dark @click.stop="react.cmdModalAction">{{ react.cmdModel._id ? `编辑` : '新增本地命令' }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'
    import ReactCmd from './React.js'
    export default {
        data() {
            return {
                react: new ReactCmd(),
            }
        },
        methods: {},
        beforeCreate() {},
        components: { draggable },
    }
</script>
<style lang="scss" scoped></style>
