const Response = global['$common'].Response
const AlfredLogin = global['$common'].AlfredLogin
export default class QtShop_Order {
    constructor() {}

    @AlfredLogin()
    @Response('创建订单成功')
    async addOrder(request, response, user) {
        const customerId = request.body.customerId
        if (!customerId) throw new Error('请选择客户')
        const remark = request.body.remark
        const saleGoodList = request.body.saleGoodList
        if (!saleGoodList) throw new Error('请选择商品')
        const houseId = request.body.houseId
        if (!houseId) throw new Error('请选择仓库')

        // 添加订单
        let order = await global['$db'].Order.create({ createrId: user._id, remark })
        const orderId = order._id

        // 使得能根据客户找到订单
        await global['$db'].OrderByCustomer.create({ orderId, customerId })

        // 使得能根据订单找到商品，及这个商品售出的库存/单位/备注
        // @transportStatus 0 未发货 1 已发货
        for (let i in saleGoodList) {
            const goodId = saleGoodList[i]._id
            if (!goodId) continue
            const count = Number(saleGoodList[i].count) || 0
            const countName = saleGoodList[i].countName
            const remark = saleGoodList[i].remark

            // 1.根据仓库找到下单的商品
            let rela = await global['$db'].GoodByHouse.get({ houseId, goodId })
            if (!rela) continue

            // 2.添加订单下，商品的销售记录
            await global['$db'].GoodByOrder.create({
                //
                orderId,
                goodId,
                count,
                countName,
                remark,
                transportStatus: 0,
            })

            // 3.更新仓库下商品的库存
            await global['$db'].GoodByHouse.update({ houseId, goodId }, { count: rela.count - count })
        }
    }
}
