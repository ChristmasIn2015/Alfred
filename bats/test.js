const { exec } = require('child_process')
var iconv = require('iconv-lite')
let sub_process = exec('echo 中文', { maxBuffer: 1024 * 1024, encoding: 'binary' }, (error, stdout, stderr) => {
    if (error) {
        console.log(error.message)
        console.log('father.js: 进程错误\n')
    } else if (stderr) {
        console.log(stderr.message)
        console.log('father.js: 脚本异常\n')
    } else {
        console.log('father.js: 进程结束\n')
    }
})
sub_process.stdout.on('data', (data) => {
    data = iconv.decode(Buffer.from(data, 'binary'), 'cp936')
    console.log(data, data.split(''))
})
