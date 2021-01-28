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
    .then(() => console.log('Electron build success!'))
    .catch((e) => console.log(e.message))
