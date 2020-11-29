import { createGood, getGoodList, deleteGood, editGood } from './api.js'
export default function Good(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.goodListModal = false
        this.goodSourceList = []
        this.goodList = []
        //
        this.goodModal = false
        this.goodModel = {
            _id: -1,
            name: '',
            plugList: [],
            countList: [],
            cost: '',
            tip: '',
        }
        // * 方法
        this.renderGoodList = renderGoodList
        this.initGoodModel = initGoodModel
        this.addGoodCount = addGoodCount
        this.deleteGoodCount = deleteGoodCount
        this.postGood = postGood
        this.deleteMyGood = deleteMyGood
        //
        sourceFunction.apply(this, arguments)
    }
}
// 渲染商品列表
async function renderGoodList() {
    try {
        let houseId = $store.state.houseInfo._id
        if (!houseId) throw new Error('请选择仓库')
        let list = await getGoodList(houseId)
        this.goodSourceList = Object.assign([], list) // @Good
        this.goodList = Object.assign([], list) // @Good
    } catch (error) {
        return Promise.reject(error)
    }
}
// 商品表单 初始化
function initGoodModel(model) {
    model = model || {}
    let newCountList = [
        {
            name: '张',
            value: 0,
        },
    ]
    this.goodModel = {
        _id: model._id || null,
        name: model.name || '',
        plugList: model.plugList || [],
        countList: model.countList || newCountList,
        cost: model.cost || '',
        tip: model.tip || '',
    }
}
// 商品表单 添加一个新单位
function addGoodCount() {
    this.goodModel.countList.push({
        name: '吨',
        value: 0,
    })
}
// 商品表单 删除一个新单位
function deleteGoodCount(index) {
    this.goodModel.countList.splice(index, 1)
}
// 添加/编辑商品
async function postGood() {
    try {
        // ** 1
        this.goodModel.countList.forEach((count) => {
            if (typeof count.value === '') throw new Error('请输入库存数量')
            if (typeof count.name === '') throw new Error('请输入库存单位')
        })
        // ** 2
        if (this.goodModel._id) {
            await editGood(
                $store.state.houseInfo._id,
                this.goodModel._id,
                this.goodModel.name,
                this.goodModel.plugList,
                this.goodModel.countList,
                this.goodModel.cost,
                this.goodModel.tip
            )
            $tip(`编辑 ${this.goodModel.name} 成功`)
        } else {
            await createGood(
                $store.state.houseInfo._id,
                this.goodModel.name,
                this.goodModel.plugList,
                this.goodModel.countList,
                this.goodModel.cost,
                this.goodModel.tip
            )
            $tip(`添加 ${this.goodModel.name} 成功`)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}
// 删除商品
function deleteMyGood(good) {
    $confirm(`确定要删除 ${good.name} 吗`, async () => {
        try {
            await deleteGood($store.state.houseInfo._id, good._id)
            $tip('删除成功')
            await this.renderGoodList() // @Good
            await this.renderGoodNameList() // @GoodFilter
        } catch (error) {
            $common.loadOff(error)
        }
    })
}
