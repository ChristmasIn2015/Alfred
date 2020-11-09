export default function PureFun(TargetClass) {
    TargetClass.prototype.getYYMMDD = getYYMMDD
    TargetClass.prototype.getYY = getYY
    TargetClass.prototype.getMM = getMM
    TargetClass.prototype.getDD = getDD
    TargetClass.prototype.chargeHHMMRange = chargeHHMMRange
}
// 返回'2020-12-05'
function getYYMMDD(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let year = time.getFullYear()
    let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    return String(year) + '-' + String(month) + '-' + String(day)
}
// 返回'2020-12-05'中的'2020'
function getYY(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    return String(time.getFullYear())
}
// 返回'2020-12-05'中的'12'
function getMM(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
    return String(month)
}
// 返回'2020-12-05'中的'05'
function getDD(mills) {
    // 传入的是毫秒
    let time = new Date(mills)
    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    return String(day)
}
// 判断当前时间是否在某个营业范围 ["09:00", "02:00"] 内
function chargeHHMMRange(range) {
    if (!range || typeof range !== 'object' || range.length < 2) return false
    // 传入的是字符串数组 ["09:00", "02:00"]
    let start = getYYMMDD(Date.now()) + ' ' + range[0]
    let end = getYYMMDD(Date.now()) + ' ' + range[1]

    // 跨日，把 start 变为明日0点
    if (Date.parse(start) > Date.parse(end)) {
        let tomorrow = getYYMMDD(Date.now() + 86400000) + ' ' + '00:00'
        end = getYYMMDD(Date.parse(tomorrow)) + ' ' + range[1]
    }

    // 判断
    let charge = Date.parse(start) <= Date.now() && Date.now() <= Date.parse(end)
    return charge
}
