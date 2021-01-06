import { commitBat, getBatList, batDelete } from './api.js'
export default function CmdScript(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.scriptModal = false
        this.scriptModel = {
            id: null,
            name: '',
            path: '',
        }
        this.scripts = []
        //
        // * 方法
        this.toggleScript = toggleScript
        this.pickScript = pickScript
        this.commitMyScript = commitMyScript
        this.renderScripts = renderScripts
        this.deleteBat = deleteBat
        // *
        sourceFunction.apply(this, arguments)
    }
}

function toggleScript(event, form) {
    this.scriptModel = form
        ? { id: form.id, name: form.name, path: form.path }
        : {
              id: null,
              name: '',
              path: '',
          }
    this.scriptModal = !this.scriptModal
}
function pickScript() {
    $common.getLocalFile(false, '*/*', (event) => {
        try {
            let result = event.target.files[0]
            if (!result) throw new Error('找不到文件')
            if (!result.path) throw new Error('找不到文件路径')
            if (result.type !== 'text/javascript') throw new Error('仅支持 .js')
            this.scriptModel.path = result.path
        } catch (error) {
            $warn(error.message)
        }
    })
}
async function commitMyScript() {
    try {
        $load.show()
        if (!this.scriptModel.name) throw new Error('名称不能为空')
        if (!this.scriptModel.path) throw new Error('路径不能为空')
        await commitBat(this.scriptModel)
        await this.renderScripts()
        this.scriptModal = false
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
    }
}

async function renderScripts() {
    try {
        $load.show()
        let list = await getBatList()
        this.scripts = Object.assign([], list)
        $load.hide()
    } catch (error) {
        return Promise.reject(error)
    }
}

function deleteBat(script) {
    $confirm(`确定要删除 ${script.name} 吗`, async () => {
        try {
            await batDelete(script.id)
            await this.renderScripts()
            $tip(`删除 ${script.name} 成功`)
        } catch (error) {
            $common.loadOff(error)
        }
    })
}
