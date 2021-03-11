const Response = global['$common'].Response
const AlfredLogin = global['$common'].AlfredLogin
export default class QtShop_Order {
    constructor() {}

    @AlfredLogin()
    @Response('创建订单成功')
    async addOrder(request, response, user) {
        const houseId = request.body.houseId
        if (!houseId) throw new Error('请选择仓库')
        const customerId = request.body.customerId
        if (!customerId) throw new Error('请选择客户')
        const saleGoodList = request.body.saleGoodList
        if (!saleGoodList) throw new Error('请选择商品')
        const remark = request.body.remark

        // 添加订单
        let order = await global['$db'].Order.create({ createrId: user._id, houseId, customerId, remark })
        const orderId = order._id

        // 使得能根据订单找到商品，及这个商品售出的库存/单位/备注
        // @transportStatus 0 未发货 1 已发货
        for (let i in saleGoodList) {
            const goodId = saleGoodList[i]._id
            if (!goodId) continue
            const count = Number(saleGoodList[i].count) || 0
            const countName = saleGoodList[i].countName
            const remark = saleGoodList[i].remark
            const retailPrice = saleGoodList[i].retailPrice

            // 1.根据仓库找到下单的商品
            let houseGood = await global['$db'].HouseGood.get({ houseId, goodId })
            if (!houseGood) continue

            // 2.添加订单下的商品售出信息
            await global['$db'].OrderGood.create({
                //
                orderId,
                goodId,
                count,
                countName,
                remark,
                transportStatus: 0,
                retailPrice,
            })

            // 3.更新仓库下的商品入库信息
            await global['$db'].HouseGood.update({ houseId, goodId }, { count: houseGood.count - count })
        }
    }

    @AlfredLogin()
    @Response()
    async getOrderListByHouseId(request, response) {
        const houseId = request.body.houseId
        if (!houseId) throw new Error('请选择仓库')

        // 根据仓库查询所有订单
        let orderList = await global['$db'].Order.query({ houseId })

        // 查询所有订单下的商品售出信息
        for (let i in orderList) {
            let saleGoodList = await global['$db'].OrderGood.query({ orderId: orderList[i]._id })
            for (let ii in saleGoodList) {
                let good = await global['$db'].Good.get({ _id: saleGoodList[ii].goodId })
                if (good) saleGoodList[ii] = Object.assign(good, saleGoodList[ii])
            }
            orderList[i]['saleGoodList'] = saleGoodList
        }
        return orderList
    }
}
