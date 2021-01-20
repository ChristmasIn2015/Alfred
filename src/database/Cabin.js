import express from 'express'

export default class Cabin {
    info = {}
    communication = null // null: Electron的IPC通信, express(): Express包装的HTTP通信
    constructor(SOCKET_NUMBER) {
        if (SOCKET_NUMBER) {
            this.initHttpCabin(SOCKET_NUMBER)
        } else {
            if (!global['$hyBridge']) global['$hyBridge'] = {}
        }
    }
    // ============================================================================================================
    // ============================================================================================================
    // ============================================================================================================
    // ============================================================================================================
    // ============================================================================================================
    // ElectronIPC分配
    exposeElectronIPC(TargetClassName, TargetClass) {
        $hyBridge[TargetClassName] = new TargetClass()
        if (TargetClass.prototype) {
            Object.getOwnPropertyNames(TargetClass.prototype).forEach((functionName) => {
                if (functionName === 'constructor') return // continue
                require('electron').ipcMain.handle(functionName, async (...args) => {
                    let origin = $hyBridge[TargetClassName]
                    let result = await origin[functionName].apply(origin, args)
                    return result
                })
            })
        }
    }
    // 数据接口分配
    exposeHttpRoute(method, route, next) {
        if (this.info.SOCKET_NUMBER) {
            if (method === 'GET') {
                this.communication.get(route, (request, response) => next(request, response))
            }
            if (method === 'POST') {
                this.communication.post(route, require('body-parser').json(), (request, response) => next(request, response))
            }
        }
    }
    // HTML分配
    exposeHtml(route, htmlPath, indexPath) {
        if (this.info.SOCKET_NUMBER) {
            // const vuePath = require('path').join(__dirname, '../dist')
            // this.communication.use(express.static(vuePath))
            // this.communication.get('/sjShop', (request, response) => response.sendFile(`${vuePath}/sjShop.html`))
            this.communication.use(express.static(htmlPath))
            this.communication.get(route, (request, response) => response.sendFile(indexPath))
        }
    }
    // ============================================================================================================
    // ============================================================================================================
    // ============================================================================================================
    // ============================================================================================================
    // ============================================================================================================
    // 把调度员的方法绑定到Cabin上
    bindDispatcher(TargetClassName, TargetClass) {
        if (this.__proto__ && TargetClass.prototype) {
            // 1.在this的原型上创建目标对象
            this.__proto__[TargetClassName] = new TargetClass()
            // 2.在this的原型上绑定目标对象的所有方法
            Object.getOwnPropertyNames(TargetClass.prototype).forEach((functionName) => {
                if (functionName === 'docs') return // continue
                if (functionName === 'constructor') return // continue
                this.__proto__[functionName] = (...args) => {
                    let origin = this.__proto__[TargetClassName]
                    return origin[functionName].apply(origin, args)
                }
            })
        }
    }
    bindIpcDispatcher(TargetClassName, TargetClass) {
        $hyBridge[TargetClassName] = new TargetClass()
        if (TargetClass.prototype) {
            Object.getOwnPropertyNames(TargetClass.prototype).forEach((functionName) => {
                if (functionName === 'constructor') return // continue
                require('electron').ipcMain.handle(functionName, async (...args) => {
                    try {
                        let origin = $hyBridge[TargetClassName]
                        let result = await origin[functionName].apply(origin, args)
                        return result
                    } catch (error) {
                        console.log(process.pid, error)
                        process.exit()
                    }
                })
            })
        }
    }
    bindAutoIpcDispatcher(TargetClassName, TargetClass) {
        $hyBridge[TargetClassName] = new TargetClass()
        if (TargetClass.prototype) {
            Object.getOwnPropertyNames(TargetClass.prototype).forEach((functionName) => {
                if (functionName === 'constructor') return // continue
                require('electron').ipcMain.on(functionName, async (...args) => {
                    try {
                        let origin = $hyBridge[TargetClassName]
                        let result = await origin[functionName].apply(origin, args)
                        return result
                    } catch (error) {
                        console.log(process.pid, error)
                        process.exit()
                    }
                })
            })
        }
    }
    // ============================================================================================================
    // ============================================================================================================
    // ============================================================================================================
    // ============================================================================================================
    // ============================================================================================================
    initHttpCabin(SOCKET_NUMBER) {
        try {
            this.#initInfo(SOCKET_NUMBER)
            this.#initCommunication()
        } catch (error) {
            console.log(error.message)
            process.exit()
        }
    }
    // 初始化该控制台信息
    #initInfo(SOCKET_NUMBER) {
        // 服务端口
        this.info['SOCKET_NUMBER'] = SOCKET_NUMBER
        // 本机IPv4地址
        if (global.process.platform === 'win32') {
            const interfaces = require('os').networkInterfaces()
            for (let key in interfaces) {
                if (key === '以太网' || key === 'WLAN') {
                    for (let i in interfaces[key]) {
                        let value = interfaces[key][i]
                        if (value.family === 'IPv4') {
                            this.info['IPv4'] = value.address
                            break
                        }
                    }
                    break
                }
            }
        }
    }
    // 初始化控制台通信核心
    #initCommunication() {
        if (this.info.SOCKET_NUMBER) {
            this.communication = express()
            this.communication.all('*', (req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*')
                res.header('Access-Control-Allow-Headers', '*')
                res.header('Access-Control-Allow-Methods', '*')
                next()
            })
            this.communication.listen(this.info.SOCKET_NUMBER, '0.0.0.0')
        }
    }
}
