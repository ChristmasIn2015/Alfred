const Response = global['$common'].Response
const AlfredLogin = global['$common'].AlfredLogin
export default class YjyLog_Log {
    constructor() {}

    @Response('添加日志成功')
    async createLog(request, response) {
        await global['$db'].Log.create({
            ip: request.ip,
            message: request.body.message,
        })
    }

    @AlfredLogin()
    @Response()
    async getLogs(request, response) {
        let list = await global['$db'].Log.query({})
        list = list.reverse().slice(0, 50)
        list.forEach((e) => {
            e['timeCreateChinese'] = global['$common'].getFullTime(e.timeCreate).full
            e['timeUpdateChinese'] = global['$common'].getFullTime(e.timeUpdate).full
            // e['timeCreateChinese'] = new Date(e.timeCreate).toLocaleString()
            // e['timeUpdateChinese'] = new Date(e.timeUpdate).toLocaleString()
        })
        return list
    }
}
