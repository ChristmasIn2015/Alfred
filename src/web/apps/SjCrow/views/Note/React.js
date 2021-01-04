import NoteArea from '@/web/apps/SjCrow/modules/NoteArea.js'
import NoteShelf from '@/web/apps/SjCrow/modules/NoteShelf.js'
import NoteBook from '@/web/apps/SjCrow/modules/NoteBook.js'

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
