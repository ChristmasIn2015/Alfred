var E = Object.create,
    u = Object.defineProperty,
    P = Object.getPrototypeOf,
    v = Object.prototype.hasOwnProperty,
    k = Object.getOwnPropertyNames,
    C = Object.getOwnPropertyDescriptor
var U = (s) => u(s, '__esModule', { value: !0 })
var A = (s, e, t) => {
        if ((e && typeof e == 'object') || typeof e == 'function')
            for (let r of k(e)) !v.call(s, r) && r !== 'default' && u(s, r, { get: () => e[r], enumerable: !(t = C(e, r)) || t.enumerable })
        return s
    },
    L = (s) => (s && s.__esModule ? s : A(U(u(s != null ? E(P(s)) : {}, 'default', { value: s, enumerable: !0 })), s))
var g = class {
        constructor() {
            this.isDebug = !1
        }
        toggleDebug() {
            this.isDebug = !this.isDebug
        }
        async log(e) {
            try {
                this.isDebug && (await $common.fetch('http://wqao.top:7001/yjy-log/create', 'POST', { message: e }))
            } catch (t) {
                console.log(t)
            }
        }
    },
    w = g
var m = L(require('axios')),
    d
;(function(s) {
    ;(s.GET = 'GET'), (s.POST = 'POST')
})(d || (d = {}))
var y = class {
        constructor(e, t) {
            this.BASE_URL = e
            this.COMPLETE = t
            this.DEFAULT_HEADER = {}
            ;(this.BASE_URL = e), (this.COMPLETE = t)
        }
        async request(e, t, r, n) {
            try {
                let o = await m.default({ method: e, url: this.BASE_URL + (t || ''), data: r, headers: n || this.DEFAULT_HEADER || {} })
                return await this.COMPLETE(o.data)
            } catch (o) {
                throw o
            }
        }
    },
    p = class {
        constructor() {}
        getRequester(e, t) {
            return new y(e, t)
        }
        async fetch(e, t = d.GET, r = {}, n = {}) {
            return (await m.default({ method: t, url: e, data: r, headers: n })).data
        }
    },
    M = p
var h = class {
        constructor() {}
        getTimeDTO() {
            return { year: '', day: '', hour: '', min: '', sec: '', full: '', week: '' }
        }
        getYYMMDD(e = Date.now()) {
            let t = ''
            return (
                new Date(e)
                    .toLocaleDateString()
                    .split('/')
                    .forEach((r) => (t += Number(r) < 10 ? `/0${r}` : `/${r}`)),
                t.replace('/', '')
            )
        }
        getYY(e = Date.now()) {
            return new Date(e).getFullYear().toString()
        }
        getMM(e = Date.now()) {
            let t = new Date(e).getMonth() + 1
            return (t < 10 ? `0${t}` : t).toString()
        }
        getDD(e = Date.now()) {
            let t = new Date(e).getDate()
            return (t < 10 ? `0${t}` : t).toString()
        }
        getHHMMSS(e = Date.now()) {
            let t = null,
                r = new Date(e)
            return (
                (t = this.getTimeDTO()),
                (t.hour = r.getHours() < 10 ? `0${r.getHours()}` : r.getHours().toString()),
                (t.min = r.getMinutes() < 10 ? `0${r.getMinutes()}` : r.getMinutes().toString()),
                (t.sec = r.getSeconds() < 10 ? `0${r.getSeconds()}` : r.getSeconds().toString()),
                (t.full = `${t.hour}:${t.min}:${t.sec}`),
                t
            )
        }
        getFullTime(e = Date.now()) {
            let t = this.getHHMMSS()
            return (t.year = new Date(e).getFullYear().toString()), (t.full = `${t.year} ${t.full}`), t
        }
        getTimeGap(e = Date.now() + 864e5) {
            let t = null,
                r = e - Date.now()
            if (r > 0) {
                t = this.getTimeDTO()
                let n = ~~(r / 1e3 / 60 / 60) % 24
                t.hour = n < 10 ? `0${n}` : n.toString()
                let o = ~~(r / 1e3 / 60) % 60
                t.min = o < 10 ? `0${o}` : o.toString()
                let i = ~~(r / 1e3) % 60
                ;(t.sec = i < 10 ? `0${i}` : i.toString()), (t.full = `${t.hour}:${t.min}:${t.sec}`)
            }
            return t
        }
        getChineseWeek(e = Date.now()) {
            let t = ''
            switch (new Date(e).getDay()) {
                case 1:
                    t = '\u5468\u4E00'
                    break
                case 2:
                    t = '\u5468\u4E8C'
                    break
                case 3:
                    t = '\u5468\u4E09'
                    break
                case 4:
                    t = '\u5468\u56DB'
                    break
                case 5:
                    t = '\u5468\u4E94'
                    break
                case 6:
                    t = '\u5468\u516D'
                    break
                case 0:
                    t = '\u5468\u65E5'
                    break
            }
            return t
        }
    },
    x = h
