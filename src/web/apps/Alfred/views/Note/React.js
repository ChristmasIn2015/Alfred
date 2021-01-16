import NoteArea from '@/web/apps/Alfred/modules/NoteArea.js'
import NoteShelf from '@/web/apps/Alfred/modules/NoteShelf.js'
import NoteBook from '@/web/apps/Alfred/modules/NoteBook.js'

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
