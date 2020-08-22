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
// ======================================================= 用户
// * 获取用户信息
export function getUserInfo() {
    let params = {}
    return _request.request('GET', '/sjShop/user/info', params, getLocalToken())
}
// * 用户注册/登录
export function shopUserLogin(name, phone, password) {
    let params = { name, phone, password }
    return _request.request('POST', '/sjShop/user/login', params)
}
// ======================================================= 店铺
// * 新开店铺
export function createShop() {
    let params = { name: `新店铺 ${parseInt(Math.random() * 10000)}` }
    return _request.request('POST', '/sjShop/shop/create', params, getLocalToken())
}
// * 获取我管理的店铺列表
export function getShopList() {
    let params = {}
    return _request.request('GET', '/sjShop/shop/list', params, getLocalToken())
}
// * 店铺删除
export function deleteShop(shopId) {
    let params = { shopId }
    return _request.request('POST', '/sjShop/shop/delete', params, getLocalToken())
}
// ======================================================= 员工
// * 店铺新增员工
export function createEmployee(phone, shopId) {
    let params = { phone, shopId }
    console.log(params)
    return _request.request('POST', '/sjShop/employee/create', params, getLocalToken())
}
// * 店铺员工列表
export function getEmployeeList(shopId) {
    let params = { shopId }
    return _request.request('POST', '/sjShop/employee/list', params, getLocalToken())
}
// * 店铺删除员工
export function deleteEmployee(employeeId) {
    let params = { employeeId }
    return _request.request('POST', '/sjShop/employee/delete', params, getLocalToken())
}
// * 员工加入的店铺
export function getShopListOfEmployee() {
    let params = {}
    return _request.request('POST', '/sjShop/employee/shopList', params, getLocalToken())
}
