import { commitShelf, getShelfList, shelfDelete } from './api.js'
export default function NoteShelf(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.areaIdPicked = null
        this.shelfModal = false
        this.shelfModel = {
            id: null,
            name: '',
        }
        this.shelfs = []
        //
        // * 方法
        this.toggleShelf = toggleShelf
        this.commitMyShelf = commitMyShelf
        this.renderShelfList = renderShelfList
        this.deleteShelf = deleteShelf

        // *
        sourceFunction.apply(this, arguments)
    }
}
function toggleShelf(event, form) {
    this.shelfModel = form
        ? { id: form.id, name: form.name }
        : {
              id: null,
              name: '',
          }
    this.shelfModal = !this.shelfModal
}
async function renderShelfList(areaId) {
    try {
        this.areaIdPicked = areaId || null
        let list = await getShelfList({ areaId })
        this.shelfs = Object.assign([], list)
        this.shelfIdPicked = null
        this.books = [] // @NoteBook
    } catch (error) {
        return Promise.reject(error)
    }
}
async function commitMyShelf() {
    try {
        $load.show()
        if (!this.areaIdPicked) throw new Error('请选择一个知识区域')
        if (!this.shelfModel.name) throw new Error('名称不能为空')
        await commitShelf({ areaId: this.areaIdPicked, shelfModel: this.shelfModel })
        await this.renderShelfList(this.areaIdPicked)
        this.shelfModal = false
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
    }
}
function deleteShelf(shelf) {
    $confirm(`确定要删除 ${shelf.name} 吗`, async () => {
        try {
            $load.show()
            await shelfDelete(shelf.id)
            await this.renderShelfList(this.areaIdPicked)
            $toast(`删除 ${shelf.name} 成功`)
            $load.hide()
        } catch (error) {
            $common.loadOff(error)
        }
    })
}
