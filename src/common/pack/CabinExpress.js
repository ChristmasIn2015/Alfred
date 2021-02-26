var p = Object.create,
    l = Object.defineProperty,
    S = Object.getPrototypeOf,
    w = Object.prototype.hasOwnProperty,
    E = Object.getOwnPropertyNames,
    y = Object.getOwnPropertyDescriptor
var b = (s) => l(s, '__esModule', { value: !0 })
var O = (s, e) => {
        for (var t in e) l(s, t, { get: e[t], enumerable: !0 })
    },
    T = (s, e, t) => {
        if ((e && typeof e == 'object') || typeof e == 'function')
            for (let n of E(e)) !w.call(s, n) && n !== 'default' && l(s, n, { get: () => e[n], enumerable: !(t = y(e, n)) || t.enumerable })
        return s
    },
    d = (s) => (s && s.__esModule ? s : T(b(l(s != null ? p(S(s)) : {}, 'default', { value: s, enumerable: !0 })), s))
b(exports)
O(exports, { default: () => C })
var g = d(require('mongodb')),
    a = class {
        constructor(e) {
            this.DBAddress = ''
            this.DBOrigin = null
            this.DBAddress = e
        }
        start() {
            return new Promise((e, t) => {
                g.MongoClient.connect(this.DBAddress, { useUnifiedTopology: !0 }, (n, i) => {
                    n ? t(n) : ((this.DBOrigin = i.db(this.DBAddress.split('/').reverse()[0])), e(!0))
                })
            })
        }
        getTableCaller(e) {
            return new Promise((t, n) => {
                this.DBOrigin.collection(e, { strict: !0 }, (i, r) => {
                    i
                        ? i.message === `Collection ${e} does not exist. Currently in strict mode.`
                            ? this.DBOrigin.createCollection(e, {}, (u, P) => {
                                  if (u) {
                                      n(`\u521B\u5EFA\u96C6\u5408${e}\u5931\u8D25: ${u.message}`)
                                      return
                                  }
                                  t(P)
                              })
                            : n(i)
                        : t(r)
                })
            })
        }
    },
    m = a
var h = d(require('mongodb')),
    o = class {
        constructor(e) {
            this.TableName = null
            this.TableStruct = null
            this.TableCaller = null
            this.TableCaller = e
        }
        async init(e, t) {
            ;(this.TableName = e), (this.TableStruct = Object.assign({}, t))
            for (let i in this.TableStruct) this.TableStruct[i] = null
            let n = await this.getOldStruct()
            for (let i in t) {
                if (i === 'id' || i === '_id' || i === 'timeCreate' || i === 'timeUpdate' || n[i]) continue
                let r = {}
                ;(r[i] = null), console.log('create', i), await this.TableCaller.updateMany({}, { $set: r })
            }
            for (let i in n) {
                if (i === 'id' || i === '_id' || i === 'timeCreate' || i === 'timeUpdate' || t[i]) continue
                let r = {}
                ;(r[i] = null), console.log('delete', i), await this.TableCaller.updateMany({}, { $unset: r })
            }
        }
        async create(e) {
            e = this.model2TableStruct(e)
            let t = Date.now()
            return (
                (e = Object.assign(e, { _id: String(new h.ObjectId()), timeCreate: t, timeUpdate: t })),
                (await this.TableCaller.insertOne(e, { forceServerObjectId: !0 })).ops[0]
            )
        }
        get(e) {
            return new Promise((t, n) => {
                this.TableCaller.find(e).toArray((i, r) => {
                    i ? n(i.message) : t(r[0] || null)
                })
            })
        }
        query(e) {
            return new Promise((t, n) => {
                this.TableCaller.find(e).toArray((i, r) => {
                    i ? n(i.message) : t(r)
                })
            })
        }
        async update(e, t) {
            let n = this.getStruct()
            for (let r in t) r === '_id' || r === 'timeCreate' || r === 'timeUpdate' || (n[r] === void 0 && delete t[r])
            return (t = Object.assign(t, { timeUpdate: Date.now() })), await this.TableCaller.updateMany(e, { $set: t })
        }
        async delete(e) {
            if ((await this.TableCaller.deleteOne({ _id: e })).deletedCount !== 1) throw new Error(`${e} \u4E0D\u5B58\u5728`)
            return !0
        }
        async getOldStruct() {
            let e = await this.get({})
            for (let t in e) e[t] = !0
            return e || {}
        }
        getStruct() {
            return Object.assign({}, this.TableStruct)
        }
        model2TableStruct(e) {
            let t = this.getStruct() || {}
            for (let n in t) e[n] && (t[n] = e[n])
            return t
        }
    },
    f = o
var c = class {
        constructor() {
            this.cabinDB = null
            this.cabinInfo = null
            this.cabinHandler = null
            this.BinderMap = new Map()
            this.VUE_PATH = null
            this.FS = null
            this.EXPRESS = null
            this.EXPRESS_PROXY = null
            this.BODY_PARSE = null
            ;(this.VUE_PATH = require('path').join(process.cwd(), './src/web/dist')),
                (this.FS = require('fs')),
                (this.EXPRESS = require('express')),
                (this.EXPRESS_PROXY = require('http-proxy-middleware').createProxyMiddleware),
                (this.BODY_PARSE = require('body-parser'))
        }
        async dbLink(e) {
            ;(this.cabinDB = new m(e)), await this.cabinDB.start()
        }
        async dbTabler(e) {
            if ((global.$db || (global.$db = {}), !this.cabinDB)) throw new Error('\u6570\u636E\u5E93\u670D\u52A1\u4E0D\u5B58\u5728')
            for (let t in e) {
                let n = e[t].name,
                    i = await this.cabinDB.getTableCaller(n)
                ;(global.$db[n] = new f(i)), await global.$db[n].init(n, e[t].struct)
            }
        }
        express(e, t) {
            ;(this.cabinInfo = { CabinHandler: 'express', APP_NAME: t, IPv4: global.$common.getIPv4(), SOCKET_NUMBER: e }),
                e &&
                    ((this.cabinHandler = this.EXPRESS()),
                    this.cabinHandler.all('*', (n, i, r) => {
                        i.header('Access-Control-Allow-Origin', '*'),
                            i.header('Access-Control-Allow-Headers', '*'),
                            i.header('Access-Control-Allow-Methods', '*'),
                            r()
                    }),
                    this.cabinHandler.use(this.EXPRESS.static(this.VUE_PATH)),
                    this.cabinHandler.listen(e, '0.0.0.0'))
        }
        expressProxy(e, t) {
            let n = { target: t, changeOrigin: !0 }
            this.cabinHandler.use(e, this.EXPRESS_PROXY(n))
        }
        expressHtml(e, t) {
            !this.cabinInfo.SOCKET_NUMBER || this.cabinHandler.get(e, (n, i) => i.sendFile(t))
        }
        expressRoute(e, t, n) {
            if (!!this.cabinInfo.SOCKET_NUMBER)
                switch (e) {
                    case 'GET':
                        this.cabinHandler.get(t, (i, r) => n(i, r))
                        break
                    case 'POST':
                        this.cabinHandler.post(t, this.BODY_PARSE.json(), (i, r) => n(i, r))
                        break
                }
        }
    },
    C = c
