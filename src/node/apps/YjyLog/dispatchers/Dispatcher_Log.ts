const Response = global['$common'].Response
export default class Dispatcher_Log {
    constructor() {}

    @Response('添加日志成功')
    async createLog(request, response) {
        await global['$db'].Log.create({
            ip: request.ip,
            message: request.body.message,
        })
    }

    @Response()
    async getLogs(request, response) {
        let list = await global['$db'].Log.query({})
        list = list.reverse().slice(0, 50)
        list.forEach((e) => {
            e['timeCreateChinese'] = new Date(e.timeCreate).toLocaleString()
            e['timeUpdateChinese'] = new Date(e.timeUpdate).toLocaleString()
        })
        return list
    }
}
