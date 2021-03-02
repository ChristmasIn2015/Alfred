const ElectronResponse = global['$common'].ElectronResponse
export default class Note {
    constructor() {}
    // ************************************************************************
    @ElectronResponse('知识区域提交成功')
    async commitArea(event, params) {
        let model = global['$db'].Area.getStruct()
        model.name = params.name
        if (params.id) {
            await global['$db'].Area.update({ id: params.id }, model)
        } else {
            await global['$db'].Area.create(model)
        }
    }
    @ElectronResponse('获取知识列表成功')
    async getAreaList() {
        let list = await global['$db'].Area.query()
        return list
    }
    @ElectronResponse('删除知识区域成功')
    async areaDelete(event, areaId) {
        // 0.删除指定区域
        await global['$db'].Area.delete(areaId)
        // 1.找到所有区域和书架的关系
        let list = await global['$db'].Relation_AreaShelf.query({ areaId })
        //
        for (let i in list) {
            //
            // 2.删除这段关系中的书架
            await global['$db'].Shelf.delete(list[i].shelfId)
            // 3.删除这段关系
            await global['$db'].Relation_AreaShelf.delete(list[i].id)
            //
            // 4.1 找到所有书架和书籍的关系
            let list2 = await global['$db'].Relation_ShelfBook.query({ shelfId: list[i].shelfId })
            for (let ii in list2) {
                // 4.2 删除这段关系中的书籍
                await global['$db'].Book.delete(list2[ii].bookId)
                // 4.3 删除这段关系
                await global['$db'].Relation_ShelfBook.delete(list2[ii].id)
            }
        }
    }
    // ************************************************************************
    @ElectronResponse('提交书架成功')
    async commitShelf(event, params) {
        let model = global['$db'].Shelf.getStruct()
        model.name = params.shelfModel.name
        if (params.shelfModel.id) {
            await global['$db'].Shelf.update({ id: params.shelfModel.id }, model)
        } else {
            let info = await global['$db'].Shelf.create(model)
            // * 更新关系
            let relation = global['$db'].Relation_AreaShelf.getStruct()
            relation.areaId = params.areaId
            relation.shelfId = info.lastID
            await global['$db'].Relation_AreaShelf.create(relation)
        }
    }
    @ElectronResponse('获取书架列表成功')
    async getShelfList(event, params) {
        let shelfs = []
        let list = await global['$db'].Relation_AreaShelf.query({ areaId: params.areaId })
        for (let key in list) {
            let shelf = await global['$db'].Shelf.get({ id: list[key].shelfId })
            if (shelf) shelfs.push(shelf)
        }
        return shelfs
    }
    @ElectronResponse('删除书架成功')
    async shelfDelete(event, shelfId) {
        // 0.删除指定书架
        await global['$db'].Shelf.delete(shelfId)
        // 1.找到所有区域和书架的关系
        let list = await global['$db'].Relation_AreaShelf.query({ shelfId })
        for (let i in list) {
            // 1.2 删除这段关系
            await global['$db'].Relation_AreaShelf.delete(list[i].id)
        }
        //
        // 2 找到所有书架和书籍的关系
        let list2 = await global['$db'].Relation_ShelfBook.query({ shelfId })
        for (let ii in list2) {
            // 2.2 删除这段关系中的书籍
            await global['$db'].Book.delete(list2[ii].bookId)
            // 2.3 删除这段关系
            await global['$db'].Relation_ShelfBook.delete(list2[ii].id)
        }
    }
    // ************************************************************************
    @ElectronResponse('书籍提交成功')
    async commitBook(event, params) {
        let model = global['$db'].Book.getStruct()
        model.name = params.bookModel.name
        model.content = params.bookModel.content
        if (params.bookModel.id) {
            await global['$db'].Book.update({ id: params.bookModel.id }, model)
        } else {
            let info = await global['$db'].Book.create(model)
            // * 更新关系
            let relation = global['$db'].Relation_ShelfBook.getStruct()
            relation.shelfId = params.shelfId
            relation.bookId = info.lastID
            await global['$db'].Relation_ShelfBook.create(relation)
        }
    }
    @ElectronResponse('获取书籍列表成功')
    async getBookList(event, params) {
        let books = []
        let list = await global['$db'].Relation_ShelfBook.query({ shelfId: params.shelfId })
        for (let key in list) {
            let book = await global['$db'].Book.get({ id: list[key].bookId })
            if (book) books.push(book)
        }
        return books
    }
    @ElectronResponse('删除书籍成功')
    async bookDelete(event, bookId) {
        // 0 删除指定书籍
        await global['$db'].Book.delete(bookId)
        // 1.找到所有书架和书籍的关系
        let list = await global['$db'].Relation_ShelfBook.query({ bookId })
        for (let i in list) {
            // 1.2 删除这段关系
            await global['$db'].Relation_ShelfBook.delete(list[i].id)
        }
    }
}
