const PATH = require('path')
const dir = PATH.join(__dirname, '../../../')
const out = PATH.join(__dirname, '../publish')
//
const InstallerName = 'Solomon'
const packageJson = require(PATH.join(__dirname, '../../../package.json'))
//
require('electron-packager')(
    {
        name: InstallerName,
        asar: true,
        arch: 'x64',
        buildVersion: packageJson.version,
        dir,
        out,
        overwrite: true,
        platform: 'win32',
    },
    (error, appPaths) => console.log(error || 'electron-packager success', appPaths)
)
