export default class Log {
    isDebug: boolean = false
    constructor() {}

    toggleDebug() {
        this.isDebug = !this.isDebug
    }

    async log(message: string): Promise<any> {
        try {
            if (this.isDebug) {
                await $common.fetch('http://wqao.top:7001/yjy-log/create', 'POST', { message })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
