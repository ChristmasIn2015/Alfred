import { commitArea, getAreaList, areaDelete } from '../../../../appsOld/Solomon/modules/api.js'
export default function NoteArea(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.areaModal = false
        this.areaModel = {
            id: null,
            name: '',
        }
        this.areas = []
        //
        // * 方法
        this.toggleArea = toggleArea
        this.commitMyArea = commitMyArea
        this.renderArea = renderArea
        this.deleteArea = deleteArea

        // *
        sourceFunction.apply(this, arguments)
    }
}
function toggleArea(event, form) {
    this.areaModel = form
        ? { id: form.id, name: form.name }
        : {
              id: null,
              name: '',
          }
    this.areaModal = !this.areaModal
}
async function renderArea() {
    try {
        $load.show()
        let list = await getAreaList()
        this.areas = Object.assign([], list)
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}
async function commitMyArea() {
    try {
        $load.show()
        if (!this.areaModel.name) throw new Error('名称不能为空')
        await commitArea(this.areaModel)
        await this.renderArea()
        this.areaModal = false
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
            this.shelfIdPicked = null // @NoteShelf
            this.shelfs = [] // @NoteShelf
            $toast(`删除 ${area.name} 成功`)
        } catch (error) {
            $common.loadOff(error)
        }
    })
}
