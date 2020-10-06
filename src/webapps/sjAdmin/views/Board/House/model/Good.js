// *
// *
export function GoodParam(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        this.goodList = []
        this.goodEditModel = {
            id: -1,
            name: '',
            plugList: [],
            countList: [],
            cost: '',
            tip: '',
        }
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
import {
    createGood,
    getGoodList,
    deleteGood,
    editGood,
} from '@/webapps/sjAdmin/views/api.js'
export function GoodFunc(TargetClass) {
    TargetClass.prototype.pickGood = pickGood
    TargetClass.prototype.getMyGoodList = getMyGoodList
    TargetClass.prototype.addMyGood = addMyGood
    TargetClass.prototype.deleteMyGood = deleteMyGood
    TargetClass.prototype.editMyGood = editMyGood
}
// * 选择一个商品
function pickGood(good) {
    good.checked = !good.checked
    this.initGoodFiltedList() // @Filter
}
// * 获取某个仓库下所有商品
async function getMyGoodList() {
    try {
        let list = await getGoodList(window.$store.state.houseInfo._id) // @API
        list.forEach((good) => {
            good['checked'] = false
        })
        this.goodList = Object.assign([], list.reverse())
        this.initGoodFiltedList() // @Filter
    } catch (error) {
        $common.loadToastWarn(error)
    }
}
// * 添加商品
async function addMyGood() {
    try {
        await createGood(
            $store.state.houseInfo._id,
            this.goodEditModel.name,
            this.goodEditModel.plugList,
            this.goodEditModel.countList,
            this.goodEditModel.cost,
            this.goodEditModel.tip
        ) // @API
        $tip('入库成功！')
        this.getMyGoodList() // ASYNC
    } catch (error) {
        $common.loadToastWarn(error)
    }
}
// * 编辑商品
async function editMyGood() {
    try {
        await editGood(
            $store.state.houseInfo._id,
            this.goodEditModel._id, // add
            this.goodEditModel.name,
            this.goodEditModel.plugList,
            this.goodEditModel.countList,
            this.goodEditModel.cost,
            this.goodEditModel.tip
        ) // @API
        $tip('编辑成功！')
        this.getMyGoodList() // ASYNC
    } catch (error) {
        $common.loadToastWarn(error)
    }
}
// * 删除商品
async function deleteMyGood(goodId) {
    $confirm(
        { title: '警告', content: '确定要删除这个商品吗' },
        async (answer) => {
            if (!answer) return
            try {
                let houseInfo = window.$store.state.houseInfo
                await deleteGood(houseInfo._id, goodId)
                $tip('删除成功！')
                this.getMyGoodList() // ASYNC
            } catch (error) {
                $common.loadToastWarn(error)
            }
        }
    )
}
