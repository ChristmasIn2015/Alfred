import { SERVER_HOST, Requester } from './server.js'

// ======================================================= 构建请求
function _success(result, resolve, reject) {
    let data = result.data
    if (data.code === '200') {
        resolve(data.data)
    } else {
        reject(data.message)
    }
    // "code" / "msg" / "success" / "data"
}
function _error(error, reject) {
    reject(error.message)
}
const _request = new Requester(SERVER_HOST, _success, _error)

// =======================================================
// * demo
export function getNewsList() {
    let params = {}
    return _request.request('GET', `URL`, params)
}
