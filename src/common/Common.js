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
    constructor() {}

    // ****************************** 混合操作 ******************************
    getHeader() {
        let token = localStorage['sjShopToken']
        let config = { authorization: token || '' }
        return config
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
                $load.show()
                await sourceFunction.apply(this, arguments)
                $load.hide()
            } catch (error) {
                $common.loadToastWarn(error)
            }
        }
    }
}
