export function GoodParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        this.goodTableColumn = [
            { type: 'selection', width: 60, align: 'center' },
            { title: 'Id', key: '_id', width: 150 },
            { title: '商品名称', key: 'name', width: 200 },
            { title: '商品规格', slot: 'plugList', width: 200 },
            { title: '商品库存', slot: 'countList', width: 100 },
            { title: '成本', key: 'cost', width: 100 },
            { title: '备注', key: 'tip' },
            { title: '入库时间', key: 'timeString', width: 200 },
            { title: '操作', slot: 'action', width: 200 },
        ]
        //
        this.goodModel = {
            _id: -1,
            name: '',
            plugList: [],
            countList: [
                {
                    name: '',
                    value: 0,
                },
            ],
            cost: 0,
            tip: '',
        }
        //
        this.goodList = []
        this.goodNameList = []
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
import { createGood, getGoodList, deleteGood, editGood } from './api.js'
export function GoodFunc(TargetClass) {
    TargetClass.prototype.initGoodModel = initGoodModel
    TargetClass.prototype.renderGoodList = renderGoodList
    TargetClass.prototype.postGood = postGood
    TargetClass.prototype.deleteMyGood = deleteMyGood
    //
    TargetClass.prototype.addGoodCount = addGoodCount
    TargetClass.prototype.deleteGoodCount = deleteGoodCount
}
// * 渲染 goodList 字段
async function renderGoodList() {
    try {
        let houseId = $store.state.houseInfo._id
        if (!houseId) throw new Error('获取仓库信息失败')
        let list = await getGoodList(houseId) // @API
        this.goodList = Object.assign([], list)

        // ** 商品名称列表
        let tempSet = new Set()
        list.forEach((good) => tempSet.add(good.name))
        let tempList = []
        tempSet.forEach((goodName) =>
            tempList.push({
                label: goodName,
                value: goodName,
            })
        )
        this.goodNameList = Object.assign([], tempList)

        // ** 商品名称添加筛选
        this.goodTableColumn[2] = {
            title: '商品名称',
            key: 'name',
            width: 200,
            filters: this.goodNameList,
            filterMethod: (goodName, row) => {
                return row.name == goodName
            },
        }
        // ** 商品规格添加筛选
        tempSet = new Set()
        // this.goodTableColumn[3] = {
        //     title: '商品规格',
        //     key: 'name',
        //     width: 200,
        //     filters: this.goodNameList,
        //     filterMethod: (goodName, row) => {
        //         return row.name == goodName
        //     },
        // }
        this.goodTableColumn = Object.assign([], this.goodTableColumn)
    } catch (error) {
        return Promise.reject(error)
    }
}
// * 初始化商品表单
function initGoodModel(model) {
    model = model || {}
    this.goodModel._id = model._id || -1
    this.goodModel.name = model.name || ''
    this.goodModel.plugList = model.plugList ? Object.assign([], model.plugList) : []
    this.goodModel.countList = model.countList
        ? Object.assign([], model.countList)
        : [
              {
                  name: '',
                  value: 0,
              },
          ]
    this.goodModel.cost = model.cost || 0
    this.goodModel.tip = model.tip || ''
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
        if (this.goodModel._id !== -1) {
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
// * 删除商品
function deleteMyGood(index) {
    try {
        let target = this.goodList[index]
        if (target)
            $confirm(`确定要删除 ${target.name} 吗`, async () => {
                try {
                    await deleteGood($store.state.houseInfo._id, target._id)
                    $tip('删除成功')
                    this.renderGoodList() // @Good
                } catch (error) {
                    return Promise.reject(error)
                }
            })
    } catch (error) {
        return Promise.resolve(error)
    }
}
// * 添加新单位
function addGoodCount() {
    // @Good
    this.goodModel.countList.push({
        value: '',
        name: '',
    })
}
// * 删除单位
function deleteGoodCount(index) {
    // @Good
    if (this.goodModel.countList[index]) this.goodModel.countList.splice(index, 1)
}
