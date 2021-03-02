const ElectronResponse = global['$common'].ElectronResponse
// 这个类提供Node操纵OS的一些方法
export default class Native {
    constructor() {}

    // 打开Chromium控制台
    @ElectronResponse('打开控制台成功')
    async openDevTool(event, params) {
        event.sender.openDevTools()
        return true
    }
}
