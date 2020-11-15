import { GoodParams, GoodFunc } from '../Public/Good.js'
import { TagParams, TagFunc } from '../Public/Tag.js'
import { ReactParams, ReactFunc } from './React.js'

@ReactFunc
@TagFunc
@GoodFunc
export default class Model {
    constructor() {
        this.init()
    }
    // *
    @ReactParams
    @TagParams
    @GoodParams
    init() {
        this.renderGoodList() // @Good
    }
}
