import '../../../common/ts/common-node'
import CabinElectron from '../../../common/ts/CabinElectron'
//
import Native from './modules/Native'
import Note from './modules/Note'
import Cmds from './modules/Cmds'
import CmdsAuto from './modules/CmdsAuto'
//
async function go() {
    try {
        const DB_ADDRESS = require('path').join(process.cwd(), '../../Solomon.db') // 打包的时候极其要注意这个路径问题

        // 1.链接MongoDB数据库服务，并创建数据库Solomon.db
        // 打包的时候极其要注意这个路径问题
        let Cabin = new CabinElectron()
        await Cabin.dbLink(DB_ADDRESS)

        // 2.创建Solomon的数据表及其操作员
        await Cabin.dbTabler([
            // 运行时日志
            { name: 'Log', struct: { message: 'string' } },
            // 书籍业务需要的数据库
            { name: 'Area', struct: { name: 'string' } },
            { name: 'Shelf', struct: { name: 'string' } },
            { name: 'Book', struct: { name: 'string', content: 'string' } },
            { name: 'Relation_AreaShelf', struct: { areaId: 'number', shelfId: 'number' } },
            { name: 'Relation_ShelfBook', struct: { shelfId: 'number', bookId: 'number' } },
            // 脚本业务需要的数据库
            { name: 'Cmds', struct: { name: 'string', cmdString: 'string' } },
        ])

        // 3.绑定业务的调度员
        global['$common'].bindClass(Cabin, 'Native', Native)
        global['$common'].bindClass(Cabin, 'Note', Note)
        global['$common'].bindClass(Cabin, 'Cmds', Cmds)
        global['$common'].bindClass(Cabin, 'CmdsAuto', CmdsAuto)

        // 4.使用Electron暴漏调度方法给传输层
        global['Cabin'] = null
        global['Cabin'] = Cabin // ts 找不到 bindClass 后的方法
        // @Native
        Cabin.electronRoute('openDevTool', global['Cabin'].openDevTool)
        // @Note
        Cabin.electronRoute('commitArea', global['Cabin'].commitArea)
        Cabin.electronRoute('getAreaList', global['Cabin'].getAreaList)
        Cabin.electronRoute('areaDelete', global['Cabin'].areaDelete)
        Cabin.electronRoute('commitShelf', global['Cabin'].commitShelf)
        Cabin.electronRoute('getShelfList', global['Cabin'].getShelfList)
        Cabin.electronRoute('shelfDelete', global['Cabin'].shelfDelete)
        Cabin.electronRoute('commitBook', global['Cabin'].commitBook)
        Cabin.electronRoute('getBookList', global['Cabin'].getBookList)
        Cabin.electronRoute('bookDelete', global['Cabin'].bookDelete)
        // @Cmds
        Cabin.electronRoute('commitLocalCmd', global['Cabin'].commitLocalCmd)
        Cabin.electronRoute('getLocalCmdList', global['Cabin'].getLocalCmdList)
        Cabin.electronRoute('deleteLocalCmd', global['Cabin'].deleteLocalCmd)
        // @CmdsAuto
        Cabin.electronAliveRoute('excuteLocalCmd', global['Cabin'].excuteLocalCmd)
        Cabin.electronAliveRoute('killLocalCmd', global['Cabin'].killLocalCmd)

        // End
        // console.log(Cabin.cabinInfo)
    } catch (error) {
        const message = `SolomonSDK error: ${error.message}`
        global['$common'].log(message)
        console.log(message)
        process.exit()
    }
}
go()
