import PureFun from './decorator/Pure.js'
import ErrorPost from './decorator/ErrorPost.js'
import Server from './decorator/Server.js'
import SjUI from './decorator/sjUI.js'

//
@SjUI
@Server
@ErrorPost
@PureFun
export default class Common {
    constructor() {
        this.setPublicServer()
    }

    // ****************************** 混合操作 ******************************
    setPublicServer() {
        let MyServer = this.Server
        this._Server = new MyServer(
            // 成功
            (result, resolve, reject) => {
                result = result.data
                result.code === 200 ? resolve(result.data) : reject(result.message)
            },
            // 失败
            (error, reject) => reject(error.message)
        )
    }
    getLocalToken() {
        let token = localStorage['sjShopToken']
        return { header: { authorization: token || '' } }
    }
    // try/catch
    loadToastWarn(error) {
        if (typeof error === 'object') error = error.message
        window.$tip(error)
        window.$load.hide()
        window.$warn(error)
        $common.postMyError('loadToastWarn ' + error)
    }
    tryCatchDecorator(target, name, descriptor) {
        let sourceFunction = descriptor.value
        descriptor.value = async function() {
            try {
                $load.show($common.mainColor)
                await sourceFunction.apply(this, arguments)
                $load.hide()
            } catch (error) {
                $common.loadToastWarn(error)
            }
        }
    }
}
