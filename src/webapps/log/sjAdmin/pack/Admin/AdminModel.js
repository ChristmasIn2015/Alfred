import { ReactParams, ReactFunc } from './React.js'
import { LoginParams, LoginFunc } from './Login.js'
import { ShopParams, ShopFunc } from './Shop.js'

@ShopFunc
@LoginFunc
@ReactFunc
export default class Model {
    constructor() {
        this.init()
    }
    // * 初始化参数
    @ReactParams
    @LoginParams
    @ShopParams
    init() {
        this.initUserInfo() // @LoginFunc
    }
}
window.Admin
