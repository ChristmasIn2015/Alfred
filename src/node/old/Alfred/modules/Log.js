import Response from '../../../../database/Response.js'
export default class Log {
    constructor() {}

    async createAlfredLog(message) {
        let model = $db.Log.getStruct()
        model.ip = 'Alfred Error'
        model.message = message
        await $db.Log.create(model)
    }

    @Response('添加客户端日志成功')
    async createLog(request, response) {
        let model = $db.Log.getStruct()
        model.ip = request.ip
        model.message = request.body.message
        await $db.Log.create(model)
    }

    @Response()
    async getLogs(request, response) {
        let list = await $db.Log.query({})
        list = list.reverse().slice(0, 50)
        return list
    }
}
