import Response from '../utils/Response.js'
// 这个类提供Node操纵OS的一些方法
export default class Cmds {
    constructor() {}

    @Response('脚本提交成功')
    async commitLocalCmd(event, params) {
        let model = $db.Cmds.getStruct()
        model.name = params.name
        model.cmdString = params.cmdString
        if (params.id) {
            await $db.Cmds.update({ id: params.id }, model)
        } else {
            await $db.Cmds.create(model)
        }
    }
    @Response('获取脚本列表成功')
    async getLocalCmdList() {
        let list = await $db.Cmds.query()
        return list
    }
    @Response('删除脚本成功')
    async deleteLocalCmd(event, batId) {
        // 0.删除指定脚本
        await $db.Cmds.delete(batId)
    }
}
