import { createOrder, getOrderList } from '@/web/apps/QtShop/module/api.js'
export default function CenterOrder(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.orderGoodList = [] // 开单选中的商品
        //
        this.orderListModal = false
        this.orderListHeader = [
            { text: '编号', value: '_id' },
            { text: '品名', value: 'name' },
            { text: '规格', value: 'norm' },
            { text: '售出数量', value: 'count' },
            { text: '单位', value: 'countName' },
            { text: '售价', value: 'retailPrice' },
        ]
        this.orderList = []
        //
        this.orderEditTarget = {}
        this.orderEdit = false
        this.orderEditModal = false
        //
        // * 方法
        this.receiveOrderGood = receiveOrderGood
        this.deleteOrderGood = deleteOrderGood
        //
        this.renderOrderList = renderOrderList
        this.actionOrder = actionOrder
        // *
        sourceFunction.apply(this, arguments)
    }
}
// 接收商品 准备开单
function receiveOrderGood(goodList) {
    this.orderGoodList = this.orderGoodList.concat(
        goodList.map((good) => {
            good['retailPrice'] = 0
            return good
        })
    )
}
// 删除某个接收的商品
function deleteOrderGood(i) {
    this.orderGoodList.splice(i, 1)
}
// 创建订单
async function actionOrder() {
    try {
        $load.show()
        const houseId = $store.state.houseInfo._id
        if (!houseId) throw new Error('请选择仓库')
        if (!this.customerPicked) throw new Error('请选择客户')
        const customerId = this.customerPicked._id // @CenterCustomer
        if (this.orderGoodList.length === 0) throw new Error('请选择商品')
        //
        await createOrder(houseId, customerId, this.orderGoodList)
        $tip('创建订单成功')
        this.orderGoodList = []
        setTimeout(() => {
            $load.hide()
            $router.push({ path: '/order/center' })
        }, 1000)
    } catch (error) {
        $common.loadOff(error)
        if (error.message === '请选择仓库') {
            $load.show()
            setTimeout(() => {
                $load.hide()
                $router.push({ path: '/hall/center' })
            }, 1000)
        }
    }
}
// 渲染订单列表
async function renderOrderList() {
    let houseId = $store.state.houseInfo._id
    if (!houseId) throw new Error('请选择仓库')
    let list = await getOrderList(houseId)
    this.orderList = Object.assign(
        [],
        list.reverse().map((order) => {
            order['timeCreate'] = new Date(order.timeCreate).toLocaleString()
            return order
        })
    )
}
