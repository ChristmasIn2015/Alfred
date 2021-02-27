var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// src/common/ts/cmd.ts
__markAsModule(exports);
__export(exports, {
  excuteCmd: () => excuteCmd,
  killCmd: () => killCmd
});
var LogColor;
(function(LogColor2) {
  LogColor2["WHITE"] = "white";
  LogColor2["GREEN"] = "green";
  LogColor2["YELLOW"] = "yellow";
  LogColor2["RED"] = "red";
})(LogColor || (LogColor = {}));
function excuteCmd(command, answer) {
  command = command.replace(/\n/g, " ");
  if (_isDanger(command)) {
    const TIME = global["$common"].getFullTime().full;
    answer({
      pid: null,
      text: `@Node(${process.pid}) Danger Cmd: ${command}`,
      html: _log2Html(LogColor.RED, `@Node(${process.pid}) Danger Cmd: ${command}`, TIME)
    });
    return;
  }
  const SubProcess = require("child_process").exec(command, {maxBuffer: 1024 * 1024 * 1024}, (error, stdout, stderr) => {
    const Title2 = `@Node(${process.pid}) Cmd(${SubProcess.pid})`;
    const NOW = global["$common"].getFullTime().full;
    let Answer = {
      pid: null,
      text: `${Title2} \u4EFB\u52A1\u7ED3\u675F`,
      html: _log2Html(LogColor.GREEN, Title2, ``, NOW)
    };
    if (error) {
      Answer.text = `${Title2} \u8FDB\u7A0B\u5F02\u5E38:${error.message}`;
      Answer.html = _log2Html(LogColor.RED, Title2, Answer.text, NOW);
    } else if (stderr) {
      Answer.text = `${Title2} \u4EFB\u52A1\u5F02\u5E38:${stderr.message}`;
      Answer.html = _log2Html(LogColor.RED, Title2, Answer.text, NOW);
    }
    answer(Answer);
  });
  const Encoding = "latin1";
  SubProcess.stdout.setEncoding(SubProcess.stdout.readableEncoding);
  const Decoding = "utf8";
  const Title = `@Node(${process.pid}) Cmd(${SubProcess.pid}) ${Encoding}=>${Decoding}:Start`;
  const IconvLite = require("iconv-lite");
  answer({
    pid: SubProcess.pid,
    text: Title,
    html: _log2Html(LogColor.GREEN, Title)
  });
  SubProcess.stdout.on("data", (message) => {
    const Text = IconvLite.decode(Buffer.from(`@Log(${SubProcess.pid}) ${message}`, Encoding), Decoding);
    answer({
      pid: SubProcess.pid,
      text: Text,
      html: _log2Html(LogColor.WHITE, Text)
    });
    if (message.includes("Merge conflict"))
      killCmd(SubProcess.pid);
  });
  return SubProcess.pid;
}
function killCmd(processId) {
  require("tree-kill")(processId);
}
function _isDanger(command) {
  command = command.trim().toUpperCase();
  let result = false;
  if (command.length === 0)
    result = true;
  if (command.indexOf("SSH") >= 0)
    result = true;
  return result;
}
function _log2Html(color, ...message) {
  let html = "";
  message.forEach((log) => html += `<span style="color:${color}">${log}</sapn><br>`);
  return html;
}
