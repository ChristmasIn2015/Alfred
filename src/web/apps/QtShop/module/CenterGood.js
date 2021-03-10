import { createGoodInHouse, getGoodListInHouse } from '@/web/apps/QtShop/module/api.js'
export default function CenterGood(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.goodList = []
        // this.goodSourceList = []
        //
        this.goodListModal = false
        this.goodModel = {
            _id: null,
            name: '',
            norm: '',
            count: 0,
            countName: '',
            remark: '',
        }
        this.goodModelList = [] // 批量添加商品
        // * 方法
        this.toggleGoodList = toggleGoodList
        this.renderGoodList = renderGoodList
        // this.initGoodModel = initGoodModel
        // this.addGoodCount = addGoodCount
        // this.deleteGoodCount = deleteGoodCount
        // this.postGood = postGood
        // this.deleteMyGood = deleteMyGood
        //
        sourceFunction.apply(this, arguments)
    }
}
//
function toggleGoodList() {
    this.goodListModal = !this.goodListModal
    if (this.goodListModal) {
        if (this.goodModelList.length === 0) this.goodModelList.push(this.goodModel)
    } else {
        //
    }
}
// 渲染商品列表
async function renderGoodList() {
    let houseId = $store.state.houseInfo._id
    if (!houseId) throw new Error('请选择仓库')
    let list = await getGoodListInHouse(houseId)
    this.goodList = Object.assign([], list)
    // this.goodSourceList = Object.assign([], list)
}
// 商品表单 初始化
function initGoodModel(model) {
    // model = model || {}
    // let newCountList = [
    //     {
    //         name: '张',
    //         value: 0,
    //     },
    // ]
    // this.goodModel = {
    //     _id: model._id || null,
    //     name: model.name || '',
    //     plugList: model.plugList || [],
    //     countList: model.countList || newCountList,
    //     cost: model.cost || '',
    //     tip: model.tip || '',
    // }
}
// 添加/编辑商品
async function postGood() {
    // try {
    //     // ** 1
    //     this.goodModel.countList.forEach((count) => {
    //         if (typeof count.value === '') throw new Error('请输入库存数量')
    //         if (typeof count.name === '') throw new Error('请输入库存单位')
    //     })
    //     // ** 2
    //     if (this.goodModel._id) {
    //         await editGood(
    //             $store.state.houseInfo._id,
    //             this.goodModel._id,
    //             this.goodModel.name,
    //             this.goodModel.plugList,
    //             this.goodModel.countList,
    //             this.goodModel.cost,
    //             this.goodModel.tip
    //         )
    //         $tip(`编辑 ${this.goodModel.name} 成功`)
    //     } else {
    //         await createGood(
    //             $store.state.houseInfo._id,
    //             this.goodModel.name,
    //             this.goodModel.plugList,
    //             this.goodModel.countList,
    //             this.goodModel.cost,
    //             this.goodModel.tip
    //         )
    //         $tip(`添加 ${this.goodModel.name} 成功`)
    //     }
    // } catch (error) {
    //     return Promise.reject(error)
    // }
}
// 删除商品
function deleteMyGood(good) {
    // $confirm(`确定要删除 ${good.name} 吗`, async () => {
    //     try {
    //         await deleteGood($store.state.houseInfo._id, good._id)
    //         $tip('删除成功')
    //         await this.renderGoodList() // @Good
    //         await this.renderGoodNameList() // @GoodFilter
    //     } catch (error) {
    //         $common.loadOff(error)
    //     }
    // })
}
