// **************************************************************************
// **************************************************************************
// **************************************************************************
// **************************************************************************
// 0.声明
export type ProcessId = number
export type CmdAnswer = {
    pid: number
    text: string
    html: string
}
export type CmdCallback = (CmdAnswer: CmdAnswer) => void
enum LogColor {
    WHITE = 'white',
    GREEN = 'green',
    YELLOW = 'yellow',
    RED = 'red',
}

// **************************************************************************
// **************************************************************************
// **************************************************************************
// **************************************************************************
// **************************************************************************
// 1.执行一个CMD任务
export function excuteCmd(command: string, answer: CmdCallback): ProcessId {
    // 终止敏感操作
    command = command.replace(/\n/g, ' ')
    if (_isDanger(command)) {
        const TIME = global['$common'].getFullTime().full
        answer({
            pid: null,
            text: `@Node(${process.pid}) Danger Cmd: ${command}`,
            html: _log2Html(LogColor.RED, `@Node(${process.pid}) Danger Cmd: ${command}`, TIME),
        })
        return
    }

    // 1 创建子进程
    const SubProcess = require('child_process').exec(command, { maxBuffer: 1024 * 1024 * 1024 }, (error, stdout, stderr) => {
        const Title = `@Node(${process.pid}) Cmd(${SubProcess.pid})`
        const NOW = global['$common'].getFullTime().full
        let Answer: CmdAnswer = {
            pid: null,
            text: `${Title} 任务结束`,
            html: _log2Html(LogColor.GREEN, Title, ``, NOW),
        }
        if (error) {
            Answer.text = `${Title} 进程异常:${error.message}`
            Answer.html = _log2Html(LogColor.RED, Title, Answer.text, NOW)
        } else if (stderr) {
            Answer.text = `${Title} 任务异常:${stderr.message}`
            Answer.html = _log2Html(LogColor.RED, Title, Answer.text, NOW)
        }
        answer(Answer)
    })

    // 2 回应请求者 :子进程创建成功
    const Encoding = 'latin1'
    SubProcess.stdout.setEncoding(SubProcess.stdout.readableEncoding)
    const Decoding = 'utf8' // 'cp936'
    const Title = `@Node(${process.pid}) Cmd(${SubProcess.pid}) ${Encoding}=>${Decoding}:Start`
    const IconvLite = require('iconv-lite')
    answer({
        pid: SubProcess.pid,
        text: Title,
        html: _log2Html(LogColor.GREEN, Title),
    })

    // 3 回应请求者 :子程序的日志
    SubProcess.stdout.on('data', (message) => {
        const Text = IconvLite.decode(Buffer.from(`@Log(${SubProcess.pid}) ${message}`, Encoding), Decoding)
        answer({
            pid: SubProcess.pid,
            text: Text,
            html: _log2Html(LogColor.WHITE, Text),
        })
        if (message.includes('Merge conflict')) killCmd(SubProcess.pid) // 进程终止会触发进程的error事件
    })

    return SubProcess.pid
}

// 2.销毁进程
export function killCmd(processId: number): void {
    require('tree-kill')(processId)
}
function _isDanger(command: string): boolean {
    command = command.trim().toUpperCase()
    let result = false
    if (command.length === 0) result = true
    if (command.indexOf('SSH') >= 0) result = true
    return result
}
function _log2Html(color: LogColor, ...message: string[]) {
    let html = ''
    message.forEach((log) => (html += `<span style="color:${color}">${log}</sapn><br>`))
    return html
}
