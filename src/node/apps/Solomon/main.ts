import '../../../common/ts/common-node'
import CabinExpress from '../../../common/ts/CabinExpress'
//

async function go() {
    try {
        const SOCKET_NUMBER = parseInt(process.argv[2])
        if (!SOCKET_NUMBER) throw new Error(`please chose a socket number, now is ${SOCKET_NUMBER}`)

        // 1.链接MongoDB数据库服务
        let Cabin = new CabinExpress()
        // 2.创建Solomon的数据库及其操作员
        // 3.绑定业务的调度员
        // 4.使用express暴漏调度方法给传输层
        Cabin.express(SOCKET_NUMBER, 'Solomon')

        // 5.绑定Html（Node*Solomon 仅提供HTML服务给 Electron*Solomon）
        const htmlPath = require('path').join(process.cwd(), './src/web/dist')
        const SolomonIndex = require('path').join(process.cwd(), './src/web/dist/Solomon.html')
        Cabin.expressHtml('/solomon', htmlPath, SolomonIndex)

        // * End
        console.log(Cabin.cabinInfo)
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}
go()
