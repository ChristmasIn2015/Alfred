import axios from 'axios'
export default function Log(TargetClass) {
    // * 在本地服务器 10.52.2.35 上存储错误信息
    TargetClass.prototype.log = log

    // * 监听所有HTML报错
    window.onerror = (message, source, lineno, colno, error) => log(message)
}
function log(message) {
    // return
    axios({
        method: 'POST',
        // url: 'http://192.168.0.105/sjShop/error/create',
        url: 'http://10.52.2.35/sjShop/error/create',
        data: { message: message },
        headers: {},
    })
}
