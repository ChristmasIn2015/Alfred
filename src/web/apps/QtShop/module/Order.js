import { createOrder, getOrderList } from '@/web/apps/QtShop/module/api.js'
export default function CenterOrder(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.goodListPicked = []
        //
        this.orderListModal = false
        this.orderList = []
        //
        this.orderEditTarget = {}
        this.orderEdit = false
        this.orderEditModal = false
        //
        // * 方法
        this.actionOrder = actionOrder
        this.renderOrderList = renderOrderList
        this.changeMyOrderStatus = changeMyOrderStatus
        this.clearMyOrderGood = clearMyOrderGood
        this.updateMyOrder = updateMyOrder
        // *
        sourceFunction.apply(this, arguments)
    }
}
// 渲染订单列表
async function renderOrderList() {
    let houseInfo = $store.state.houseInfo
    let list = await getOrderList(houseInfo._id)
    list.forEach((e) => {
        e['orderPriceName'] = e.orderPrice + '元'
        e['goodStatusName'] = getOrderStatusName(e.goodStatus)
        e['priceStatusName'] = getOrderStatusName(e.priceStatus)
    })
    this.orderList = Object.assign([], list.reverse())
}
// 创建订单
async function actionOrder(customerPicked) {
    let houseInfo = $store.state.houseInfo
    // houseId, customerId, saleGoodList, remark
    // saleGoodList { _id count countName remark }
    $tip('创建订单成功')
}
