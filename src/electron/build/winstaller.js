const PATH = require('path')
//
const InstallerName = 'Solomon'
const packageJson = require(PATH.join(__dirname, '../../../package.json'))
//
require('electron-winstaller')
    .createWindowsInstaller({
        name: InstallerName,
        appDirectory: PATH.join(__dirname, `../publish/${InstallerName}-win32-x64`),
        outputDirectory: PATH.join(__dirname, '../publish'),
        authors: 'HuangWenQiang',
        exe: `${InstallerName}.exe`,
        noMsi: true,
    })
    .then(() => console.log('Electron build success!'))
    .catch((e) => console.log(e.message))
