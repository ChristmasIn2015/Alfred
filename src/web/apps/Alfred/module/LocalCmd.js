export default function LocalCmd(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * params
        this.cmds = []
        this.cmdModal = false
        this.cmdModel = {
            _id: null,
            name: '',
            command: '',
        }
        //
        // * function
        this.openLocalDevTool = openLocalDevTool
        this.toggleCmdModal = toggleCmdModal
        this.renderCmdList = renderCmdList
        this.cmdModalAction = cmdModalAction
        this.deleteCmd = deleteCmd
        this.excuteCmd = excuteCmd
        this.killCmd = killCmd
        //
        this.sortCmds = sortCmds
        // *
        sourceFunction.apply(this, arguments)
    }
}
import { openDevTool } from './api_electron.js'
// 展开控制台
function openLocalDevTool() {
    openDevTool()
}
// 展开本地CMD的Modal
function toggleCmdModal(event, CmdModelEdit) {
    this.cmdModal = !this.cmdModal
    this.cmdModel = CmdModelEdit
        ? {
              _id: CmdModelEdit._id,
              name: CmdModelEdit.name,
              command: CmdModelEdit.command,
          }
        : {
              _id: null,
              name: '',
              command: '',
          }
}
import { getLocalCmdList, commitLocalCmd, deleteLocalCmd } from './api_electron.js'
// 渲染本地CMD列表
async function renderCmdList() {
    let list = await getLocalCmdList()

    // **** 本地添加排序功能 ****
    let map = {
        max: 0,
    }
    if (localStorage['cmdSortMap']) {
        map = JSON.parse(localStorage['cmdSortMap'])
        list = list.map((e) => {
            let index = map[e.id || e._id] || 0
            return Object.assign({ index }, e)
        })
    } else {
        localStorage['cmdSortMap'] = JSON.stringify(map)
    }
    list.sort(function(pre, next) {
        return pre.index - next.index
    })
    // **** 本地添加排序功能 End ****

    this.cmds = Object.assign(
        [],
        list.map((e) => {
            return { _id: e.id, name: e.name, command: e.cmdString }
        })
    )
}
// 新增/编辑本地CMD
async function cmdModalAction() {
    await commitLocalCmd({
        id: this.cmdModel._id,
        name: this.cmdModel.name,
        cmdString: this.cmdModel.command,
    })
    await this.renderCmdList()
    this.cmdModal = false
}
// 删除本地CMD
function deleteCmd(cmd) {
    $confirm('警告', `您确定要删除 ${cmd.name} 吗?`, async (answer) => {
        if (!answer) return
        await deleteLocalCmd(cmd._id)
        await this.renderCmdList()
    })
}
function excuteCmd(logListIndex, cmd) {
    this.cmds[logListIndex].log = '<div color="red">发送执行命令中</div>'

    // 1.清空接收器
    $electron.ipcRenderer.removeAllListeners('excuteLocalCmd')
    // 2.注册接收器
    $electron.ipcRenderer.on('excuteLocalCmd', (event, CmdAnswer) => {
        let target = this.cmds[logListIndex]
        if (target) {
            target.pid = CmdAnswer.pid
            target.log += CmdAnswer.html
            this.cmds = Object.assign([], this.cmds)
        }
    })
    // 3.发送执行命令
    $electron.ipcRenderer.send('excuteLocalCmd', cmd)
}
function killCmd(logListIndex, pid) {
    if (!pid) return
    // 1.清空接收器
    $electron.ipcRenderer.removeAllListeners('killLocalCmd')
    // 2.注册接收器
    $electron.ipcRenderer.on('killLocalCmd', (event, answer) => {
        let target = this.cmds[logListIndex]
        if (target) {
            target.pid = null
            this.cmds = Object.assign([], this.cmds)
        }
    })
    // 3.发送执行命令
    $electron.ipcRenderer.send('killLocalCmd', { pid })
}
// 排序
function sortCmds(event) {
    let map = JSON.parse(localStorage['cmdSortMap'])
    this.cmds.forEach((e) => (map[e.id || e._id] = ++map.max))
    localStorage['cmdSortMap'] = JSON.stringify(map)
}
