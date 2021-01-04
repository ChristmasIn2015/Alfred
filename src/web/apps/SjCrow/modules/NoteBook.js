export default function NoteBook(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.bookIndex = 0
        this.bookModal = false
        this.bookContent = null
        // * 方法
        // *
        sourceFunction.apply(this, arguments)
    }
}
