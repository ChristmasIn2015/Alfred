import { SERVE_ADDRESS } from './api.js'
export default function WebSocket(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.ws = null
        //
        // * 方法
        this.buildConnection = buildConnection
        this.sendOrder = sendOrder

        // *
        sourceFunction.apply(this, arguments)
    }
}
function buildConnection() {
    if (this.ws) return
    this.ws = new WebSocket(`ws://${SERVE_ADDRESS}:6999`)
    this.ws.onopen = () => {
        console.log('on open')
        this.ws.send('hello')
    }
    this.ws.onmessage = (event) => {
        // { type, params }
        console.log(event.data)
    }
}
function sendOrder(order) {
    // { type, params }
    if (!this.ws) return
    this.ws.send(JSON.stringify(order))
}