var b = class {
        constructor() {}
        isValidMobile(e) {
            return /^[1][0-9]{10}$/.test(e)
        }
        isValidEmail(e) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(e)
        }
    },
    $ = b
var D = class {
        constructor() {}
        getLatLngDistance(e, t, r, n) {
            let o = (e * Math.PI) / 180,
                i = (r * Math.PI) / 180,
                l = o - i,
                c = (t * Math.PI) / 180 - (n * Math.PI) / 180,
                a = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(l / 2), 2) + Math.cos(o) * Math.cos(i) * Math.pow(Math.sin(c / 2), 2)))
            return (a = a * 6378.137), (a = Math.round(a * 1e4) / 1e4), a.toFixed(2)
        }
        wannaObject(e, t) {
            return e
        }
    },
    O = D
var T = class {
    constructor() {
        this.BinderMap = new Map()
        this.bindClass(this, 'Log', w),
            this.bindClass(this, 'Requester', M),
            this.bindClass(this, 'UtilsTime', x),
            this.bindClass(this, 'UtilsVaild', $),
            this.bindClass(this, 'UtilsCalculation', O)
    }
    bindClass(e, t, r) {
        r instanceof Function &&
            (e.BinderMap.set(t, new r()),
            Object.getOwnPropertyNames(r.prototype).forEach((n) => {
                n !== 'constructor' &&
                    (e[n] = (...o) => {
                        let i = e.BinderMap.get(t)
                        return i[n].apply(i, o)
                    })
            }))
    }
}
var f = class {
        constructor() {}
        Response(e = null) {
            return (t, r, n) => {
                let o = n.value
                n.value = async function(...i) {
                    let l = { code: null, data: null, message: '' },
                        c = i[1]
                    try {
                        let a = await o.apply(this, i)
                        ;(l.code = 200), (l.data = a || e)
                    } catch (a) {
                        l.message = a.message || a
                    } finally {
                        c.send(l)
                    }
                }
            }
        }
        getIPv4() {
            let e = null
            if (global.process.platform === 'win32') {
                let t = require('os').networkInterfaces()
                for (let r in t)
                    if (r === '\u4EE5\u592A\u7F51' || r === 'WLAN') {
                        for (let n in t[r]) {
                            let o = t[r][n]
                            if (o.family === 'IPv4') {
                                e = o.address
                                break
                            }
                        }
                        break
                    }
            }
            return e
        }
        printRed(e) {
            console.log(`[41m[30m${e}[0m`)
        }
        printYellow(e) {
            console.log(`[43m[30m${e}[0m`)
        }
        printBlue(e) {
            console.log(`[44m[37m${e}[0m`)
        }
        printGreen(e) {
            console.log(`[42m[30m${e}[0m`)
        }
        printLink(e) {
            console.log(`[34m${e}[0m`)
        }
        printText(e) {
            console.log(`[33m${e}[0m`)
        }
    },
    S = f
var B = class extends T {
    constructor() {
        super()
        this.bindClass(this, 'UtilsReactNode', S)
    }
}
global.$common = new B()
