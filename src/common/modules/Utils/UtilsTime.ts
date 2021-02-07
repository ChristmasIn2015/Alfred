type TimeDTO = {
    year: string
    day: string
    hour: string
    min: string
    sec: string
    full: string
    week: string
}
export default class UtilsTime {
    // 2020/01/01 以早上零点为起点
    // 2020-01-01 以早上八点为起点
    constructor() {}

    private getTimeDTO(): TimeDTO {
        const DTO: TimeDTO = {
            year: '',
            day: '',
            hour: '',
            min: '',
            sec: '',
            full: '',
            week: '',
        }
        return DTO
    }

    getYYMMDD(mills: number = Date.now()): string {
        let yymmdd: string = ''
        new Date(mills)
            .toLocaleDateString() // 2020/1/1
            .split('/') // ['2020', '1', '1']
            .forEach((time) => (yymmdd += Number(time) < 10 ? `/0${time}` : `/${time}`))
        return yymmdd.replace('/', '')
    }

    getYY(mills: number = Date.now()): string {
        return new Date(mills).getFullYear().toString()
    }

    getMM(mills: number = Date.now()): string {
        let month = new Date(mills).getMonth() + 1
        return (month < 10 ? `0${month}` : month).toString()
    }

    getDD(mills: number = Date.now()) {
        let day = new Date(mills).getDate()
        return (day < 10 ? `0${day}` : day).toString()
    }

    // 获取某个时间戳的时分秒
    getHHMMSS(mills: number = Date.now()): TimeDTO {
        let DTO: TimeDTO = null
        const time = new Date(mills)
        DTO = this.getTimeDTO()
        DTO.hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours().toString()
        DTO.min = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes().toString()
        DTO.sec = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds().toString()
        DTO.full = `${DTO.hour}:${DTO.min}:${DTO.sec}`
        return DTO
    }

    // 获取某个时间戳的全字段
    getFullTime(mills: number = Date.now()): TimeDTO {
        let DTO = this.getHHMMSS()
        DTO.year = new Date(mills).getFullYear().toString()
        DTO.full = `${DTO.year} ${DTO.full}`
        return DTO
    }

    // 获取当前时间到未来某个日期的时分秒
    // 可以用于倒计时
    getTimeGap(futureMills: number = Date.now() + 86400000): TimeDTO {
        let DTO: TimeDTO = null
        let gap = futureMills - Date.now()
        if (gap > 0) {
            DTO = this.getTimeDTO()
            //
            let hour = ~~(gap / 1000 / 60 / 60) % 24
            DTO.hour = hour < 10 ? `0${hour}` : hour.toString()
            //
            let min = ~~(gap / 1000 / 60) % 60
            DTO.min = min < 10 ? `0${min}` : min.toString()
            //
            let sec = ~~(gap / 1000) % 60
            DTO.sec = sec < 10 ? `0${sec}` : sec.toString()
            //
            // let day = parseInt(gap / 1000 / 60 / 60 / 24)
            DTO.full = `${DTO.hour}:${DTO.min}:${DTO.sec}`
        }
        return DTO
    }

    getChineseWeek(mills: number = Date.now()): string {
        let week = ''
        switch (new Date(mills).getDay()) {
            case 1:
                week = '周一'
                break
            case 2:
                week = '周二'
                break
            case 3:
                week = '周三'
                break
            case 4:
                week = '周四'
                break
            case 5:
                week = '周五'
                break
            case 6:
                week = '周六'
                break
            case 0:
                week = '周日'
                break
        }
        return week
    }
}
