export default class UtilsNodeReact {
    IPv4 = null
    constructor() {
        this.IPv4 = this.getIPv4()
    }

    // HTTP-登录修饰器
    // HTTP-登录修饰器
    // HTTP-登录修饰器
    // HTTP-登录修饰器
    AlfredLogin() {
        const IPv4 = this.IPv4
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            const sourceFunction = descriptor.value
            descriptor.value = async function(...args) {
                const request = args[0]
                const response = args[1]
                try {
                    let data = await global['$common'].fetch(`http://${IPv4}:80/alfred/user/info`, 'POST', null, {
                        authorization: request.header('authorization'),
                    })
                    if (data.code !== 200) throw new Error(`${data.message}(code:${data.code})`)
                    args.push(data.data)
                    await sourceFunction.apply(this, args)
                } catch (error) {
                    response.send({
                        code: null,
                        data: null,
                        message: `登录信息异常: ${error.message}`,
                    })
                }
            }
        }
    }
    // Express返回值修饰器
    // Express返回值修饰器
    // Express返回值修饰器
    // Express返回值修饰器
    Response(answer: string = '') {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            const sourceFunction = descriptor.value
            descriptor.value = async function(...args) {
                let result = {
                    code: null,
                    data: null,
                    message: '',
                }
                const now = Date.now()
                try {
                    let data = await sourceFunction.apply(this, args)
                    result.code = 200
                    result.data = data || answer
                } catch (error) {
                    result.message = error.message || error
                } finally {
                    const response = args[1]
                    response.send(result)
                }
            }
        }
    }

    // WebSocket登录修饰器
    // WebSocket登录修饰器
    // WebSocket登录修饰器
    // WebSocket登录修饰器
    WsAlfredLogin() {
        const IPv4 = this.IPv4
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            const sourceFunction = descriptor.value
            descriptor.value = async function(...args) {
                let order: WebSocketOrder = args[0]
                try {
                    let info = await global['$common'].fetch(`http://${IPv4}:80/alfred/user/info`, 'POST', null, {
                        authorization: order.DTO.authorization,
                    })
                    if (info.code !== 200) throw new Error(`${info.message}`)
                    if (!info.data.isSystemMaster) throw new Error('您不是管理员')
                    await sourceFunction.apply(this, args)
                } catch (error) {
                    order.orderName = '/request/authorization'
                    order.DTO = error.message || error || '您的权限不足'
                    global['Cabin'].websocketAnswer(order)
                }
            }
        }
    }
    // WebSocket返回值修饰器
    // WebSocket返回值修饰器
    // WebSocket返回值修饰器
    // WebSocket返回值修饰器
    WsResponse(answer: string = '', boardCast: boolean = false) {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            const sourceFunction = descriptor.value
            descriptor.value = async function(...args) {
                let order: WebSocketOrder = args[0]
                try {
                    let DTO = await sourceFunction.apply(this, args)
                    order.DTO = DTO || answer || null
                } catch (error) {
                    order.orderName = '/request/fail'
                    order.DTO = error.message || error
                } finally {
                    if (boardCast) {
                        global['Cabin'].websocketBoardCast(order)
                    } else {
                        global['Cabin'].websocketAnswer(order)
                    }
                }
            }
        }
    }

    // Electron返回值修饰器
    ElectronResponse(answer: string = '') {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            const sourceFunction = descriptor.value
            descriptor.value = async function(...args) {
                let result = {
                    code: null,
                    data: null,
                    message: '',
                }
                try {
                    let data = await sourceFunction.apply(this, args)
                    result.code = 200
                    result.data = data || answer
                } catch (error) {
                    result.message = error.message || error
                } finally {
                    return result
                }
            }
        }
    }

    // 获取本机Ipv4地址
    // 获取本机Ipv4地址
    // 获取本机Ipv4地址
    // 获取本机Ipv4地址
    getIPv4(): string {
        if (this.IPv4) return this.IPv4
        //
        let address = null
        if (global.process.platform === 'win32') {
            const interfaces = require('os').networkInterfaces()
            for (let key in interfaces) {
                if (key === '以太网' || key === 'WLAN') {
                    for (let i in interfaces[key]) {
                        let value = interfaces[key][i]
                        if (value.family === 'IPv4') {
                            address = value.address
                            break
                        }
                    }
                    break
                }
            }
        }
        return address
    }

    // NodeCmd命令行彩色打印
    // NodeCmd命令行彩色打印
    // NodeCmd命令行彩色打印
    // NodeCmd命令行彩色打印
    printRed(message: string): void {
        console.log(`\x1B[41m\x1B[30m${message}\x1B[0m`)
    }
    printYellow(message: string): void {
        console.log(`\x1B[43m\x1B[30m${message}\x1B[0m`)
    }
    printBlue(message: string): void {
        console.log(`\x1B[44m\x1B[37m${message}\x1B[0m`)
    }
    printGreen(message: string): void {
        console.log(`\x1B[42m\x1B[30m${message}\x1B[0m`)
    }
    printLink(message: string): void {
        console.log(`\x1B[34m${message}\x1B[0m`)
    }
    printText(message: string): void {
        console.log(`\x1B[33m${message}\x1B[0m`)
    }
}
