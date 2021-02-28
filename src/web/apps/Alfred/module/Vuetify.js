export default function Vuetify(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * params
        this.loadding = false
        this.success = false
        this.successTip = ''
        this.warn = false
        this.warnTip = ''
        //
        this.confirm = false
        this.confirmTitle = ''
        this.confirmContent = ''
        this.confirmNext = null
        // * function
        this.vuetifyLoadShow = vuetifyLoadShow
        this.vuetifyLoadHide = vuetifyLoadHide
        this.vuetifyTip = vuetifyTip
        this.vuetifyWarn = vuetifyWarn
        this.vuetifyConfirm = vuetifyConfirm
        this.confirmAnswer = confirmAnswer
        // *
        sourceFunction.apply(this, arguments)
    }
    return descriptor
}
function vuetifyLoadShow() {
    this.loadding = true
}
function vuetifyLoadHide() {
    this.loadding = false
}
function vuetifyTip(message) {
    this.success = true
    this.successTip = message
}
function vuetifyWarn(message) {
    this.warn = true
    this.warnTip = message
}
// 唤起确认的对话
function vuetifyConfirm(title = '', content = '', confirmNext) {
    this.confirmTitle = title
    this.confirmContent = content
    this.confirmNext = confirmNext || null
    this.confirm = true
}
// 确认对话时，用户选择后触发的函数
function confirmAnswer(boolean = false) {
    this.confirm = false
    if (this.confirmNext) this.confirmNext(boolean)
}
