const log = (...message) => {
    console.log(message)
    // require('axios').post('http://wqao.top:7001/yjy-log/create', { message })
}
const PATH = require('path')
require('electron-winstaller')
    .createWindowsInstaller({
        name: 'Alfred',
        appDirectory: PATH.join(__dirname, '../publish/Alfred-win32-x64'),
        outputDirectory: PATH.join(__dirname, '../publish'),
        authors: 'HuangWenQiang',
        exe: 'Alfred.exe',
        noMsi: true,
    })
    .then(() => log('Electron build success!'))
    .catch((e) => log(e.message))
