import UtilsCalculation from './module/Utils/UtilsCalculation.js'
import UtilsReact from './module/Utils/UtilsReact.js'
import UtilsTime from './module/Utils/UtilsTime.js'
import UtilsVaild from './module/Utils/UtilsVaild.js'
import Location from './module/Location.js'
import Log from './module/Log.js'
import Server from './module/Server.js'

export default class Common {
    constructor() {
        this.bindClass('UtilsCalculation', UtilsCalculation) // 0.计算
        this.bindClass('UtilsReact', UtilsReact) // 0.交互
        this.bindClass('UtilsVaild', UtilsVaild) // 0.时间
        this.bindClass('UtilsTime', UtilsTime) // 0.校验
        this.bindClass('Location', Location) // 1.定位
        this.bindClass('Server', Server) // 2.网络请求
        this.bindClass('Log', Log) // 3.日志
    }
    // * 将某个类原型上的所有方法绑定到this的原型上
    bindClass(TargetClassName, TargetClass) {
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
    //
    getHeaders() {
        let hearder = {
            authorization: localStorage['sjShopToken'],
        }
        return Object.assign(
            {
                'Cache-Control': 'no-cache',
                'Content-type': 'application/json',
            },
            hearder
        )
    }
}
window.$common = new Common()
