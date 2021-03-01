export default function WsHandler(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * params
        this.WS_ADDRESS = null
        this.WS = null
        this.WS_KEY = null
        this.WS_ORDER_MAP = {} // 用于接收长链接的命令
        //
        // * function
        this.wsLink = wsLink
        this.wsClose = wsClose
        this.wsPostOrder = wsPostOrder
        // *
        sourceFunction.apply(this, arguments)
    }
    return descriptor
}
// 建立长链接
function wsLink(WS_ADDRESS) {
    return new Promise((resolve, reject) => {
        if (this.WS) {
            reject(`已建立链接: ${this.WS_KEY}`)
            return
        }
        this.WS_ADDRESS = WS_ADDRESS
        const WS = new WebSocket(this.WS_ADDRESS)
        // 建立成功/主动关闭/被动关闭
        // WS.onopen = (event) => console.log(`ASYNC: ${this.WS_ADDRESS}, 链接成功`)
        // WS.onclose = (event) => console.log(`ASYNC: ${this.WS_ADDRESS}, ${this.WS_KEY}, 已经关闭`)
        // 收到消息
        WS.onmessage = (event) => {
            try {
                const order = JSON.parse(event.data)
                console.log('ws receive', order)
                const CODE = order.orderName
                if (CODE === '/connection/success') {
                    this.WS = WS
                    this.WS_KEY = order.connectionKey
                    console.log(`SUCCESS: ${this.WS_ADDRESS}, ${this.WS_KEY}, 链接成功`)
                } else if (CODE === '/connection/close' || CODE === '/request/authorization' || CODE === '/request/fail') {
                    throw new Error(order.DTO)
                } else {
                    const next = this.WS_ORDER_MAP[order.orderName]
                    next ? next(order) : $common.loadOff(new Error(`${order.orderName}:无后续处理`))
                }
                resolve(true)
            } catch (error) {
                $common.loadOff(error)
                this.wsClose()
            }
        }
    })
}
// 关闭长链接
function wsClose() {
    if (this.WS) {
        console.log(`CLOSE: ${this.WS_ADDRESS}, ${this.WS_KEY}, 链接已关闭`)
        this.WS.close()
    }
    this.WS_ADDRESS = null
    this.WS_KEY = null
    this.WS = null
}
// 向长链接发送命令
function wsPostOrder(orderName, DTO) {
    try {
        if (!this.WS) throw new Error('当前尚无长链接')
        DTO = Object.assign({ authorization: localStorage['token-qqlx'] }, DTO)
        const order = {
            connectionKey: this.WS_KEY,
            orderName,
            DTO,
        }
        this.WS.send(JSON.stringify(order))
        console.log('wsPostOrder', order)
    } catch (error) {
        $common.loadOff(error)
    }
}
