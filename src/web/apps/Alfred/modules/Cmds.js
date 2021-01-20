import { commitLocalCmd, getLocalCmdList, deleteLocalCmd } from './api.js'
export default function Cmds(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.cmdModal = false
        this.cmdModel = {
            id: null,
            name: '',
            cmdString: '',
        }
        this.cmds = []
        //
        // * 方法
        this.toggleCmd = toggleCmd
        this.commitCmd = commitCmd
        this.renderCmds = renderCmds
        this.deleteCmd = deleteCmd
        this.sortCmds = sortCmds
        //
        this.excuteLocalCmd = excuteLocalCmd
        this.killLocalCmd = killLocalCmd
        this.excuteRemoteCmd = excuteRemoteCmd
        this.killRemoteCmd = killRemoteCmd
        // *
        sourceFunction.apply(this, arguments)
    }
}

function toggleCmd(event, form) {
    this.cmdModel = form
        ? { id: form.id, name: form.name, cmdString: form.cmdString }
        : {
              id: null,
              name: '',
              cmdString: '',
          }
    this.cmdModal = !this.cmdModal
}
async function commitCmd(isRemote) {
    try {
        $load.show()
        if (!this.cmdModel.name) throw new Error('名称不能为空')
        if (!this.cmdModel.cmdString) throw new Error('路径不能为空')
        if (isRemote) {
            // @WsConnection
            this.connectionOrder({ type: 'CreateCMD', cmdModel: this.cmdModel })
            this.connectionOrder({ type: 'RenderCmdList' })
        } else {
            await commitLocalCmd(this.cmdModel)
            await this.renderCmds()
        }
        this.cmdModal = false
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
    }
}
async function renderCmds(remoteList) {
    try {
        $load.show()
        let list = []
        if (remoteList) {
            list = remoteList
        } else {
            list = await getLocalCmdList()
        }

        // **** 本地添加排序功能 ****
        let map = {
            max: 0,
        }
        if (localStorage['cmdSortMap']) {
            map = JSON.parse(localStorage['cmdSortMap'])
            list = list.map((e) => {
                let index = map[e.id] || 0
                return Object.assign({ index }, e)
            })
        } else {
            localStorage['cmdSortMap'] = JSON.stringify(map)
        }
        list.sort(function(pre, next) {
            return pre.index - next.index
        })
        // **** 本地添加排序功能 End ****

        list.forEach((e) => {
            e['log'] = ''
            e['pid'] = false
        })
        this.cmds = Object.assign([], list)
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
function deleteCmd(script, isRemote) {
    $confirm(`确定要删除 ${script.name} 吗`, async () => {
        try {
            if (isRemote) {
                // @WsConnection
                this.connectionOrder({ type: 'DeleteCmd', id: script.id })
                this.connectionOrder({ type: 'RenderCmdList' })
            } else {
                await deleteLocalCmd(script.id)
                await this.renderCmds()
                $toast(`删除 ${script.name} 成功`)
            }
        } catch (error) {
            $common.loadOff(error)
        }
    })
}
function sortCmds(event) {
    let map = JSON.parse(localStorage['cmdSortMap'])
    this.cmds.forEach((e) => (map[e.id] = ++map.max))
    localStorage['cmdSortMap'] = JSON.stringify(map)
}
// 通知主进程执行CMD命令
function excuteLocalCmd(index) {
    // 0.参数准备
    this.cmds[index].log = ''
    this.cmds[index].pid = 'Loading'
    let target = this.cmds[index]
    // 1.清空接收器
    $electron.ipcRenderer.removeAllListeners('excuteLocalCmd')
    // 2.注册接收器
    $electron.ipcRenderer.on('excuteLocalCmd', (event, answer) => {
        // answer: { message, DTO:{ pid, listIndex } }
        this.cmds[answer.DTO.listIndex].log += answer.message
        this.cmds[answer.DTO.listIndex].pid = answer.DTO.pid
    })
    // 3.发送执行命令
    $electron.ipcRenderer.send('excuteLocalCmd', { cmdString: target.cmdString, index })
}
// 通知主进程结束某个CMD
function killLocalCmd(pid) {
    $electron.ipcRenderer.send('killLocalCmd', { pid })
}

// @WxConnection 远程执行CMD命令
function excuteRemoteCmd(index) {
    // 0.参数准备
    this.cmds[index].log = ''
    this.cmds[index].pid = 'Loading'
    let target = this.cmds[index]
    this.connectionOrder({ type: 'ExcuteCMD', cmdString: target.cmdString, index, cmdId: target.id })
}
// 远程结束某个CMD
function killRemoteCmd(cmdId) {
    this.connectionOrder({ type: 'DestoryCMD', cmdId })
}
