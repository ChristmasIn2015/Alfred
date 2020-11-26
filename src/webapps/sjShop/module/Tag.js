import { createTag, deleteTag, getPlugTagList } from './api.js'
export default function Tag(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.tagModal = false
        this.tagModel = {
            value: '',
            name: '',
        }
        this.tagList = []
        this.tagEdit = false
        // this.plugTagSimpleList = []
        // * 方法
        this.renderTagList = renderTagList
        this.createMyTag = createMyTag
        this.deleteMyTag = deleteMyTag
        this.getTagListChecked = getTagListChecked
        // *
        sourceFunction.apply(this, arguments)
    }
}
// * 渲染标签列表
async function renderTagList(plugListChecked) {
    try {
        let list = await getPlugTagList(null)
        list.forEach((e) => {
            e['checked'] = false
            if (plugListChecked) plugListChecked.forEach((m) => (e._id === m._id ? (e['checked'] = true) : ''))
        })
        this.tagList = Object.assign([], list)
    } catch (error) {
        return Promise.reject(error)
    }
}
// * 创建一个标签
async function createMyTag() {
    try {
        await createTag(null, this.tagModel.name, this.tagModel.value) // goodId name value
        $tip('添加成功')
        this.renderTagList() // @Tag
    } catch (error) {
        return Promise.reject(error)
    }
}
// * 删除一个标签
function deleteMyTag(tagId, type) {
    // 0.规格
    if (type === 0) {
        $confirm('删除规格会导致所有店铺/仓库下包含这个标签的商品，失去这个标签，确定要这样做吗', async () => {
            try {
                await deleteTag(tagId)
                this.tagEdit = false
                this.renderTagList() //@Tag
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
// *
function getTagListChecked() {
    let list = []
    this.tagList.forEach((e) => (e.checked ? list.push(e) : ''))
    return list
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
