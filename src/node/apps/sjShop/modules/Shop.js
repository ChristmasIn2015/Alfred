import Response from '../../../../database/Response.js'
export default class Shop {
    constructor() {}
    #getModel() {
        return {
            name: '',
        }
    }

    @Response('添加店铺成功')
    async addShop(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        // 2.
        let model = this.#getModel()
        model.name = request.body.name
        let shop = await Cabin.Shop.create(model)

        // * 更新请求者和新建店铺的关系
        let relationShip = { shopId: shop._id, userId: user._id, role: 0 }
        await Cabin.Employee.create(relationShip)
    }

    @Response()
    async getShopList(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        // 2.获取请求者身份为店长 role=0 的所有店铺
        let query = { userId: user._id, role: 0 }
        let list = await Cabin.Employee.query(query)
        let shopList = []
        for (let i = 0; i < list.length; i++) {
            let _id = list[i].shopId
            let shop = await Cabin.Shop.get({ _id })
            if (shop) shopList.push(shop)
        }

        // 3.获取请求者身份为员工 role=1 的所有店铺
        query.role = 1
        list = await Cabin.Employee.query(query)
        let officeList = []
        for (let i = 0; i < list.length; i++) {
            let _id = list[i].shopId
            let shop = await Cabin.Shop.get({ _id })
            if (shop) officeList.push(shop)
        }

        return { shopList, officeList }
    }

    @Response()
    async deleteShop(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        // 2.
        let query = { shopId: request.body.shopId, userId: user._id }
        let employeeDoc = await Cabin.Employee.get(query)
        if (!employeeDoc) throw new Error('店铺不存在')
        if (!employeeDoc.role !== 0) throw new Error('您不是店长')

        // 3.
        await Cabin.Shop.delete({ _id: employeeDoc.shopId })
        return '删除店铺成功'
    }
}
