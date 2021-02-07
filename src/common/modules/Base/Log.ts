export default class Log {
    constructor() {}

    async log(message: string): Promise<any> {
        try {
            if ($common.isDebug) {
                await $common.fetch('http://wqao.top:7001/yjy-log/create', 'POST', { message })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
