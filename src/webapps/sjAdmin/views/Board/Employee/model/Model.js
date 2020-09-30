// *
// *
import { CoreParam, CoreFunc } from './Core.js'
@CoreFunc
export default class Model {
    constructor() {
        this.initModel()
    }
    // * 初始化参数
    @CoreParam
    initModel() {
        this.getMyEmployeeList() // @Page
    }

    // ================================== 混合交互 ==================================
}
