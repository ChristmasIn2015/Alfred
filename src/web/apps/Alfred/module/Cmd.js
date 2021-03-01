export default function DevOps(target, name, descriptor) {
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
        this.cmdLogModal = false
        this.cmdLogHTML = null
        //
        // * function
        this.toggleCmdModal = toggleCmdModal
        this.renderCmdList = renderCmdList
        this.cmdModalAction = cmdModalAction
        this.deleteCmd = deleteCmd
        this.excuteRemoteCmd = excuteRemoteCmd
        this.killRemoteCmd = killRemoteCmd
        // *
        sourceFunction.apply(this, arguments)
    }
    return descriptor
}
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
//
function renderCmdList() {
    // @WsHandler
    this.wsPostOrder('/getRemoteCmdList')
}
function cmdModalAction() {
    const orderName = this.cmdModel._id ? '/updateRemoteCmd' : '/createRemoteCmd'
    // @WsHandler
    this.wsPostOrder(orderName, this.cmdModel)
}
function deleteCmd(cmd) {
    $confirm('警告', `您确定要删除 ${cmd.name} 吗?`, (answer) => {
        if (!answer) return
        this.wsPostOrder('/deleteRemoteCmd', { _id: cmd._id, name: cmd.name })
    })
}
function excuteRemoteCmd(logListIndex, cmd) {
    // @WsHandler
    this.cmds[logListIndex].log = '<div color="red">发送执行命令中</div>'
    this.wsPostOrder('/excuteRemoteCmd', Object.assign({ logListIndex }, cmd))
}
function killRemoteCmd(logListIndex, pid) {
    // @WsHandler
    if (!pid) return
    this.wsPostOrder('/killRemoteCmd', { logListIndex, pid })
}
