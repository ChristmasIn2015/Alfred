import NoteArea from '@/web/apps/Solomon/modules/NoteArea.js'
import NoteShelf from '@/web/apps/Solomon/modules/NoteShelf.js'
import NoteBook from '@/web/apps/Solomon/modules/NoteBook.js'

export default class React {
    constructor() {
        this.initReact()
    }
    // *
    @NoteArea
    @NoteShelf
    @NoteBook
    @$common.TryCatch
    async initReact() {
        await this.renderArea() // @NoteArea
    }
}
