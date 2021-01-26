const PATH = require('path')

//
const package = require(PATH.join(__dirname, '../../package.json'))
global['APP_VERSION'] = package.version

//
if (window) {
    window.addEventListener('DOMContentLoaded', () => (window.$electron = require('electron')))
}
