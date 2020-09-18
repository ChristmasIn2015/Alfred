export function Params(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        // *
        sourceFunction.apply(this, arguments)
    }
}
export function Func(TargetClass) {
    // *
    // TargetClass.prototype.postMyError = postMyError
}
