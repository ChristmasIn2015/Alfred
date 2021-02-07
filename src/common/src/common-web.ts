import { Common } from '../modules/Common'
import UtilsReactWeb from '../modules/Utils/UtilsReactWeb'
class WebCommon extends Common {
    constructor() {
        super()
        this.bindClass(this, 'UtilsReactWeb', UtilsReactWeb)
    }
}
window['$common'] = new WebCommon()
