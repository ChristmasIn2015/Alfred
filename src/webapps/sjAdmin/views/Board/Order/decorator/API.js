export function ApiFunc(TargetClass) {
    // ======================================================= 员工
    TargetClass.prototype.createGood = createGood
    TargetClass.prototype.getGoodList = getGoodList
}
// ======================================================= 商品
// * 新增商品
function createGood(wareHouseId, name, plugList, countList, cost, tip) {
    let params = { wareHouseId, name, plugList, countList, cost, tip }
    return $common._Server.request('POST', '/sjShop/good/create', params, $common.getHeader())
}
// * 获取商品列表
function getGoodList(wareHouseId) {
    let params = { wareHouseId }
    return $common._Server.request('POST', '/sjShop/good/list', params, $common.getHeader())
}
