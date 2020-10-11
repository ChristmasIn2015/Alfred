// *
// *
export function TagParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.plugTagEdit = false
        this.countTagEdit = false
        this.newPlugTag = {
            value: '',
            name: '',
        }
        this.newCountTag = {
            value: '',
            name: '',
        }
        // *
        this.plugModal = false
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
import { createTag, deleteTag, getPlugTagList } from '@/webapps/sjAdmin/views/api.js'
export function TagFunc(TargetClass) {
    // *
    TargetClass.prototype.postMyTag = postMyTag
    TargetClass.prototype.postMyCountTag = postMyCountTag
    TargetClass.prototype.deleteMyTag = deleteMyTag
    TargetClass.prototype.renderPlugList = renderPlugList
    TargetClass.prototype.togglePlugRight = togglePlugRight
}
// * 展开右侧规格列表
function togglePlugRight() {
    this.plugModal = !this.plugModal
    // *
    let list = []
    if (!this.plugModal) {
        this.plugList.forEach((plug) => {
            if (plug.checked) list.push(plug)
        })
    }
    this.plugListChecked = Object.assign([], list)
}
// * POST一个标签
async function postMyTag() {
    try {
        await createTag(null, this.newPlugTag.name, this.newPlugTag.value) // @API
        this.renderPlugList() // @Form
        $tip('添加成功')
    } catch (error) {
        $common.loadToastWarn(error)
    }
}
// * 新增计量标签
async function postMyCountTag() {
    // * 校验
    if (!this.newCountTag.name) {
        $tip('请输入库存单位')
        return
    }
    if (!this.newCountTag.value) {
        $tip('请输入库存数量')
        return
    }
    // *
    this.countList.push({
        name: this.newCountTag.name,
        value: this.newCountTag.value,
        checked: false,
    })
    $tip('添加成功')
}
// * 删除一个标签
function deleteMyTag(index, type) {
    // 0.规格
    if (type === 0) {
        this.togglePlugRight()
        let query = {
            title: '警告',
            content: '警告：删除规格会导致所有店铺/仓库下包含这个标签的商品，失去这个标签，确定要这样做吗',
        }
        $confirm(query, async (answer) => {
            try {
                if (!answer) return
                await deleteTag(this.plugList[index]._id)
                this.renderPlugList(() => (this.plugListChecked = [])) //async
                $tip('删除成功')
            } catch (error) {
                $common.loadToastWarn(error)
            }
        })
    }
    // 1.计量
    if (type === 1) {
        if (!this.countList[index]._id) this.countList.splice(index, 1)
    }
}
// * 渲染标签列表
async function renderPlugList(next) {
    try {
        let list = await getPlugTagList(null)
        list.forEach((e) => (e['checked'] = false))
        this.plugList = Object.assign([], list) // @Form
        if (next) next()
    } catch (error) {
        $common.loadToastWarn(error)
    }
}
