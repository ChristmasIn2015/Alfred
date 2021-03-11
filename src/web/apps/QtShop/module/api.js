const requester = $common.getRequester(
    'http://10.52.2.35',
    // 'http://wqao.top',
    // 成功
    async (result) => {
        if (result.code !== 200) throw new Error(result.message)
        return result.data
    }
)
// // ======================================================= 订单
// // * 新增订单
export function createOrder(houseId, customerId, saleGoodList, remark) {
    // saleGoodList { _id count countName remark, retailPrice }
    return requester.request(
        //
        'POST',
        '/qt-shop/order/create',
        { houseId, customerId, saleGoodList, remark },
        $common.getHeaders()
    )
}
// * 获取订单列表
export function getOrderList(houseId) {
    return requester.request('POST', '/qt-shop/order/list', { houseId }, $common.getHeaders())
}
// // * 修改订单状态
// export function changeOrderStatus(orderId, goodStatus, priceStatus) {
//     let params = { orderId, goodStatus, priceStatus }
//     return requester.request('POST', '/qt-shop/order/changeStatus', params, $common.getHeaders())
// }
// // * 库存撤回
// export function clearOrderGood(orderId) {
//     let params = { orderId }
//     return requester.request('POST', '/qt-shop/order/clearOrderGood', params, $common.getHeaders())
// }
// // * 订单修改
// export function updateOrder(orderId, goodList) {
//     let params = { orderId, goodList }
//     return requester.request('POST', '/qt-shop/order/updateOrder', params, $common.getHeaders())
// }
// // ======================================================= 客户
// * 新增客户
export function createCustomer(DTO) {
    // DTO { shopId name contact remark }
    return requester.request('POST', '/qt-shop/customer/create', DTO, $common.getHeaders())
}
// * 获取客户列表
export function getCustomerList(shopId) {
    return requester.request('POST', '/qt-shop/customer/list', { shopId }, $common.getHeaders())
}
// // ======================================================= 标签
// // * 新增标签
// export function createTag(goodId, name, value) {
//     let params = { goodId, name, value }
//     return requester.request('POST', '/qt-shop/tag/create', params, $common.getHeaders())
// }
// // * 获取标签列表
// export function getPlugTagList(goodId) {
//     let params = { goodId }
//     return requester.request('POST', '/qt-shop/tag/plugList', params, $common.getHeaders())
// }
// // * 删除标签
// export function deleteTag(tagId) {
//     let params = { tagId }
//     return requester.request('POST', '/qt-shop/tag/delete', params, $common.getHeaders())
// }
// // ======================================================= 商品
// * 新增商品
export function createGoodInHouse(houseId, goodList) {
    // goodList: { name, norm, count, countName, remark, cost }
    return requester.request('POST', '/qt-shop/good/create', { houseId, goodList }, $common.getHeaders())
}
// * 获取商品列表
export function getGoodListInHouse(houseId) {
    return requester.request('POST', '/qt-shop/good/list', { houseId }, $common.getHeaders())
}
// // * 删除商品
// export function deleteGood(houseId, goodId) {
//     let params = { houseId, goodId }
//     return requester.request('POST', '/qt-shop/good/delete', params, $common.getHeaders())
// }
// // * 编辑商品
// export function editGood(houseId, _id, name, plugList, countList, cost, tip) {
//     let params = { houseId, _id, name, plugList, countList, cost, tip }
//     return requester.request('POST', '/qt-shop/good/edit', params, $common.getHeaders())
// }
// // ======================================================= 员工
// // * 店铺新增员工
// export function createEmployee(phone, shopId) {
//     let params = { phone, shopId }
//     return requester.request('POST', '/qt-shop/employee/create', params, $common.getHeaders())
// }
// // * 店铺员工列表
export function getEmployeeList(shopId) {
    return requester.request('POST', '/qt-shop/employee/list', { shopId }, $common.getHeaders())
}
// // * 店铺删除员工
// export function deleteEmployee(employeeId) {
//     let params = { employeeId }
//     return requester.request('POST', '/qt-shop/employee/delete', params, $common.getHeaders())
// }
// // ======================================================= 仓库
// * 新开仓库
export function createHouse(DTO) {
    return requester.request('POST', '/qt-shop/house/create', DTO, $common.getHeaders())
}
// * 获取我管理的仓库列表
export function getHouseList(shopId) {
    return requester.request('POST', '/qt-shop/house/list', { shopId }, $common.getHeaders())
}
// * 仓库删除
// export function deleteShopWareHouse(shopId, wareHouseId) {
//     let params = { shopId, wareHouseId }
//     return requester.request('POST', '/qt-shop/house/delete', params, $common.getHeaders())
// }
// ======================================================= 店铺
// * 新开店铺
export function createShop(DTO) {
    return requester.request('POST', '/qt-shop/shop/create', DTO, $common.getHeaders())
}
// * 获取我管理的店铺列表
export function getShopList() {
    return requester.request('GET', '/qt-shop/shop/list', null, $common.getHeaders())
}
// * 店铺删除
export function deleteShop(shopId) {
    return requester.request('POST', '/qt-shop/shop/delete', { shopId }, $common.getHeaders())
}
