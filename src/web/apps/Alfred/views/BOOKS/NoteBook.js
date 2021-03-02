import { commitBook, getBookList, bookDelete } from './api.js'
export default function NoteBook(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.shelfIdPicked = null
        this.bookIdPicked = null
        this.bookModal = false
        this.bookModel = {
            id: null,
            name: '',
            content: '',
        }
        this.books = []
        this.editorConfig = {
            modules: {
                toolbar: [['bold'], ['link', 'image'], [{ color: [] }, { background: [] }], [{ size: ['small', false, 'large', 'huge'] }]],
            },
        }
        //
        // * 方法
        this.toggleBook = toggleBook
        this.commitMyBook = commitMyBook
        this.renderBookList = renderBookList
        this.deleteBook = deleteBook
        this.renderBookContent = renderBookContent
        this.sortBooks = sortBooks

        // *
        sourceFunction.apply(this, arguments)
    }
}
function toggleBook(event, form) {
    this.bookModel = form
        ? { id: form.id, name: form.name, content: form.content }
        : {
              id: null,
              name: '',
              content: '',
          }
    this.bookModal = !this.bookModal
}
async function renderBookList(shelfId, bookId) {
    try {
        this.shelfIdPicked = shelfId || null
        this.bookIdPicked = bookId || null
        let list = await getBookList({ shelfId })

        // **** 本地添加排序功能 ****
        let map = {
            max: 0,
        }
        if (localStorage['bookSortMap']) {
            map = JSON.parse(localStorage['bookSortMap'])
            list = list.map((e) => {
                let index = map[e.id] || 0
                return Object.assign({ index }, e)
            })
        } else {
            localStorage['bookSortMap'] = JSON.stringify(map)
        }
        list.sort(function(pre, next) {
            return pre.index - next.index
        })
        // **** 本地添加排序功能 End ****

        this.books = Object.assign([], list)
    } catch (error) {
        return Promise.reject(error)
    }
}
function renderBookContent(book) {
    this.bookIdPicked = book.id
    this.bookModel = book
}
async function commitMyBook() {
    try {
        $load.show()
        if (!this.shelfIdPicked) throw new Error('请选择一个书架')
        if (!this.bookModel.name) throw new Error('名称不能为空')
        await commitBook({ shelfId: this.shelfIdPicked, bookModel: this.bookModel })
        await this.renderBookList(this.shelfIdPicked)
        this.bookModal = false
        $toast('提交成功')
        $load.hide()
    } catch (error) {
        $common.loadOff(error)
    }
}
function deleteBook(book) {
    $confirm(`确定要删除 ${book.name} 吗`, async () => {
        try {
            await bookDelete(book.id)
            await this.renderBookList(this.shelfIdPicked)
            $toast(`删除 ${book.name} 成功`)
        } catch (error) {
            $common.loadOff(error)
        }
    })
}
function sortBooks(event) {
    let map = JSON.parse(localStorage['bookSortMap'])
    this.books.forEach((e) => (map[e.id] = ++map.max))
    localStorage['bookSortMap'] = JSON.stringify(map)
}
