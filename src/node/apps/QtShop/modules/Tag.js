import Response from '../../../../database/Response.js'
export default class Tag {
    constructor() {}
    #getModel() {
        return {
            name: '',
            value: '',
        }
    }
    //
    @Response('添加标签成功')
    async addTag(request, response) {
        // 1.
        let user = await Cabin.userCharge(request, response)

        // 2.
        let model = this.#getModel()
        model.name = request.body.name
        model.value = request.body.value
        if (!model.name) throw new Error('名称不允许为空')
        if (!model.value) throw new Error('值不允许为空')
        let tag = await $db.Tag.create(model)

        // // 3.更新商品和标签之间的关系
        let goodId = request.body.goodId
        if (goodId) {
            // 3.1 商品新增标签(关系)
            await $db.GoodTag.create({ goodId: goodId, tagId: tag._id, tagType: 1 })
        } else {
            // 3.2 新增全局标签(关系)
            await $db.GoodTag.create({ goodId: null, tagId: tag._id, tagType: -1 })
        }
    }

    //
    @Response()
    async getPlugList(request, response) {
        // 1.
        let user = await Cabin.userCharge(request, response)

        // 2.默认返回所有商品的规格标签
        let query = { goodId: request.body.goodId || null, tagType: -1 }
        let list = await $db.GoodTag.query(query)
        let tagList = []
        for (let i = 0; i < list.length; i++) {
            let tag = await $db.Tag.get({ _id: list[i].tagId })
            if (tag) tagList.push(tag)
        }
        return tagList
    }

    //
    @Response('删除标签成功')
    async deleteTag(request, response) {
        // 1.
        let user = await Cabin.userCharge(request, response)

        // 2.
        await $db.Tag.delete(request.body.tagId)
    }
}
