const Response = global['$common'].Response
const AlfredLogin = global['$common'].AlfredLogin
export default class QtShop_Good {
    constructor() {}

    @AlfredLogin()
    @Response('添加商品成功')
    async createGoodInHouse(request, response, user) {
        //
        const houseId = request.body.houseId
        if (!houseId) throw new Error(`请选择仓库`)
        const goodList = request.body.goodList
        if (!goodList) throw new Error(`待创建商品异常`)

        //
        for (let i in goodList) {
            const DTO = goodList[i]
            const name = DTO.name
            const norm = DTO.norm || ''
            if (!name) throw new Error(`商品名称不能为:${name}`)

            // 添加原商品
            let good = await global['$db'].Good.create({ name, norm })

            // 为用户添加商品
            // await global['$db'].GoodByUser.create({ goodId: good._id, userId: user._id })

            // 为仓库添加原商品的库存/备注
            const count = Number(DTO.count || 0)
            const countName = DTO.countName || ''
            const remark = DTO.remark || ''
            await global['$db'].InventoryByHouse.create({
                houseId,
                goodId: good._id,
                count,
                countName,
                remark,
            })
        }
    }

    @AlfredLogin()
    @Response()
    async getGoodListInHouse(request, response, user) {
        const houseId = request.body.houseId
        if (!houseId) throw new Error(`请选择仓库`)
        // 根据仓库id获取商品列表
        let inventory = await global['$db'].InventoryByHouse.query({ houseId })
        let goodIdMap = {}
        let list = []
        for (let i in inventory) {
            let goodId = inventory[i].goodId
            if (goodIdMap[goodId]) continue
            goodIdMap[goodId] = true
            let good = await global['$db'].Good.get({ _id: goodId })
            list.push(Object.assign(good, inventory[i]))
        }
        return list
    }

    @AlfredLogin()
    @Response()
    async updateGood(request, response) {
        // // 1.
        // let user = await Cabin.userCharge(request, response)
        // // 1.更新商品数据库
        // if (!request.body.name) throw new Error('商品名称不能为空')
        // let goodId = request.body._id
        // await $db.Good.update(
        //     { _id: goodId },
        //     {
        //         name: request.body.name,
        //         cost: request.body.cost,
        //         tip: request.body.tip,
        //     }
        // )
        // // 2.更新商品和标签的关系
        // {
        //     let list = await $db.GoodTag.query({ goodId: goodId })
        //     for (let i = 0; i < list.length; i++) {
        //         let relationShip = list[i]
        //         if (relationShip.tagType === 0) {
        //             // * 删除商品和标签的所有关系
        //             await $db.GoodTag.delete(relationShip._id)
        //         }
        //         if (relationShip.tagType === 1) {
        //             // * 删除商品和库存的所有关系
        //             await $db.GoodTag.delete(relationShip._id)
        //             // * 删除对应的标签
        //             await $db.Tag.delete(relationShip.tagId)
        //         }
        //     }
        //     // 2.1 新增商品和规格的关系
        //     let plugList = request.body.plugList
        //     for (let i = 0; i < plugList.length; i++) {
        //         await $db.GoodTag.create({ goodId: goodId, tagId: plugList[i]._id, tagType: 0 })
        //     }
        //     // 2.2 新增库存标签 并且 新增商品和库存的关系
        //     let countList = request.body.countList
        //     for (let i = 0; i < countList.length; i++) {
        //         // *
        //         let counter = countList[i]
        //         let tag = await $db.Tag.create({ name: counter.name, value: counter.value })
        //         await $db.GoodTag.create({ goodId: goodId, tagId: tag._id, tagType: 1 })
        //     }
        // }
    }

    //
    @Response('删除商品成功')
    async deleteGood(request, response) {
        // // 1
        // let user = await Cabin.userCharge(request, response)
        // // 2 删除这个商品
        // await $db.Good.delete(request.body.goodId)
        // // 3
        // let list = await $db.GoodTag.query({ goodId: request.body.goodId })
        // for (let i = 0; i < list.length; i++) {
        //     // 3.1 删除这个商品的库存标签
        //     if (list[i].tagType === 1) await $db.Tag.delete(list[i].tagId)
        //     // 3.2 删除和标签的关系
        //     await $db.GoodTag.delete(list[i]._id)
        // }
    }
}
