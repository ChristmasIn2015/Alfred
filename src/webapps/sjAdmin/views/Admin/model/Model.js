// *
// *
import { PageParam, PageFunc } from './Page.js'
import { LoginParam, LoginFunc } from './Login.js'
@LoginFunc
@PageFunc
export default class Model {
    constructor() {
        this.initModel()
    }
    // * 初始化参数
    // @FilterParam
    @LoginParam
    @PageParam
    initModel() {
        this.initUserInfo() // @LoginFunc
    }

    // ================================== 混合交互 ==================================
}
