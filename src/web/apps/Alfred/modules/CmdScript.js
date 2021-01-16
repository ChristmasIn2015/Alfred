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
        this.sortCmds = sortCmds
        //
        this.excuteCMD = excuteCMD
        this.killCmd = killCmd
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

        // **** 本地添加排序功能 ****
        let map = {
            max: 0,
        }
        if (localStorage['cmdSortMap']) {
            map = JSON.parse(localStorage['cmdSortMap'])
            list = list.map((e) => {
                let index = map[e.id] || 0
                return Object.assign({ index }, e)
            })
        } else {
            localStorage['cmdSortMap'] = JSON.stringify(map)
        }
        list.sort(function(pre, next) {
            return pre.index - next.index
        })
        // **** 本地添加排序功能 End ****

        list.forEach((e) => {
            e['log'] = ''
            e['pid'] = false
        })
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
            $toast(`删除 ${script.name} 成功`)
        } catch (error) {
            $common.loadOff(error)
        }
    })
}
function sortCmds(event) {
    let map = JSON.parse(localStorage['cmdSortMap'])
    this.scripts.forEach((e) => (map[e.id] = ++map.max))
    localStorage['cmdSortMap'] = JSON.stringify(map)
}
// 通知主进程执行CMD命令
function excuteCMD(index) {
    // 0.参数准备
    this.scripts[index].log = ''
    this.scripts[index].pid = '...'
    let target = this.scripts[index]
    // 1.清空接收器
    $electron.ipcRenderer.removeAllListeners('excuteCMD')
    // 2.注册接收器
    $electron.ipcRenderer.on('excuteCMD', (event, params) => {
        // params: {index, message, running}
        this.scripts[params.index].log += `${params.message}<br>`
        this.scripts[params.index].pid = params.pid
    })
    // 3.发送执行命令
    $electron.ipcRenderer.send('excuteCMD', { index, kill: false, path: target.path })
}
// 通知主进程结束某个CMD
function killCmd(pid) {
    $electron.ipcRenderer.send('excuteCMD', { kill: pid })
}
