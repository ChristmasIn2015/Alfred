import { processExcuteCmd, processDestory } from '../../../../database/ChildProcess.js'
// 这个类提供Node操纵OS的一些方法
export default class CmdsAuto {
    constructor() {}

    excuteLocalCmd(event, params) {
        // params => cmdString index
        processExcuteCmd(params.cmdString, {
            answer: (answer) => {
                answer.DTO['listIndex'] = params.index
                event.reply('excuteLocalCmd', answer)
            },
        })
    }
    killLocalCmd(event, params) {
        // params => pid
        processDestory(params.pid)
    }
}
