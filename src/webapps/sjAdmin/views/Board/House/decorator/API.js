export function ApiFunc(TargetClass) {
    // ======================================================= 商品
    TargetClass.prototype.createGood = createGood
    TargetClass.prototype.getGoodList = getGoodList
    TargetClass.prototype.deleteGood = deleteGood
    TargetClass.prototype.editGood = editGood
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
// * 删除商品
function deleteGood(wareHouseId, goodId) {
    let params = { wareHouseId, goodId }
    return $common._Server.request('POST', '/sjShop/good/delete', params, $common.getHeader())
}
// * 编辑商品
function editGood(wareHouseId, _id, name, plugList, countList, cost, tip) {
    let params = { _id, wareHouseId, name, plugList, countList, cost, tip }
    return $common._Server.request('POST', '/sjShop/good/edit', params, $common.getHeader())
}
