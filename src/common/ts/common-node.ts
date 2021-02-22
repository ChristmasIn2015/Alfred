import { Common } from '../modules/Common'
import UtilsReactNode from '../modules/Utils/UtilsReactNode'
class NodeCommon extends Common {
    constructor() {
        super()
        this.bindClass(this, 'UtilsReactNode', UtilsReactNode)
    }
}
global['$common'] = new NodeCommon()
