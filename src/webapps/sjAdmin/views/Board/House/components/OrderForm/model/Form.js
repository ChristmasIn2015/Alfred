export function FormParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.formShow = false
        // *
        this.orderSource = []
        this.orderEditModel = {
            name: '',
            plugs: '',
            counts: '',
            price: '',
        }
        // *
        sourceFunction.apply(this, arguments)
    }
}
export function FormFunc(TargetClass) {
    // *
    TargetClass.prototype.toggleForm = toggleForm
    TargetClass.prototype.getFormData = getFormData
}
// * 展开表单
function toggleForm(goodListChecked) {
    if (!this.formShow && goodListChecked) {
        this.orderSource = JSON.parse(JSON.stringify(goodListChecked))
        this.orderSource.forEach((e) => (e['price'] = 0))
    }
    this.formShow = !this.formShow
}
// * 获取订单的表单
function getFormData() {
    return this.orderSource
}
