import { Mark } from '../Log.js'
export default class UtilsTime {
    // * 时间类方法的通用特性比较明确
    constructor() {}

    @Mark('获取今明两天的日期明细 ()=> Object')
    getTwoDays() {
        // 看看有没有Cms缓存
        let now = Date.now()
        let cmsHotelStore = localStorage['yjyCmsHotelStore']
        if (cmsHotelStore) {
            cmsHotelStore = JSON.parse(cmsHotelStore)
            let target = cmsHotelStore.startDate
            let mill = new Date(`${target.year}-${target.month}-${target.day}`)
            // 如果没过期
            if (now - mill < 86400000) {
                return {
                    start: Object.assign({ full: `${target.year}-${target.month}-${target.day}` }, cmsHotelStore.startDate),
                    end: Object.assign(
                        { full: `${cmsHotelStore.endDate.year}-${cmsHotelStore.endDate.month}-${cmsHotelStore.endDate.day}` },
                        cmsHotelStore.endDate
                    ),
                }
            }
        }
        let todayYear = $common.getYY(now)
        let todayMonth = $common.getMM(now)
        let todayDay = $common.getDD(now)
        let tomoYear = $common.getYY(now + 86400000)
        let tomoMonth = $common.getMM(now + 86400000)
        let tomoDay = $common.getDD(now + 86400000)
        return {
            start: {
                year: todayYear,
                month: todayMonth,
                day: todayDay,
                tip: '今天',
                mill: now,
                full: `${todayYear}-${todayMonth}-${todayDay}`,
            },
            end: {
                year: tomoYear,
                month: tomoMonth,
                day: tomoDay,
                tip: '',
                mill: now + 86400000,
                full: `${tomoYear}-${tomoMonth}-${tomoDay}`,
            },
        }
    }

    @Mark('获取今明两天的字符串 (毫秒数: Number)=> yyyy-mm-dd: String')
    getYYMMDD(mills) {
        // 传入的是毫秒
        let time = new Date(mills)
        let year = time.getFullYear()
        let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
        let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
        let result = String(year) + '-' + String(month) + '-' + String(day)
        return result
    }

    @Mark('(毫秒数: Number)=> yyyy: String')
    getYY(mills) {
        // 传入的是毫秒
        let time = new Date(mills)
        return String(time.getFullYear())
    }

    @Mark('(毫秒数: Number)=> mm: String')
    getMM(mills) {
        // 传入的是毫秒
        let time = new Date(mills)
        let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
        return String(month)
    }

    @Mark('(毫秒数: Number)=> dd: String')
    getDD(mills) {
        // 传入的是毫秒
        let time = new Date(mills)
        let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
        return String(day)
    }

    @Mark('返回中文周数 (毫秒数: Number)=> String')
    getChineseWeek(mill) {
        let week = new Date(mill).getDay()
        let myWeek = ''
        switch (week) {
            case 1:
                myWeek = '周一'
                break
            case 2:
                myWeek = '周二'
                break
            case 3:
                myWeek = '周三'
                break
            case 4:
                myWeek = '周四'
                break
            case 5:
                myWeek = '周五'
                break
            case 6:
                myWeek = '周六'
                break
            case 0:
                myWeek = '周日'
                break
        }
        return myWeek
    }
}
