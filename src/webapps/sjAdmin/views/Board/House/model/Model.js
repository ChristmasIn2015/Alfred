// *
// *
import { GoodParam, GoodFunc } from './Good.js'
import { OrderParam, OrderFunc } from './Order.js'
// *
@GoodFunc
@OrderFunc
export default class Model {
    constructor() {
        this.start()
    }
    // * 初始化参数
    @GoodParam
    start() {
        this.getMyGoodList() // @Good
    }

    // ================================== 混合交互 ==================================
}
