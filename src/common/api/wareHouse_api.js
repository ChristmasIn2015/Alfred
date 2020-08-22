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
const wareHouseRequest = new Requester(SERVER_HOST, _success, _error)

// =======================================================
function getLocalToken() {
    let token = localStorage['sjShopToken']
    return { headers: { authorization: token || '' } }
}

// =======================================================
// * 新开仓库
export function createWareHouse(shopId) {
    let params = { shopId }
    return wareHouseRequest.request('POST', '/sjShop/wareHouse/create', params, getLocalToken())
}
// * 获取我管理的仓库列表
export function getShopWareHouseList(shopId) {
    let params = { shopId }
    return wareHouseRequest.request('POST', '/sjShop/wareHouse/list', params, getLocalToken())
}
// * 仓库删除
export function deleteShopWareHouse(shopId, wareHouseId) {
    let params = { shopId, wareHouseId }
    return wareHouseRequest.request('POST', '/sjShop/wareHouse/delete', params, getLocalToken())
}
