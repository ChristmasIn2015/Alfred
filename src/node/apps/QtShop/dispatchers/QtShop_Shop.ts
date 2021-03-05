const Response = global['$common'].Response
const AlfredLogin = global['$common'].AlfredLogin
export default class QtShop_Shop {
    constructor() {}

    @AlfredLogin()
    @Response('添加店铺成功')
    async createShop(request, response, user) {
        if (!request.body.name) throw new Error('请输入店铺名称')
        if (request.body._id) {
            //
        } else {
            let shop = await global['$db'].Shop.create({
                name: request.body.name,
            })
            // 将创建这个店铺的用户设置为是店长
            await global['$db'].ShopByUser.create({
                shopId: shop._id,
                userId: user._id,
                role: 0,
            })
        }
    }

    @AlfredLogin()
    @Response('获取店铺成功')
    async getShopList(request, response, user) {
        // 1.获取请求者的所有店铺
        let query = { userId: user._id }
        let shopIds = await global['$db'].ShopByUser.query(query)
        let shops = []
        for (let i in shopIds) {
            let shop = await global['$db'].Shop.get({ _id: shopIds[i].shopId })
            shop['role'] = shopIds[i].role
            if (shop) shops.push(shop)
        }
        // 2.获取请求者身份为店长/员工 role=0/1 的所有店铺
        let shopList = shops.filter((e) => e.role === 0)
        let officeList = shops.filter((e) => e.role === 1)
        return { shopList, officeList }
    }

    @AlfredLogin()
    @Response()
    async deleteShop(request, response, user) {
        let query = { shopId: request.body.shopId, userId: user._id, role: 0 }
        let relationShip = await global['$db'].ShopByUser.get(query)
        if (!relationShip) throw new Error('未找到您的店铺, 或您不是店长')
        //
        await global['$db'].Shop.delete({ _id: relationShip.shopId })
        await global['$db'].ShopByUser.delete({ _id: relationShip._id })
        return '删除店铺成功'
    }
}
