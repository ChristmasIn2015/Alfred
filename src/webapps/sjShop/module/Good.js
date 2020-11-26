import { createGood, getGoodList, deleteGood, editGood } from './api.js'
export default function Good(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.goodTableColumn = [
            { title: 'Id', key: '_id', width: 135 },
            { title: '商品名称', key: 'name', width: 120 },
            { title: '商品规格', slot: 'plugList', width: 200 },
            { title: '商品库存', slot: 'countList', width: 100 },
            { title: '成本', key: 'cost', width: 100 },
            { title: '备注', key: 'tip' },
            { title: '入库时间', key: 'timeString', width: 200 },
            { title: '操作', slot: 'action', width: 200 },
        ]
        this.goodModal = false
        this.goodList = []
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
// * 渲染商品列表
async function renderGoodList() {
    try {
        let houseId = $store.state.houseInfo._id
        if (!houseId) throw new Error('请选择仓库')
        let list = await getGoodList(houseId) // @API
        this.goodList = Object.assign([], list)
    } catch (error) {
        return Promise.reject(error)
    }
}
// * 初始化商品表单
function initGoodModel(model) {
    model = model || {}
    this.goodModel._id = model._id || -1
    this.goodModel.name = model.name || ''
    this.goodModel.plugList = model.plugList || []
    let newCountList = [
        {
            name: '张',
            value: 0,
        },
    ]
    this.goodModel.countList = model.countList || newCountList
    this.goodModel.cost = model.cost || ''
    this.goodModel.tip = model.tip || ''
}
// * 添加新单位
function addGoodCount() {
    // @Good
    this.goodModel.countList.push({
        name: '吨',
        value: 0,
    })
}
// * 删除单位
function deleteGoodCount(index) {
    // @Good
    if (this.goodModel.countList[index]) this.goodModel.countList.splice(index, 1)
}
// * 添加/编辑商品
async function postGood() {
    try {
        // ** 1
        this.goodModel.countList.forEach((count) => {
            if (typeof count.value === '') throw new Error('请输入库存数量')
            if (typeof count.name === '') throw new Error('请输入库存单位')
        })
        // ** 2
        if (this.goodModel._id === -1) {
            await createGood(
                $store.state.houseInfo._id,
                this.goodModel.name,
                this.goodModel.plugList,
                this.goodModel.countList,
                this.goodModel.cost,
                this.goodModel.tip
            )
            $tip(`添加 ${this.goodModel.name} 成功`)
        } else {
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
        }
    } catch (error) {
        return Promise.reject(error)
    }
}
// * 删除商品
function deleteMyGood(good) {
    $confirm(`确定要删除 ${good.name} 吗`, async () => {
        try {
            await deleteGood($store.state.houseInfo._id, good._id)
            $tip('删除成功')
            this.renderGoodList() // @Good
            this.renderGoodNameList() // @GoodFilter
        } catch (error) {
            return Promise.reject(error)
        }
    })
}
