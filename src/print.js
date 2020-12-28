function getRedLog(message) {
    console.log(`\x1B[41m\x1B[30m${message}\x1B[0m`)
}
function getYellowLog(message) {
    console.log(`\x1B[43m\x1B[30m${message}\x1B[0m`)
}
function getBlueLog(message) {
    console.log(`\x1B[44m\x1B[37m${message}\x1B[0m`)
}
function getGreenLog(message) {
    console.log(`\x1B[42m\x1B[30m${message}\x1B[0m`)
}
function getLink(message) {
    console.log(`\x1B[34m${message}\x1B[0m`)
}
function getText(message) {
    console.log(`\x1B[33m${message}\x1B[0m`)
}
module.exports = {
    //
    link: getLink,
    text: getText,
    //
    red: getRedLog,
    yellow: getYellowLog,
    blue: getBlueLog,
    green: getGreenLog,
}
