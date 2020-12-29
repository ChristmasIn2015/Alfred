/** **************************************************************
 * 这个脚本会在Electron主进程中加载
 * ***************************************************************
 * Web应该始终通过IPC通信来调用OS-API
 * $electron.ipcRenderer.send(name, params)
 * require('electron').ipcMain.on(name, (event, params)=>{})
 * ***************************************************************/
function ipcBind(TargetClassName, TargetClass) {
    const ipcMain = require('electron').ipcMain
    // * 全局创建对象
    if (!global['$hyBridge']) global['$hyBridge'] = {}
    $hyBridge[TargetClassName] = new TargetClass()
    // * IPC指向全局对象
    if (TargetClass.prototype) {
        Object.getOwnPropertyNames(TargetClass.prototype).forEach((functionName) => {
            if (functionName === 'constructor') return // continue
            ipcMain.on(functionName, (...args) => {
                console.log('ipc main', $hyBridge, TargetClassName)
                let origin = $hyBridge[TargetClassName]
                // ClassA.Function.apply(ClassB, args) 等价于 ClassB.Function(args)
                return origin[functionName].apply(origin, args)
            })
        })
    }
}
import Native from './Native/Native.js'
import Cabin from './Database/Cabin.js'
ipcBind('Native', Native)
ipcBind('Cabin', Cabin)
