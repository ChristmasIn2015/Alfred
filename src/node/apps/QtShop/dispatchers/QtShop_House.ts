const Response = global['$common'].Response
const AlfredLogin = global['$common'].AlfredLogin
export default class QtShop_House {
    constructor() {}

    @AlfredLogin()
    @Response('创建仓库成功')
    async createHouse(request, response, user) {
        if (!request.body.shopId) throw new Error('请选择店铺')
        if (!request.body.name) throw new Error('请输入仓库名称')
        //
        let query = { shopId: request.body.shopId, userId: user._id, role: 0 }
        let relationShip = await global['$db'].ShopByUser.get(query)
        if (!relationShip) throw new Error('您选择的店铺不存在, 请重新选择店铺')

        //
        if (request.body._id) {
            //
        } else {
            let house = await global['$db'].House.create({ name: request.body.name })
            await global['$db'].HouseByShop.create({ houseId: house._id, shopId: request.body.shopId })
        }
    }

    @AlfredLogin()
    @Response('获取仓库成功')
    async getHouseList(request, response, user) {
        if (!request.body.shopId) throw new Error('请选择店铺')
        //
        let list = await global['$db'].HouseByShop.query({ shopId: request.body.shopId })
        let houseList = []
        for (let i in list) {
            let house = await global['$db'].House.get({ _id: list[i].houseId })
            if (house) houseList.push(house)
        }
        return houseList
    }
}
