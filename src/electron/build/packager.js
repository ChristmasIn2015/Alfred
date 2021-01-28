const PATH = require('path')
const dir = PATH.join(__dirname, '../../../')
const out = PATH.join(__dirname, '../publish')
require('electron-packager')(
    {
        name: 'Alfred',
        asar: true,
        arch: 'x64',
        buildVersion: '1.0.0',
        dir,
        out,
        overwrite: true,
        platform: 'win32',
    },
    (error, appPaths) => console.log(error || 'electron-packager success', appPaths)
)
