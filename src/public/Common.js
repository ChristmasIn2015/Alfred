//
import './css/default.scss'
//
import Utils from './modules/Utils.js'
import React from './modules/React.js'
import Log from './modules/Log.js'
import Server from './modules/Server.js'
import Rem from './modules/Rem.js'

//
@Server
@React
@Utils
@Log
export default class Common {
    constructor() {
        this.init()
    }

    @Rem
    init() {}
}
window.$common = new Common()
