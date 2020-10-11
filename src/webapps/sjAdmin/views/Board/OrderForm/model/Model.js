// *
// *
import { FilterParam, FilterFunc } from './Filter.js'
import { GoodParams, GoodFunc } from './Good.js'
import { OrderParams, OrderFunc } from './Order.js'
import { CustomerParams, CustomerFunc } from './Customer.js'
// *
@FilterFunc
@OrderFunc
@GoodFunc
@CustomerFunc
export default class Model {
    constructor() {
        this.start()
    }
    // * 初始化参数
    @FilterParam
    @OrderParams
    @GoodParams
    @CustomerParams
    start() {}

    // ================================== 混合交互 ==================================
}
