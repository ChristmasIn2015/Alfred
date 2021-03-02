const ElectronResponse = global['$common'].ElectronResponse
// 这个类提供Node操纵OS的一些方法
export default class Cmds {
    constructor() {}

    @ElectronResponse('脚本提交成功')
    async commitLocalCmd(event, params) {
        let model: { name: string; cmdString: string } = global['$db'].Cmds.getStruct()
        model.name = params.name
        model.cmdString = params.cmdString
        if (params.id) {
            await global['$db'].Cmds.update({ id: params.id }, model)
        } else {
            await global['$db'].Cmds.create(model)
        }
    }

    @ElectronResponse('获取脚本列表成功')
    async getLocalCmdList() {
        let list: Array<{ name: string; cmdString: string }> = await global['$db'].Cmds.query()

        return list
    }

    @ElectronResponse('删除脚本成功')
    async deleteLocalCmd(event, id) {
        // 0.删除指定脚本
        await global['$db'].Cmds.delete(id)
    }
}
