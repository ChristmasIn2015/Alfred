const Response = global['$common'].Response
const AlfredLogin = global['$common'].AlfredLogin
export default class QtShop_Customer {
    constructor() {}

    @AlfredLogin()
    @Response('添加客户成功')
    async addCustomer(request, response, user) {
        const shopId = request.body.shopId
        if (!shopId) throw new Error('请选择店铺')

        // 必须传入店铺，且找到店铺的店长
        let list = await global['$db'].ShopByUser.query({ shopId })
        let masterRela = list.find((e) => {
            return e.role === 0
        })
        if (!masterRela) throw new Error('找不到店长')
        let masterId = masterRela.userId

        // 创建客户
        const name = request.body.name
        if (!name) throw new Error('请输入客户名称')
        const contact = request.body.contact
        const remark = request.body.remark
        let customer = await global['$db'].Customer.create({ name, contact, remark })

        // 使得能根据店长找到客户
        await global['$db'].CustomerByUser.create({ userId: masterId, customerId: customer._id })
    }

    @AlfredLogin()
    @Response('获取客户列表成功')
    async getCustomerList(request, response, user) {
        const shopId = request.body.shopId
        if (!shopId) throw new Error('请选择店铺')

        // 必须传入店铺，且找到店铺的店长
        let list = await global['$db'].ShopByUser.query({ shopId })
        let masterRela = list.find((e) => {
            return e.role === 0
        })
        if (!masterRela) throw new Error('找不到店长')
        let masterId = masterRela.userId

        // 根据店长找到客户
        let list2 = await global['$db'].CustomerByUser.query({ userId: masterId })
        let customerList = []
        for (let i in list2) {
            let customer = await global['$db'].Customer.get({ _id: list2[i].userId })
            if (customer) customerList.push(customer)
        }
        return customerList
    }
}
