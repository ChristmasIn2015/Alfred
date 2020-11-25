import { createTag, deleteTag, getPlugTagList } from './api.js'
export default function Tag(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.plugModel = {
            value: '',
            name: '',
        }
        this.tagModel = {
            value: '',
            name: '',
        }
        this.plugTagList = []
        this.plugTagSimpleList = []
        // * 方法
        this.createPlugTag = createPlugTag
        this.renderPlugTagList = renderPlugTagList
        this.getTagModalInfo = getTagModalInfo
        this.deleteMyTag = deleteMyTag
        // *
        sourceFunction.apply(this, arguments)
    }
}
// * 渲染标签列表 goodId
async function renderPlugTagList(plugListChecked) {
    try {
        let list = await getPlugTagList(null)
        list.forEach((e) => {
            e['checked'] = false
            if (plugListChecked) plugListChecked.forEach((m) => (e._id === m._id ? (e['checked'] = true) : ''))
        })
        this.plugTagList = Object.assign([], list)
    } catch (error) {
        return Promise.reject(error)
    }
}
// * 创建一个标签 goodId name value
async function createPlugTag() {
    try {
        await createTag(null, this.plugModel.name, this.plugModel.value) // @API
        $tip('添加成功')
        this.renderPlugTagList() // @Tag
    } catch (error) {
        return Promise.reject(error)
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
// * 删除一个标签
function deleteMyTag(tagId, type) {
    // 0.规格
    if (type === 0) {
        $confirm('删除规格会导致所有店铺/仓库下包含这个标签的商品，失去这个标签，确定要这样做吗', async () => {
            try {
                await deleteTag(tagId)
                this.renderPlugTagList() //@Tag
                $tip('删除成功')
            } catch (error) {
                return Promise.reject(error)
            }
        })
    }
    // 1.计量
    // if (type === 1) {
    //     if (!this.countList[index]._id) this.countList.splice(index, 1)
    // }
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