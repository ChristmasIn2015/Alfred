require('axios').post('http://42.193.102.196:7001/yjy-log/create', {
    message: 'preload start',
})
global.$electron = require('electron')
require('axios').post('http://42.193.102.196:7001/yjy-log/create', {
    message: 'global.$electron = require electron',
})
