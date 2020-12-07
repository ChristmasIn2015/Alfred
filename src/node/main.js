// 通过这个脚本来管理 node 应用
if (!global.socketer) {
    global.socketer = {
        list: [],
        count: 7000,
    }
}
const socketer = global.socketer
// *
const serverName = process.argv[2]
if (!serverName) throw new Error(`* 请选择正确的Express应用名称`)
let apps = require('glob').sync('./src/node/apps/*/*.js')
try {
    for (let i in apps) {
        if (serverName === apps[i].split('/').reverse()[1]) {
            let targetPath = require('path').join(__dirname, `./dist/${serverName}.js`)
            socketer.list.push({
                name: targetPath
                    .split('\\')
                    .reverse()[0]
                    .split('.')[0],
                path: targetPath,
                count: ++socketer.count,
                instance: null,
            })
        }
    }
    if (socketer.list.length === 0) throw new Error(`* 未找到 ${serverName}, 不能启动对应的Express`)
} catch (error) {
    console.log()
    console.log(`\x1B[41m\x1B[30m${error.message}\x1B[0m`)
    console.log()
    process.exit()
} finally {
    for (let index in socketer.list) {
        let app = socketer.list[index]
        require(app.path)
        let Runner = global[`Server_${app.name}`]
        app.instance = new Runner(app.count)
    }
}
