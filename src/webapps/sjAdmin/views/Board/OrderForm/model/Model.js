// *
// *
// import { GoodParam, GoodFunc } from './Good.js'
// import { OrderParam, OrderFunc } from './Order.js'
import { CustomerParams, CustomerFunc } from './Customer.js'
// *
// @FilterFunc
// @GoodFunc
@CustomerFunc
export default class Model {
    constructor() {
        this.start()
    }
    // * 初始化参数
    // @FilterParam
    // @GoodParam
    @CustomerParams
    start() {}

    // ================================== 混合交互 ==================================
}
