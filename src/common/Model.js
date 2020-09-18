// import { ApiFunc } from './decorator/API.js'
// import { AdapterFunc } from './decorator/Adapter.js'
// //
// import { PageParam, PageFunc } from './decorator/React/Page.js'
// import { ModalParam, ModalFunc } from './decorator/React/Modal.js'
// import { FilterParam, FilterFunc } from './decorator/React/Filter.js'
// * 页面的具体UI是高度定制化的 几乎不可迁移
// * 但是页面的数据, 对页面数据的控制几乎都是不变的 可迁移的
// * HTML只是数据的一个展示载体, 所以我们需要抽象页面的数据及其控制
// * 从本质上做到了即使没有HTML的情况下, 单纯通过抽象实例我们也能进行数据交互
// *
// @ApiFunc
// @AdapterFunc
// @FilterFunc
// @ModalFunc
// @PageFunc
export default class Model {
    constructor() {
        document.title = '酒店详情'
        this.initModel()
    }
    // * 初始化参数
    // @FilterParam
    // @ModalParam
    // @PageParam
    // @$common.tryCatchDecorator
    initModel() {}

    // ================================== 混合交互 ==================================
}
