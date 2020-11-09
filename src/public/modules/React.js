export default function React(TargetClass) {
    TargetClass.prototype.getHeader = getHeader
    TargetClass.prototype.loadOff = loadOff
}
function getHeader() {
    let token = localStorage['sjShopToken']
    let config = { authorization: token || '' }
    return config
}
function loadOff(error) {
    if (typeof error === 'object') error = error.message
    $warn(error)
    setTimeout(() => {
        $load.hide()
    }, 1000)
    this.log(error) // @Log
}
