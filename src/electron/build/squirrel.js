// ***********************************************************************
// 这个文件里的代码是从 https://github.com/electron/windows-installer 复制的
// 用于检测Electron自动更新时候的一些Squirrel事件，从而判断Electron是否继续打开
// ***********************************************************************
//
const path = require('path')
const app = require('electron').app
const childProcess = require('child_process')
//
const appFolder = path.resolve(process.execPath, '..')
const rootAtomFolder = path.resolve(appFolder, '..')
const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'))
const exeName = path.basename(process.execPath)

//
function handleSquirrelEvent(yjyLog) {
    if (process.argv.length === 1) return false

    const spawn = function(command, args) {
        let spawnedProcess, error

        try {
            spawnedProcess = childProcess.spawn(command, args, { detached: true })
        } catch (error) {
            yjyLog('squirrel spawn error', error.message)
        }

        return spawnedProcess
    }

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args)
    }

    const squirrelEvent = process.argv[1]
    yjyLog('*.squirrelEvent', squirrelEvent)
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName])

            setTimeout(app.quit, 1000)
            return true

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName])

            setTimeout(app.quit, 1000)
            return true

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            app.quit()
            return true
    }
}
module.exports = {
    handleSquirrelEvent,
}
