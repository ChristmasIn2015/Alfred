// 通过这个脚本来管理 node 应用
// *
if (!global.socketer) {
    global.socketer = {
        list: [],
        count: 7000,
    }
}
const socketer = global.socketer
// *
try {
    const serverName = process.argv[2]
    if (!serverName) throw new Error('* 未启动任何node应用')
    let apps = require('glob').sync('./src/node/apps/*/*.js')
    for (let i in apps) {
        if (serverName === apps[i].split('/').reverse()[1]) {
            let targetPath = require('path').join(__dirname, `../dist/Server_${serverName}.js`)
            console.log(targetPath)
            socketer.list.push({
                name: targetPath
                    .split('\\')
                    .reverse()[0]
                    .split('.')[0],
                path: targetPath,
                count: ++socketer.count,
                instance: null,
            })
            break
        }
    }
} catch (error) {
    console.log(error.message)
} finally {
    for (let index in socketer.list) {
        let app = socketer.list[index]
        require(app.path)
        let Runner = global[app.name]
        if (Runner) {
            app.instance = new Runner(app.count)
        }
    }
}
