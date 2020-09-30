// *
// *
// import { TagParams, TagFunc } from './Tag.js'
import { FormParams, FormFunc } from './Form.js'

@FormFunc
// @TagFunc
export default class Model {
    constructor() {
        this.start()
    }

    @FormParams
    // @TagParams
    start() {}
}
