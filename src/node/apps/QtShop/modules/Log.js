import Response from '../../../../database/Response.js'
export default class Log {
    constructor() {}
    #getModel() {
        return {
            ip: null,
            message: '',
        }
    }

    @Response('添加日志成功')
    async addError(request, response) {
        let model = this.#getModel()
        model.ip = request.ip
        model.message = request.body.message
        await $db.Log.create(model)
    }

    @Response()
    async getErrorList(request, response) {
        let list = await $db.Log.query({})
        list = list.reverse().slice(0, 50)
        return list
    }
}
