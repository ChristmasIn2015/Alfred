// *
// *
export function TagParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.plugModel = {
            value: '',
            name: '',
        }
        this.tagModel = {
            value: '',
            name: '',
        }
        // *
        this.plugTagList = []
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
import { createTag, deleteTag, getPlugTagList } from '../api.js'
export function TagFunc(TargetClass) {
    TargetClass.prototype.createPlugTag = createPlugTag
    TargetClass.prototype.renderPlugTagList = renderPlugTagList
    TargetClass.prototype.getTagModalInfo = getTagModalInfo
}
// * 渲染标签列表 goodId
async function renderPlugTagList(plugListChecked) {
    try {
        let list = await getPlugTagList(null)
        list.forEach((e) => {
            e['checked'] = false
            plugListChecked.forEach((m) => (e._id === m._id ? (e['checked'] = true) : ''))
        })
        this.plugTagList = Object.assign([], list)
    } catch (error) {
        $common.loadOff(error)
    }
}
// * 创建一个标签 goodId name value
async function createPlugTag() {
    try {
        await createTag(null, this.plugModel.name, this.plugModel.value) // @API
        $tip('添加成功')
        this.renderPlugTagList() // @Tag
    } catch (error) {
        $common.loadOff(error)
    }
}
// * 取得Modal有效信息
function getTagModalInfo() {
    let info = {
        plugTagList: [],
    }
    this.plugTagList.forEach((plug) => {
        if (plug.checked) info.plugTagList.push(plug)
    })
    return info
}

function initTagModel(model) {
    model = model || {}
    this.plugTagList = model.plugTagList ? Object.assign([], model.plugTagList) : []
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
                $common.loadOff(error)
            }
        })
    }
    // 1.计量
    if (type === 1) {
        if (!this.countList[index]._id) this.countList.splice(index, 1)
    }
}
