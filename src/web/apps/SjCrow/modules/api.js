async function ipcInvoke(ipcName, params) {
    let result = await $electron.ipcRenderer.invoke(ipcName, params)
    console.log(ipcName, params, result)
    if (result.code !== 200) throw new Error(result.message)
    return result.data
}
// *********************************************************** Note
export function commitArea(params) {
    return ipcInvoke('commitArea', params)
}
export function getAreaList() {
    return ipcInvoke('getAreaList')
}
export function areaDelete(areaId) {
    return ipcInvoke('areaDelete', areaId)
}
// *********************************************************** Note
export function commitShelf(params) {
    return ipcInvoke('commitShelf', params)
}
export function getShelfList(params) {
    return ipcInvoke('getShelfList', params)
}
export function shelfDelete(shelfId) {
    return ipcInvoke('shelfDelete', shelfId)
}
// *********************************************************** Note
export function commitBook(params) {
    params.bookModel.content = params.bookModel.content.replace(/\'/g, '')
    return ipcInvoke('commitBook', params)
}
export function getBookList(params) {
    return ipcInvoke('getBookList', params)
}
export function bookDelete(bookId) {
    return ipcInvoke('bookDelete', bookId)
}
// *********************************************************** Native
export function openDevTool() {
    return ipcInvoke('openDevTool')
}
// *********************************************************** Bat
export function commitBat(params) {
    return ipcInvoke('commitBat', params)
}
export function getBatList(params) {
    return ipcInvoke('getBatList', params)
}
export function batDelete(batId) {
    return ipcInvoke('batDelete', batId)
}
