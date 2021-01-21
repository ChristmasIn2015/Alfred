// * 备注生成器
// * Common 由于 bindClass 的缘故，Mark修饰器只会在创建Common的时候被调用
export const Mark = (message) => (target, name, descriptor) => {
    if (!target['docs']) target['docs'] = {}
    target.docs[name] = target.docs[name] ? `${message}\n` + target.docs[name] : message
    return descriptor
}
export default class Log {
    constructor() {
        // * 监听所有HTML报错 * 非Node环境
        if (!global) window.onerror = (message, source, lineno, colno, error) => this.log(message)
    }

    @Mark('依赖于 jtour-ui 1.清除Loading 2.并Toast错误 3.再打印错误')
    loadOff(error) {
        if (typeof error === 'object') error = error.message || error.msg || '错误'
        console.log(error)
        $warn(error)
        $load.hide()
        this.log(error) // @Log
    }

    log() {}
}
