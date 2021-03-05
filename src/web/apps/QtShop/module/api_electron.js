// * 向主进程发送消息 并等待回应
async function ipcInvoke(ipcName, params) {
    let result = await window['$electron'].ipcRenderer.invoke(ipcName, params)
    // console.log({ ipcName, params: params || '未传参数' }, result)
    if (result.code !== 200) throw new Error(result.message)
    // console.log(result.data)
    return result.data
}
// *********************************************************** Native
export function openDevTool() {
    return ipcInvoke('openDevTool')
}
// *********************************************************** Cmds
export function commitLocalCmd(params) {
    return ipcInvoke('commitLocalCmd', params)
}
export function getLocalCmdList(params) {
    return ipcInvoke('getLocalCmdList', params)
}
export function deleteLocalCmd(batId) {
    return ipcInvoke('deleteLocalCmd', batId)
}
// *********************************************************** Area
export function commitArea(params) {
    return ipcInvoke('commitArea', params)
}
export function getAreaList() {
    return ipcInvoke('getAreaList')
}
export function areaDelete(areaId) {
    return ipcInvoke('areaDelete', areaId)
}
// *********************************************************** Shelf
export function commitShelf(params) {
    return ipcInvoke('commitShelf', params)
}
export function getShelfList(params) {
    return ipcInvoke('getShelfList', params)
}
export function shelfDelete(shelfId) {
    return ipcInvoke('shelfDelete', shelfId)
}
// *********************************************************** Book
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
