import { SERVER_HOST, Requester } from './server.js'

// ======================================================= 构建请求
function _success(result, resolve, reject) {
    let data = result.data
    if (data.code === 200) {
        resolve(data.data)
    } else {
        reject(data.message)
    }
    // "code" / "message" / "data"
}
function _error(error, reject) {
    reject(error.message)
}
const _request = new Requester(SERVER_HOST, _success, _error)

// =======================================================
function getLocalToken() {
    let token = localStorage['sjShopToken']
    return { headers: { authorization: token || '' } }
}
// =======================================================
// * 用户注册
export function shopUserLogin(id = -1, name, phone, password) {
    let params = { id, name, phone, password }
    return _request.request('POST', '/sjShop/user/login', params, getLocalToken())
}
