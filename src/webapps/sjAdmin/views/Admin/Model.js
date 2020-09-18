import { ApiFunc } from './decorator/API.js'
// //
import { PageParam, PageFunc } from './decorator/Page.js'
import { LoginParam, LoginFunc } from './decorator/Login.js'
// * 页面的具体UI是高度定制化的 几乎不可迁移
// * 但是页面的数据, 对页面数据的控制几乎都是不变的 可迁移的
// * HTML只是数据的一个展示载体, 所以我们需要抽象页面的数据及其控制
// * 从本质上做到了即使没有HTML的情况下, 单纯通过抽象实例我们也能进行数据交互
// *
@LoginFunc
@ApiFunc
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
