import { commitShelf, getShelfList, areaDelete } from './api.js'
export default function NoteShelf(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.areaIdPicked = 0
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
        this.renderShelf = renderShelf
        // this.deleteArea = deleteArea

        // *
        sourceFunction.apply(this, arguments)
    }
}
function toggleShelf(form) {
    this.shelfModel = form
        ? { id: form.id, name: form.name }
        : {
              id: null,
              name: '',
          }
    this.shelfModal = !this.shelfModal
}
async function renderShelf(areaId) {
    try {
        $load.show()
        this.areaIdPicked = areaId
        let list = await getShelfList(areaId)
        this.shelfs = Object.assign([], list)
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
async function commitMyShelf() {
    try {
        $load.show()
        if (!this.shelfModel.name) throw new Error('名称不能为空')
        await commitShelf(this.areaIdPicked, this.shelfModel)
        await this.renderArea() // @NoteArea
        this.shelfModal = false
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
    }
}
function deleteArea(area) {
    $confirm(`确定要删除 ${area.name} 吗`, async () => {
        try {
            await areaDelete(area.id)
            await this.renderArea()
            $tip(`删除 ${area.name} 成功`)
        } catch (error) {
            $common.loadOff(error)
        }
    })
}
