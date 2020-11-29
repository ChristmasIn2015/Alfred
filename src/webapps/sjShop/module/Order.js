import { createOrder, getOrderList, changeOrderStatus, clearOrderGood, updateOrder } from './api.js'
export default function Order(target, name, descriptor) {
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
        this.postOrder = postOrder
        this.renderOrderList = renderOrderList
        this.changeMyOrderStatus = changeMyOrderStatus
        this.clearMyOrderGood = clearMyOrderGood
        this.updateMyOrder = updateMyOrder
        // *
        sourceFunction.apply(this, arguments)
    }
}
// 创建订单
async function postOrder(customerPicked) {
    try {
        let houseInfo = $store.state.houseInfo
        let list = []
        this.goodListPicked.forEach((good) => {
            list.push({
                _id: good._id,
                name: good.name,
                plugList: good.plugList,
                outCountList: good.outCountList,
                price: Number(good.orderGoodPrice),
            })
        })
        await createOrder(houseInfo._id, list, customerPicked)
        $tip('创建订单成功')
    } catch (error) {
        return Promise.reject(error)
    }
}
// 渲染订单列表
async function renderOrderList() {
    try {
        let houseInfo = $store.state.houseInfo
        let list = await getOrderList(houseInfo._id)
        list.forEach((e) => {
            e['orderPriceName'] = e.orderPrice + '元'
            e['goodStatusName'] = getOrderStatusName(e.goodStatus)
            e['priceStatusName'] = getOrderStatusName(e.priceStatus)
        })
        this.orderList = Object.assign([], list.reverse())
    } catch (error) {
        return Promise.reject(error)
    }
}
function getOrderStatusName(status) {
    let name = ''
    switch (Number(status)) {
        case 10: {
            name = '未发货'
            break
        }
        case 11: {
            name = '已发货'
            break
        }
        case 20: {
            name = '未回款'
            break
        }
        case 21: {
            name = '已回款'
            break
        }
    }
    return name
}
// * 修改订单状态
async function changeMyOrderStatus(orderId, goodStatus, priceStatus) {
    try {
        $load.show()
        await changeOrderStatus(orderId, goodStatus, priceStatus)
        await this.renderOrderList()
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
    }
}
// * 库存撤回
async function clearMyOrderGood() {
    try {
        await clearOrderGood(this.orderEditTarget._id)
        await this.renderOrderList()
        $tip('撤回成功')
        this.orderEditModal = false
    } catch (error) {
        $common.loadOff(error)
    }
}
// * 重新发货
async function updateMyOrder() {
    try {
        $load.show()
        let list = []
        this.orderEditTarget.goodList.forEach((good) => {
            list.push({
                _id: good._id,
                name: good.name,
                plugList: good.plugList,
                outCountList: good.outCountList,
                price: Number(good.price),
            })
        })
        await updateOrder(this.orderEditTarget._id, list)
        await this.renderOrderList()
        $tip('发货成功')
        this.orderEditModal = false
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
    }
}
