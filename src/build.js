const PATH = require('path')
require('electron-packager')(
    {
        name: 'Alfred',
        asar: true,
        arch: 'x64',
        buildVersion: '1.0.1',
        dir: PATH.join(__dirname, '../'),
        out: PATH.join(__dirname, '../publish'),
        overwrite: true,
        platform: 'win32',
    },
    (error, appPaths) => console.log(error || 'electron-packager success', appPaths)
)
