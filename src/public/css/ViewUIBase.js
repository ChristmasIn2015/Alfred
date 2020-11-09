export function ViewUIBase(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        if (vuePointer) {
            this.vue = vuePointer
            window.$load = {
                show: () =>
                    vuePointer.$Message.loading({
                        content: '请稍后',
                        duration: 0,
                    }),
                hide: () => vuePointer.$Message.destroy(),
            }
            window.$tip = (message) =>
                vuePointer.$Message['success']({
                    background: true,
                    content: message,
                })
            window.$warn = (message) =>
                vuePointer.$Notice.warning({
                    title: message,
                })
        }
        // *
        sourceFunction.apply(this, arguments)
    }
}
