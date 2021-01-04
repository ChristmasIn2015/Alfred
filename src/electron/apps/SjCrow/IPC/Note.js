import Response from '../utils/Response.js'
export default class Note {
    constructor() {}
    // ************************************************************************
    @Response('成功')
    async commitArea(event, params) {
        let model = $db.Area.getModel()
        model.name = params.name
        if (params.id) {
            await $db.Area.update({ id: params.id }, model)
        } else {
            await $db.Area.create(model)
        }
    }
    @Response('删除知识区域成功')
    async areaDelete(event, id) {
        await $db.Area.delete(id)
    }
    @Response('获取知识列表成功')
    async getAreaList() {
        let list = await $db.Area.query()
        return list
    }
    // ************************************************************************
    @Response('成功')
    async commitShelf(event, params) {
        let model = $db.Shelf.getModel()
        model.name = params.shelf.name
        if (params.id) {
            // await $db.Shelf.update({ id: params.id }, model)
        } else {
            let info = await $db.Shelf.create(model)
            // * 更新关系
            let relation = $db.Relation_AreaShelf.getModel()
            relation.areaId = params.areaId
            relation.shelfId = info.lastID
            await $db.Relation_AreaShelf.create(relation)
        }
    }
    async shelfDelete(event, params) {}

    @Response('获取书架列表成功')
    async getShelfList(areaId) {
        let list = await $db.Relation_AreaShelf.query({ areaId })

        // let list = await $db.Shelf.query()
        return list
    }
    // ************************************************************************
    async commitBook(event, params) {}
    async bookUpdate(event, params) {}
    async bookDelete(event, params) {}
}
