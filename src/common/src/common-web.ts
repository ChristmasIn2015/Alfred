import { Common } from '../modules/Common'
import UtilsWebReact from '../modules/Utils/UtilsWebReact'
class WebCommon extends Common {
    constructor() {
        super()
        this.bindClass(this, 'UtilsWebReact', UtilsWebReact)
    }
}
window['$common'] = new WebCommon()
