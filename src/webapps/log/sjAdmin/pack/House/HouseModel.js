// *
// *
import { GoodParam, GoodFunc } from './Good.js'
import { OrderParam, OrderFunc } from './Order.js'
import { FilterParam, FilterFunc } from './Filter.js'
// *
@FilterFunc
@GoodFunc
@OrderFunc
export default class Model {
    constructor() {
        this.start()
    }
    // * 初始化参数
    @FilterParam
    @GoodParam
    @OrderParam
    start() {
        this.getMyGoodList() // @Good
    }

    // ================================== 混合交互 ==================================
}
