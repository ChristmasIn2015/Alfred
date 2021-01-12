// father 希望创建一个子进程配合命令行来执行 child.js
// child.js 会在控制台对1-10计数
const { exec } = require('child_process')
let sub_process = exec('node ./child.js', { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
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
sub_process.stdout.on('data', (data) => console.log(data))
sub_process.on('exit', (code, signal) => console.log(`sub_process of ${sub_process.pid} exit by ${code} & ${signal}`))
console.log(process.pid, sub_process.pid)

// 这行希望创建子进程2s后 中断child, 不让其继续计数
setTimeout(() => {
    // var kill = require('tree-kill')
    // kill(sub_process.pid)

    exec('taskkill /pid ' + sub_process.pid + ' /T /F', (a, b, c) => {})
}, 2000)

// 问题 child.kill() 后， child.js 依然在计数
