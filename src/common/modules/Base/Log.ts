export default class Log {
    isDebug: boolean = true
    constructor() {}

    toggleDebug() {
        this.isDebug = !this.isDebug
    }

    async log(message: string): Promise<any> {
        try {
            if (this.isDebug) {
                await global['$common'].fetch('http://wqao.top:7001/yjy-log/create', 'POST', { message })
            }
        } catch (error) {
            console.log(error)
        }
    }
}
