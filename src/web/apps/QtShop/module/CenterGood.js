import { createGoodInHouse, getGoodListInHouse } from '@/web/apps/QtShop/module/api.js'
export default function CenterGood(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.goodList = []
        this.goodListPicked = []
        // this.goodSourceList = []
        //
        this.goodListModal = false
        this.goodModelHeader = [
            { text: '品名', value: 'name' },
            { text: '规格', value: 'norm' },
            { text: '数量', value: 'count' },
            { text: '单位', value: 'countName' },
            { text: '备注', value: 'remark' },
            { text: '商品ID', value: '_id' },
        ]
        //
        this.goodModel = {
            _id: null,
            name: '',
            norm: '',
            count: 0,
            countName: '',
            remark: '',
        }
        this.goodModelList = [] // 批量添加商品
        this.goodModelListPicked = []
        this.goodModelListModal = false
        // * 方法
        this.toggleGoodList = toggleGoodList
        this.toggleGoodModelList = toggleGoodModelList
        this.renderGoodList = renderGoodList
        this.actionGood = actionGood
        //
        this.deleteGoodModel = deleteGoodModel
        this.createGoodModel = createGoodModel
        //
        sourceFunction.apply(this, arguments)
    }
}
// 展开商品列表
async function toggleGoodList() {
    try {
        this.goodListModal = !this.goodListModal
        if (this.goodListModal) {
            if (this.goodModelList.length === 0) {
                this.goodModelList = [Object.assign({}, this.goodModel)]
            }
            await this.renderGoodList()
        }
    } catch (error) {
        $common.loadOff(error)
        if (error.message === '请选择仓库') {
            $load.show()
            setTimeout(() => {
                $router.push({ path: '/hall/center' })
                $load.hide()
            }, 1000)
        }
    }
}
// 展开商品模板列表
function toggleGoodModelList() {
    this.goodModelListModal = !this.goodModelListModal
}
// 渲染
async function renderGoodList() {
    let houseId = $store.state.houseInfo._id
    if (!houseId) throw new Error('请选择仓库')
    let list = await getGoodListInHouse(houseId)
    this.goodList = Object.assign(
        [],
        list.reverse().map((e) => {
            e['picked'] = false
            return e
        })
    )
}
// 响应
async function actionGood() {
    try {
        $load.show()
        const houseId = $store.state.houseInfo._id
        if (!houseId) throw new Error('请选择仓库')
        await createGoodInHouse(houseId, this.goodModelList)
        await this.renderGoodList()
        this.goodModelListModal = false
        $tip('添加商品成功')
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
        this.goodModelListModal = false
        if (error.message === '请选择仓库') {
            $load.show()
            setTimeout(() => {
                $router.push({ path: '/hall/center' })
                $load.hide()
            }, 1000)
        }
    }
}
// 新增某个模板商品
function createGoodModel() {
    this.goodModelList.push(this.goodModel)
}
// 删除某个模板商品
function deleteGoodModel(index) {
    this.goodModelList.splice(index, 1)
}
