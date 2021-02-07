import Log from './Base/Log'
import Requester from './Base/Requester'
import UtilsTime from './Utils/UtilsTime'
import UtilsVaild from './Utils/UtilsVaild'
import UtilsCalculation from './Utils/UtilsCalculation'

export interface ClassBindable {
    OriginMap: Map<string, object>
}

export class Common implements ClassBindable {
    isDebug: boolean = false
    OriginMap: Map<string, object> = new Map()
    constructor() {
        this.bindClass(this, 'Log', Log) // 日志
        this.bindClass(this, 'Requester', Requester) // 请求
        this.bindClass(this, 'UtilsTime', UtilsTime) // 时间
        this.bindClass(this, 'UtilsVaild', UtilsVaild) // 校验
        this.bindClass(this, 'UtilsCalculation', UtilsCalculation) // 计算
    }

    // 将A类上的所有方法绑定到B类上, 且B.A方法中, this指向A而不是B
    bindClass(Target: ClassBindable, OriginName: string, Origin: any) {
        if (Origin instanceof Function) {
            // 1.在A类上创建B对象
            Target.OriginMap.set(OriginName, new Origin())
            // 2.在A类上创建B对象方法的索引
            Object.getOwnPropertyNames(Origin.prototype).forEach((FunctionName) => {
                if (FunctionName === 'constructor') return // continue
                Target[FunctionName] = (...args) => {
                    const ORIGIN = Target.OriginMap.get(OriginName)
                    return ORIGIN[FunctionName].apply(ORIGIN, args)
                }
            })
        }
    }
}
