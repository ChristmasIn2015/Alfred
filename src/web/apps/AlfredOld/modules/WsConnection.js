export default function WsConnection(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.ws = null
        this.ws_address = null
        this.ws_key = null
        //
        // * 方法
        this.connectionBuild = connectionBuild
        this.connectionOrder = connectionOrder

        // *
        sourceFunction.apply(this, arguments)
    }
}

// 建立链接
function connectionBuild(ws_address) {
    return new Promise((resolve, reject) => {
        if (this.ws) return
        this.ws_address = ws_address
        this.ws = new WebSocket(this.ws_address)

        // 收到消息
        this.ws.onmessage = (event) => {
            // { type, data }
            const DTO = JSON.parse(event.data)
            if (DTO.type === 'SUCCESS') {
                this.ws_key = DTO.KEY
                $toast(`与 ${this.ws_address} 建立长链接 ${this.ws_key} 成功`)
                resolve(true)
            }
            if (DTO.type === 'Error') {
                $warn(DTO.message)
                console.log(DTO.message)
            }
            if (DTO.type === 'CreateCMD') {
                $toast('获取列表成功')
            }
            if (DTO.type === 'RenderCmdList') {
                // @Cmds
                this.renderCmds(DTO.list)
            }
            if (DTO.type === 'DeleteCmd') {
                $toast('删除成功')
            }
            if (DTO.type === 'ExcuteCMD') {
                this.cmds[DTO.answer.DTO.listIndex].log += DTO.answer.message
                this.cmds[DTO.answer.DTO.listIndex].pid = DTO.answer.DTO.pid
            }
        }

        // 主动关闭/被动关闭
        this.ws.onclose = (event) => {
            if (event.type === 'close') {
                reject(`与 ${this.ws_address} 链接超时`)
            }
            this.ws.close()
            // this.ws_address = null
            this.ws_key = null
            this.ws = null
        }
    })
}

// 发送命令
function connectionOrder(order) {
    if (!this.ws) return
    if (this.ws.readyState === 3) {
        $warn(`与 ${this.ws_address} 已经链接关闭`)
        return
    }
    // { type, data }
    this.ws.send(JSON.stringify(order))
}
