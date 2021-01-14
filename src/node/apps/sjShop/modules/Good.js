import Response from '../../../../database/Response.js'
export default class Good {
    constructor() {}
    #getModel() {
        return {
            byHouseId: -1,
            name: '',
            cost: 0,
        }
    }
    //
    @Response('添加商品成功')
    async addGood(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        // 2.
        if (!request.body.name) throw new Error(`商品名称不能为${request.body.name}`)
        if (!request.body.countList || !request.body.countList.length) throw new Error('请选择库存量')
        for (let i = 0; i < request.body.countList.length; i++) {
            let counter = request.body.countList[i]
            if (!counter.name) throw new Error('请选择库存单位')
        }

        // 3.添加商品，这时候不添加 规格/库存 相关标签数据
        let model = this.#getModel()
        model.byHouseId = request.body.byHouseId
        model.name = request.body.name
        model.cost = Number(request.body.cost) || 0
        model.tip = request.body.tip
        let good = await Cabin.Good.create(model)

        // 4.标签已经存在于数据库，需要更新对应商品和标签之间的关系
        let plugList = request.body.plugList || []
        for (let i = 0; i < plugList.length; i++) {
            await Cabin.GoodTag.create({
                goodId: good._id,
                tagId: plugList[i]._id,
                tagType: 0, // 0 规格 1 库存
            })
        }

        // 5.向标签数据库添加库存标签，并更新对应商品和标签之间的关系
        let countList = request.body.countList || []
        for (let i = 0; i < countList.length; i++) {
            let tag = await Cabin.Tag.create({
                name: countList[i].name,
                value: Number(countList[i].value),
            })
            await Cabin.GoodTag.create({
                goodId: good._id,
                tagId: tag._id,
                tagType: 1, // 0 规格 1 库存
            })
        }
    }

    //
    @Response()
    async getGoodList(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        // 2.取得所有商品
        let goodList = await Cabin.Good.query({ byHouseId: request.body.byHouseId })

        // 3.为所有商品添加标签
        for (let i = 0; i < goodList.length; i++) {
            let good = goodList[i]

            // * 查询并配置所有规格标签
            let plugList = await Cabin.GoodTag.query({ goodId: good._id, tagType: 0 })
            // console.log({ goodId: good._id, tagType: 0 })
            let newPlugList = []
            for (let i = 0; i < plugList.length; i++) {
                let tag = await Cabin.Tag.get({ _id: plugList[i].tagId })
                if (tag) newPlugList.push(tag)
            }

            // * 查询并配置所有单位标签
            let countList = await Cabin.GoodTag.query({ goodId: good._id, tagType: 1 })
            let newCountList = []
            for (let i = 0; i < countList.length; i++) {
                let tag = await Cabin.Tag.get({ _id: countList[i].tagId })
                if (tag) newCountList.push(tag)
            }

            // * 配置
            goodList[i]['plugList'] = newPlugList
            goodList[i]['countList'] = newCountList
        }
        return goodList
    }

    //
    @Response('修改商品成功')
    async updateGood(request, response, Cabin) {
        // 1.
        let user = await Cabin.userCharge(request, response, Cabin)

        // 1.更新商品数据库
        if (!request.body.name) throw new Error('商品名称不能为空')
        let goodId = request.body._id
        await Cabin.Good.update(
            { _id: goodId },
            {
                name: request.body.name,
                cost: request.body.cost,
                tip: request.body.tip,
            }
        )

        // 2.更新商品和标签的关系
        {
            let list = await Cabin.GoodTag.query({ goodId: goodId })
            for (let i = 0; i < list.length; i++) {
                let relationShip = list[i]
                if (relationShip.tagType === 0) {
                    // * 删除商品和标签的所有关系
                    await Cabin.GoodTag.delete(relationShip._id)
                }
                if (relationShip.tagType === 1) {
                    // * 删除商品和库存的所有关系
                    await Cabin.GoodTag.delete(relationShip._id)
                    // * 删除对应的标签
                    await Cabin.Tag.delete(relationShip.tagId)
                }
            }
            // 2.1 新增商品和规格的关系
            let plugList = request.body.plugList
            for (let i = 0; i < plugList.length; i++) {
                await Cabin.GoodTag.create({ goodId: goodId, tagId: plugList[i]._id, tagType: 0 })
            }

            // 2.2 新增库存标签 并且 新增商品和库存的关系
            let countList = request.body.countList
            for (let i = 0; i < countList.length; i++) {
                // *
                let counter = countList[i]
                let tag = await Cabin.Tag.create({ name: counter.name, value: counter.value })
                await Cabin.GoodTag.create({ goodId: goodId, tagId: tag._id, tagType: 1 })
            }
        }
    }

    //
    @Response('删除商品成功')
    async deleteGood(request, response, Cabin) {
        // 1
        let user = await Cabin.userCharge(request, response, Cabin)

        // 2 删除这个商品
        await Cabin.Good.delete(request.body.goodId)

        // 3
        let list = await Cabin.GoodTag.query({ goodId: request.body.goodId })
        for (let i = 0; i < list.length; i++) {
            // 3.1 删除这个商品的库存标签
            if (list[i].tagType === 1) await Cabin.Tag.delete(list[i].tagId)
            // 3.2 删除和标签的关系
            await Cabin.GoodTag.delete(list[i]._id)
        }
    }
}
