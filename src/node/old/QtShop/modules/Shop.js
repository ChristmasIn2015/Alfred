import Response from '../../../../database/Response.js'
export default class Shop {
    constructor() {}
    #getModel() {
        return {
            name: '',
        }
    }

    @Response('添加店铺成功')
    async addShop(request, response) {
        // 1.
        let user = await Cabin.userCharge(request, response)

        // 2.
        let model = this.#getModel()
        model.name = request.body.name
        let shop = await $db.Shop.create(model)

        // * 更新请求者和新建店铺的关系
        let relationShip = { shopId: shop._id, userId: user._id, role: 0 }
        await $db.Employee.create(relationShip)
    }

    @Response()
    async getShopList(request, response) {
        // 1.
        let user = await Cabin.userCharge(request, response)
        console.log(user)

        // 2.获取请求者身份为店长 role=0 的所有店铺
        let query = { userId: user._id, role: 0 }
        let list = await $db.Employee.query(query)
        let shopList = []
        for (let i = 0; i < list.length; i++) {
            let _id = list[i].shopId
            let shop = await $db.Shop.get({ _id })
            if (shop) shopList.push(shop)
        }

        // 3.获取请求者身份为员工 role=1 的所有店铺
        query.role = 1
        list = await $db.Employee.query(query)
        let officeList = []
        for (let i = 0; i < list.length; i++) {
            let _id = list[i].shopId
            let shop = await $db.Shop.get({ _id })
            if (shop) officeList.push(shop)
        }

        return { shopList, officeList }
    }

    @Response()
    async deleteShop(request, response) {
        // 1.
        let user = await Cabin.userCharge(request, response)

        // 2.
        let query = { shopId: request.body.shopId, userId: user._id }
        let employeeDoc = await $db.Employee.get(query)
        if (!employeeDoc) throw new Error('店铺不存在')
        if (!employeeDoc.role !== 0) throw new Error('您不是店长')

        // 3.
        await $db.Shop.delete({ _id: employeeDoc.shopId })
        return '删除店铺成功'
    }
}
