import { createTag, deleteTag, getPlugTagList } from './api.js'
export default function Tag(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.tagList = []
        //
        this.tagModal = false
        this.tagEdit = false
        this.tagModel = {
            value: '',
            name: '',
        }
        //
        // * 方法
        this.renderTagList = renderTagList
        this.createMyTag = createMyTag
        this.deleteMyTag = deleteMyTag
        this.getTagListChecked = getTagListChecked
        // *
        sourceFunction.apply(this, arguments)
    }
}
// 渲染标签列表
async function renderTagList(checkedList) {
    try {
        let list = await getPlugTagList(null)
        list.forEach((e) => {
            e['checked'] = false
            if (checkedList) checkedList.forEach((m) => (e._id === m._id ? (e['checked'] = true) : ''))
        })
        this.tagList = Object.assign([], list)
    } catch (error) {
        return Promise.reject(error)
    }
}
// 创建一个全局标签
async function createMyTag() {
    try {
        await createTag(null, this.tagModel.name, this.tagModel.value) // goodId name value
        $tip('添加成功')
        await this.renderTagList() // @Tag
    } catch (error) {
        $common.loadOff(error)
    }
}
// 删除一个标签
function deleteMyTag(tagId) {
    // 0.规格
    $confirm('删除规格会导致所有店铺/仓库下包含这个标签的商品，失去这个标签，确定要这样做吗', async () => {
        try {
            await deleteTag(tagId)
            this.tagEdit = false
            await this.renderTagList() //@Tag
            $tip('删除成功')
        } catch (error) {
            $common.loadOff(error)
        }
    })
}
// 获取已选择的标签列表
function getTagListChecked() {
    let list = []
    this.tagList.forEach((e) => (e.checked ? list.push(e) : ''))
    return list
}
