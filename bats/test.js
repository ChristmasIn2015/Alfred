let ws = require('nodejs-websocket')

ws.createServer((connection) => {
    console.log('有人连接...')
    connection.on('text', function(result) {
        console.log('发送消息', result)
    })
    connection.on('connect', function(code) {
        console.log('开启连接', code)
    })
    connection.on('close', function(code) {
        console.log('关闭连接', code)
    })
    connection.on('error', function(code) {
        console.log('异常关闭', code)
    })
}).listen(6999)
