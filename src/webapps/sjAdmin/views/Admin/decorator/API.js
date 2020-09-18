export function ApiFunc(TargetClass) {
    // ======================================================= 仓库
    TargetClass.prototype.createWareHouse = createWareHouse
    TargetClass.prototype.getShopWareHouseList = getShopWareHouseList
    TargetClass.prototype.deleteShopWareHouse = deleteShopWareHouse
    // ======================================================= 店铺
    TargetClass.prototype.createShop = createShop
    TargetClass.prototype.getShopList = getShopList
    TargetClass.prototype.deleteShop = deleteShop
    TargetClass.prototype.getShopListOfEmployee = getShopListOfEmployee
    // ======================================================= 用户
    TargetClass.prototype.getUserInfo = getUserInfo
    TargetClass.prototype.shopUserLogin = shopUserLogin
}
// ======================================================= 仓库
// * 新开仓库
function createWareHouse(shopId) {
    let params = { shopId }
    return $common._Server.request('POST', '/sjShop/wareHouse/create', params, $common.getLocalToken())
}
// * 获取我管理的仓库列表
function getShopWareHouseList(shopId) {
    let params = { shopId }
    return $common._Server.request('POST', '/sjShop/wareHouse/list', params, $common.getLocalToken())
}
// * 仓库删除
function deleteShopWareHouse(shopId, wareHouseId) {
    let params = { shopId, wareHouseId }
    return $common._Server.request('POST', '/sjShop/wareHouse/delete', params, $common.getLocalToken())
}
// ======================================================= 店铺
// * 新开店铺
function createShop() {
    let params = { name: `新店铺 ${parseInt(Math.random() * 10000)}` }
    return $common._Server.request('POST', '/sjShop/shop/create', params, $common.getLocalToken())
}
// * 获取我管理的店铺列表
function getShopList() {
    let params = {}
    return $common._Server.request('GET', '/sjShop/shop/list', params, $common.getLocalToken())
}
// * 店铺删除
function deleteShop(shopId) {
    let params = { shopId }
    return $common._Server.request('POST', '/sjShop/shop/delete', params, $common.getLocalToken())
}
// * 员工加入的店铺
function getShopListOfEmployee() {
    let params = {}
    return $common._Server.request('POST', '/sjShop/employee/shopList', params, $common.getLocalToken())
}
// ======================================================= 用户
// * 获取用户信息
function getUserInfo() {
    let params = {}
    return $common._Server.request('GET', '/sjShop/user/info', params, $common.getLocalToken())
}
// * 用户注册/登录
function shopUserLogin(name, phone, password) {
    let params = { name, phone, password }
    return $common._Server.request('POST', '/sjShop/user/login', params)
}
