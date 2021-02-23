/**
 * 1.使得Alfred服务具有反向代理功能
 * Tip: 正向代理
 *      代理客户端，代客户端向其他服务发出请求
 * Tip: 反向代理
 *      代理服务端，代服务端接受请求，再返回给客户端
 *      淘宝为了满足庞大的网络请求，采用了反向代理服务器转发请求，配合分布式部署其他服务器，
 *      通过部署多台服务器来解决访问人数限制的问题
 */
export default class Dispatcher_Proxy {
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
