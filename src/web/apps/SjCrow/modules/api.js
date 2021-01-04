async function ipcInvoke(ipcName, params) {
    let result = await $electron.ipcRenderer.invoke(ipcName, params)
    if (result.code !== 200) throw new Error(result.message)
    return result.data
}
// ***********************************************************
export function commitArea(params) {
    return ipcInvoke('commitArea', params)
}
export function getAreaList() {
    return ipcInvoke('getAreaList')
}
export function areaDelete(params) {
    return ipcInvoke('areaDelete', params)
}
// ***********************************************************
export function commitShelf(areaId, shelf) {
    return ipcInvoke('commitShelf', { areaId, shelf })
}
export function getShelfList(areaId) {
    return ipcInvoke('getShelfList', areaId)
}
