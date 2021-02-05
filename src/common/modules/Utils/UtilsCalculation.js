export default class UtilsCalculation {
    constructor() {}

    // @Mark('获取VueUrl参数 ()=> Object:{ param1:?, param2:? }')
    getVueUrlParams() {
        let vueHash = decodeURIComponent(location.href)
        vueHash = vueHash.substring(vueHash.indexOf('?') + 1, vueHash.length)
        let map = {}
        vueHash.split('&').forEach((e) => {
            let temp = e.split('=')
            map[temp[0]] = temp[1]
        })
        return map
    }

    // @Mark('两个经纬度之间的直线距离km (lat1, lng1, lat2, lng2)=> Number')
    getLatLngDistance(lat1, lng1, lat2, lng2) {
        let radLat1 = (lat1 * Math.PI) / 180.0
        let radLat2 = (lat2 * Math.PI) / 180.0
        let a = radLat1 - radLat2
        let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
        s = s * 6378.137 // EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000
        return s.toFixed(2)
    }
}
