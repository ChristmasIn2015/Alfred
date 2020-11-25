// *
// *
import { OrderParam, OrderFunc } from './Order.js'
// *
@OrderFunc
export default class Model {
    constructor() {
        this.start()
    }
    // * 初始化参数
    @OrderParam
    start() {
        this.getMyOrderList() // @Order
    }

    // ================================== 混合交互 ==================================
}
