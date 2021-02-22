export default class UtilsNodeReact {
    constructor() {}

    // Express返回值修饰器
    Response(answer: string = null): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            const sourceFunction = descriptor.value
            descriptor.value = async function(...args) {
                let result = {
                    code: null,
                    data: '',
                    message: '',
                }
                let response = args[1]
                try {
                    let data = await sourceFunction.apply(this, args)
                    result.code = 200
                    result.data = data || answer
                } catch (error) {
                    result.message = error.message || error
                } finally {
                    response.send(result)
                }
            }
        }
    }

    // 获取本机Ipv4地址
    getIPv4(): string {
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
