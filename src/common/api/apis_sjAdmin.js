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
function getHeader() {
    let token = localStorage['sjShopToken']
    return { headers: { authorization: token || '' } }
}
// ======================================================= 商品
// * 新增商品
export function createGood(wareHouseId, name, plugList, countList, cost, tip) {
    let params = { wareHouseId, name, plugList, countList, cost, tip }
    return _request.request('POST', '/sjShop/good/create', params, getHeader())
}
// * 获取商品列表
export function getGoodList(wareHouseId) {
    let params = { wareHouseId }
    return _request.request('POST', '/sjShop/good/list', params, getHeader())
}
// ======================================================= 标签
// * 新增标签
export function createTag(goodId, name, value) {
    let params = { goodId, name, value }
    return _request.request('POST', '/sjShop/tag/create', params, getHeader())
}
// * 获取标签列表
export function getTagList(goodId) {
    let params = { goodId }
    return _request.request('POST', '/sjShop/tag/list', params, getHeader())
}
// * 删除标签
export function deleteTag(tagId) {
    let params = { tagId }
    return _request.request('POST', '/sjShop/tag/delete', params, getHeader())
}
// ======================================================= 仓库
// * 新开仓库
export function createWareHouse(shopId) {
    let params = { shopId }
    return _request.request('POST', '/sjShop/wareHouse/create', params, getHeader())
}
// * 获取我管理的仓库列表
export function getShopWareHouseList(shopId) {
    let params = { shopId }
    return _request.request('POST', '/sjShop/wareHouse/list', params, getHeader())
}
// * 仓库删除
export function deleteShopWareHouse(shopId, wareHouseId) {
    let params = { shopId, wareHouseId }
    return _request.request('POST', '/sjShop/wareHouse/delete', params, getHeader())
}
// ======================================================= 员工
// * 店铺新增员工
export function createEmployee(phone, shopId) {
    let params = { phone, shopId }
    console.log(params)
    return _request.request('POST', '/sjShop/employee/create', params, getHeader())
}
// * 店铺员工列表
export function getEmployeeList(shopId) {
    let params = { shopId }
    return _request.request('POST', '/sjShop/employee/list', params, getHeader())
}
// * 店铺删除员工
export function deleteEmployee(employeeId) {
    let params = { employeeId }
    return _request.request('POST', '/sjShop/employee/delete', params, getHeader())
}
// * 员工加入的店铺
export function getShopListOfEmployee() {
    let params = {}
    return _request.request('POST', '/sjShop/employee/shopList', params, getHeader())
}
// ======================================================= 店铺
// * 新开店铺
export function createShop() {
    let params = { name: `新店铺 ${parseInt(Math.random() * 10000)}` }
    return _request.request('POST', '/sjShop/shop/create', params, getHeader())
}
// * 获取我管理的店铺列表
export function getShopList() {
    let params = {}
    return _request.request('GET', '/sjShop/shop/list', params, getHeader())
}
// * 店铺删除
export function deleteShop(shopId) {
    let params = { shopId }
    return _request.request('POST', '/sjShop/shop/delete', params, getHeader())
}
// ======================================================= 用户
// * 获取用户信息
export function getUserInfo() {
    let params = {}
    return _request.request('GET', '/sjShop/user/info', params, getHeader())
}
// * 用户注册/登录
export function shopUserLogin(name, phone, password) {
    let params = { name, phone, password }
    return _request.request('POST', '/sjShop/user/login', params)
}
