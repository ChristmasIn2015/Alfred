import Response from '../utils/Response.js'
// 这个类提供Node操纵OS的一些方法
export default class Bats {
    constructor() {}

    @Response('脚本提交成功')
    async commitBat(event, params) {
        let model = $db.Bats.getModel()
        model.name = params.name
        model.path = params.path
        if (params.id) {
            await $db.Bats.update({ id: params.id }, model)
        } else {
            await $db.Bats.create(model)
        }
    }
    @Response('获取脚本列表成功')
    async getBatList() {
        let list = await $db.Bats.query()
        return list
    }
    @Response('删除脚本成功')
    async batDelete(event, batId) {
        // 0.删除指定脚本
        await $db.Bats.delete(batId)
    }
}
