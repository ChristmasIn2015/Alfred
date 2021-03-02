import { excuteCmd, killCmd } from '../../../../common/ts/cmd'
// 这个类提供Node操纵OS的一些方法
export default class CmdsAuto {
    constructor() {}

    excuteLocalCmd(event, params) {
        excuteCmd(params.command, (CmdAnswer: CmdAnswer) => {
            event.reply('excuteLocalCmd', CmdAnswer)
        })
    }
    killLocalCmd(event, params) {
        killCmd(params.pid)
    }
}
