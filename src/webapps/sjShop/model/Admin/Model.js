import { ReactParams, ReactFunc } from './React.js'
import { LoginParams, LoginFunc } from './Login.js'
import { ShopParams, ShopFunc } from './Shop.js'
import { HouseParams, HouseFunc } from './House.js'

@HouseFunc
@ShopFunc
@LoginFunc
@ReactFunc
export default class Model {
    constructor() {
        this.init()
    }
    // *
    @ReactParams
    @LoginParams
    @ShopParams
    @HouseParams
    init() {
        document.title = ''
        this.initUserInfo() // @Login
    }
}
