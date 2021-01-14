import Response from '../../../../database/Response.js'
export default class Order {
    constructor() {}
    #getModel() {
        return {
            byHouseId: null,
            customer: {},
            orderPrice: 0,
            goodListFake: [],
            goodList: [],
            goodStatus: 10, // 10 未发货 11 已发货
            priceStatus: 20, // 20 未回款 21 已回款
        }
    }
    //
    @Response()
    async addOrder(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        // 2.
        let model = this.#getModel()
        let list = request.body.goodList || []
        for (let index = 0; index < list.length; index++) {
            //
            let good = list[index]
            // 创建订单后，原来的库存需要减少
            for (let i = 0; i < good.outCountList.length; i++) {
                let counter = good.outCountList[i]
                let query = { _id: counter._id }
                let targetTag = await Cabin.Tag.get(query)
                await Cabin.Tag.update(query, { value: Number(targetTag.value) - Number(counter.value) })
            }
            // 入库准备
            model.goodList.push(good)
            model.goodListFake.push(good)
            model.orderPrice += Number(good.price)
        }
        model.byHouseId = request.body.houseId
        model.goodStatus = 11
        model.priceStatus = 20
        model.customer = request.body.customerPicked
        let order = await Cabin.Order.create(model)
        return order
    }

    // 获取订单列表
    @Response()
    async getOrderList(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        // 2.
        let orderList = await Cabin.Order.query({ byHouseId: request.body.houseId })
        return orderList
    }

    // 重新发货
    @Response()
    async updateOrder(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        // 2.找到这条订单
        let order = await Cabin.Order.get({ _id: request.body.orderId })

        // 3.撤回已发货的商品
        for (let i = 0; i < order.goodList.length; i++) {
            let good = order.goodList[i]
            // 撤回后，原来的库存需要增加
            for (let j = 0; j < good.outCountList.length; j++) {
                let counter = good.outCountList[j]
                let query = { _id: counter._id }
                let targetTag = await Cabin.Tag.get(query)
                await Cabin.Tag.update(query, { value: Number(targetTag.value) + Number(counter.value) })
            }
        }

        // 4.重新发货
        for (let index = 0; index < request.body.goodList.length; index++) {
            let good = request.body.goodList[index]
            // 发货 = 原来的库存需要减少
            for (let i = 0; i < good.outCountList.length; i++) {
                let counter = good.outCountList[i]
                let query = { _id: counter._id }
                let targetTag = await Cabin.Tag.get(query)
                await Cabin.Tag.update(query, { value: Number(targetTag.value) - Number(counter.value) })
            }
        }
        let updater = { goodList: request.body.goodList, goodStatus: 11 }
        await Cabin.Order.update({ _id: request.body.orderId }, updater)
    }

    // 修改订单状态
    @Response()
    async changeOrderStatus(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        // 2.
        let updater = {}
        if (request.body.goodStatus) updater['goodStatus'] = request.body.goodStatus
        if (request.body.priceStatus) updater['priceStatus'] = request.body.priceStatus
        await Cabin.Order.update({ _id: request.body.orderId }, updater)
    }

    // 商品撤回 库存还原
    @Response()
    async clearOrderGood(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        // 2.已发货的库存
        let order = await Cabin.Order.get({ _id: request.body.orderId })
        if (order.goodStatus === 11) {
            for (let i = 0; i < order.goodList.length; i++) {
                let good = order.goodList[i]
                for (let j = 0; j < good.outCountList.length; j++) {
                    // 撤回后，原来的库存需要增加
                    let counter = good.outCountList[j]
                    let query = { _id: counter._id }
                    let targetTag = await Cabin.Tag.get(query)
                    await Cabin.Tag.update(query, { value: Number(targetTag.value) + Number(counter.value) })
                }
            }
            // 实际发货清空
            await Cabin.Order.update({ _id: request.body.orderId }, { goodList: [], goodStatus: 10 })
        } else {
            throw new Error('订单尚未发货')
        }
    }
}
