;(() => {
    var mt = Object.create,
        U = Object.defineProperty,
        gt = Object.getPrototypeOf,
        wt = Object.prototype.hasOwnProperty,
        yt = Object.getOwnPropertyNames,
        bt = Object.getOwnPropertyDescriptor
    var vt = (r) => U(r, '__esModule', { value: !0 })
    var c = (r, e) => () => (e || ((e = { exports: {} }), r(e.exports, e)), e.exports)
    var Et = (r, e, t) => {
            if ((e && typeof e == 'object') || typeof e == 'function')
                for (let n of yt(e)) !wt.call(r, n) && n !== 'default' && U(r, n, { get: () => e[n], enumerable: !(t = bt(e, n)) || t.enumerable })
            return r
        },
        xt = (r) => (r && r.__esModule ? r : Et(vt(U(r != null ? mt(gt(r)) : {}, 'default', { value: r, enumerable: !0 })), r))
    var L = c((fr, ae) => {
        'use strict'
        ae.exports = function(e, t) {
            return function() {
                for (var s = new Array(arguments.length), i = 0; i < s.length; i++) s[i] = arguments[i]
                return e.apply(t, s)
            }
        }
    })
    var h = c((dr, oe) => {
        'use strict'
        var Dt = L(),
            y = Object.prototype.toString
        function M(r) {
            return y.call(r) === '[object Array]'
        }
        function B(r) {
            return typeof r == 'undefined'
        }
        function Ct(r) {
            return (
                r !== null && !B(r) && r.constructor !== null && !B(r.constructor) && typeof r.constructor.isBuffer == 'function' && r.constructor.isBuffer(r)
            )
        }
        function qt(r) {
            return y.call(r) === '[object ArrayBuffer]'
        }
        function Tt(r) {
            return typeof FormData != 'undefined' && r instanceof FormData
        }
        function St(r) {
            var e
            return (
                typeof ArrayBuffer != 'undefined' && ArrayBuffer.isView ? (e = ArrayBuffer.isView(r)) : (e = r && r.buffer && r.buffer instanceof ArrayBuffer),
                e
            )
        }
        function Ot(r) {
            return typeof r == 'string'
        }
        function Rt(r) {
            return typeof r == 'number'
        }
        function ue(r) {
            return r !== null && typeof r == 'object'
        }
        function D(r) {
            if (y.call(r) !== '[object Object]') return !1
            var e = Object.getPrototypeOf(r)
            return e === null || e === Object.prototype
        }
        function At(r) {
            return y.call(r) === '[object Date]'
        }
        function Ut(r) {
            return y.call(r) === '[object File]'
        }
        function Pt(r) {
            return y.call(r) === '[object Blob]'
        }
        function ce(r) {
            return y.call(r) === '[object Function]'
        }
        function Lt(r) {
            return ue(r) && ce(r.pipe)
        }
        function Mt(r) {
            return typeof URLSearchParams != 'undefined' && r instanceof URLSearchParams
        }
        function Bt(r) {
            return r.replace(/^\s*/, '').replace(/\s*$/, '')
        }
        function Nt() {
            return typeof navigator != 'undefined' &&
                (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')
                ? !1
                : typeof window != 'undefined' && typeof document != 'undefined'
        }
        function N(r, e) {
            if (!(r === null || typeof r == 'undefined'))
                if ((typeof r != 'object' && (r = [r]), M(r))) for (var t = 0, n = r.length; t < n; t++) e.call(null, r[t], t, r)
                else for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && e.call(null, r[s], s, r)
        }
        function j() {
            var r = {}
            function e(s, i) {
                D(r[i]) && D(s) ? (r[i] = j(r[i], s)) : D(s) ? (r[i] = j({}, s)) : M(s) ? (r[i] = s.slice()) : (r[i] = s)
            }
            for (var t = 0, n = arguments.length; t < n; t++) N(arguments[t], e)
            return r
        }
        function jt(r, e, t) {
            return (
                N(e, function(s, i) {
                    t && typeof s == 'function' ? (r[i] = Dt(s, t)) : (r[i] = s)
                }),
                r
            )
        }
        function Ht(r) {
            return r.charCodeAt(0) === 65279 && (r = r.slice(1)), r
        }
        oe.exports = {
            isArray: M,
            isArrayBuffer: qt,
            isBuffer: Ct,
            isFormData: Tt,
            isArrayBufferView: St,
            isString: Ot,
            isNumber: Rt,
            isObject: ue,
            isPlainObject: D,
            isUndefined: B,
            isDate: At,
            isFile: Ut,
            isBlob: Pt,
            isFunction: ce,
            isStream: Lt,
            isURLSearchParams: Mt,
            isStandardBrowserEnv: Nt,
            forEach: N,
            merge: j,
            extend: jt,
            trim: Bt,
            stripBOM: Ht,
        }
    })
    var H = c((pr, le) => {
        'use strict'
        var b = h()
        function fe(r) {
            return encodeURIComponent(r)
                .replace(/%3A/gi, ':')
                .replace(/%24/g, '$')
                .replace(/%2C/gi, ',')
                .replace(/%20/g, '+')
                .replace(/%5B/gi, '[')
                .replace(/%5D/gi, ']')
        }
        le.exports = function(e, t, n) {
            if (!t) return e
            var s
            if (n) s = n(t)
            else if (b.isURLSearchParams(t)) s = t.toString()
            else {
                var i = []
                b.forEach(t, function(l, p) {
                    l === null ||
                        typeof l == 'undefined' ||
                        (b.isArray(l) ? (p = p + '[]') : (l = [l]),
                        b.forEach(l, function(g) {
                            b.isDate(g) ? (g = g.toISOString()) : b.isObject(g) && (g = JSON.stringify(g)), i.push(fe(p) + '=' + fe(g))
                        }))
                }),
                    (s = i.join('&'))
            }
            if (s) {
                var o = e.indexOf('#')
                o !== -1 && (e = e.slice(0, o)), (e += (e.indexOf('?') === -1 ? '?' : '&') + s)
            }
            return e
        }
    })
    var pe = c((hr, de) => {
        'use strict'
        var $t = h()
        function C() {
            this.handlers = []
        }
        C.prototype.use = function(e, t) {
            return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1
        }
        C.prototype.eject = function(e) {
            this.handlers[e] && (this.handlers[e] = null)
        }
        C.prototype.forEach = function(e) {
            $t.forEach(this.handlers, function(n) {
                n !== null && e(n)
            })
        }
        de.exports = C
    })
    var me = c((mr, he) => {
        'use strict'
        var Ft = h()
        he.exports = function(e, t, n) {
            return (
                Ft.forEach(n, function(i) {
                    e = i(e, t)
                }),
                e
            )
        }
    })
    var $ = c((gr, ge) => {
        'use strict'
        ge.exports = function(e) {
            return !!(e && e.__CANCEL__)
        }
    })
    var ye = c((wr, we) => {
        'use strict'
        var kt = h()
        we.exports = function(e, t) {
            kt.forEach(e, function(s, i) {
                i !== t && i.toUpperCase() === t.toUpperCase() && ((e[t] = s), delete e[i])
            })
        }
    })
    var ve = c((yr, be) => {
        'use strict'
        be.exports = function(e, t, n, s, i) {
            return (
                (e.config = t),
                n && (e.code = n),
                (e.request = s),
                (e.response = i),
                (e.isAxiosError = !0),
                (e.toJSON = function() {
                    return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: this.config,
                        code: this.code,
                    }
                }),
                e
            )
        }
    })
    var F = c((br, Ee) => {
        'use strict'
        var It = ve()
        Ee.exports = function(e, t, n, s, i) {
            var o = new Error(e)
            return It(o, t, n, s, i)
        }
    })
    var De = c((vr, xe) => {
        'use strict'
        var zt = F()
        xe.exports = function(e, t, n) {
            var s = n.config.validateStatus
            !n.status || !s || s(n.status) ? e(n) : t(zt('Request failed with status code ' + n.status, n.config, null, n.request, n))
        }
    })
    var qe = c((Er, Ce) => {
        'use strict'
        var q = h()
        Ce.exports = q.isStandardBrowserEnv()
            ? (function() {
                  return {
                      write: function(t, n, s, i, o, a) {
                          var l = []
                          l.push(t + '=' + encodeURIComponent(n)),
                              q.isNumber(s) && l.push('expires=' + new Date(s).toGMTString()),
                              q.isString(i) && l.push('path=' + i),
                              q.isString(o) && l.push('domain=' + o),
                              a === !0 && l.push('secure'),
                              (document.cookie = l.join('; '))
                      },
                      read: function(t) {
                          var n = document.cookie.match(new RegExp('(^|;\\s*)(' + t + ')=([^;]*)'))
                          return n ? decodeURIComponent(n[3]) : null
                      },
                      remove: function(t) {
                          this.write(t, '', Date.now() - 864e5)
                      },
                  }
              })()
            : (function() {
                  return {
                      write: function() {},
                      read: function() {
                          return null
                      },
                      remove: function() {},
                  }
              })()
    })
    var Se = c((xr, Te) => {
        'use strict'
        Te.exports = function(e) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
        }
    })
    var Re = c((Dr, Oe) => {
        'use strict'
        Oe.exports = function(e, t) {
            return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e
        }
    })
    var Ue = c((Cr, Ae) => {
        'use strict'
        var _t = Se(),
            Vt = Re()
        Ae.exports = function(e, t) {
            return e && !_t(t) ? Vt(e, t) : t
        }
    })
    var Le = c((qr, Pe) => {
        'use strict'
        var k = h(),
            Kt = [
                'age',
                'authorization',
                'content-length',
                'content-type',
                'etag',
                'expires',
                'from',
                'host',
                'if-modified-since',
                'if-unmodified-since',
                'last-modified',
                'location',
                'max-forwards',
                'proxy-authorization',
                'referer',
                'retry-after',
                'user-agent',
            ]
        Pe.exports = function(e) {
            var t = {},
                n,
                s,
                i
            return (
                e &&
                    k.forEach(
                        e.split(`
`),
                        function(a) {
                            if (((i = a.indexOf(':')), (n = k.trim(a.substr(0, i)).toLowerCase()), (s = k.trim(a.substr(i + 1))), n)) {
                                if (t[n] && Kt.indexOf(n) >= 0) return
                                n === 'set-cookie' ? (t[n] = (t[n] ? t[n] : []).concat([s])) : (t[n] = t[n] ? t[n] + ', ' + s : s)
                            }
                        }
                    ),
                t
            )
        }
    })
    var Ne = c((Tr, Me) => {
        'use strict'
        var Be = h()
        Me.exports = Be.isStandardBrowserEnv()
            ? (function() {
                  var e = /(msie|trident)/i.test(navigator.userAgent),
                      t = document.createElement('a'),
                      n
                  function s(i) {
                      var o = i
                      return (
                          e && (t.setAttribute('href', o), (o = t.href)),
                          t.setAttribute('href', o),
                          {
                              href: t.href,
                              protocol: t.protocol ? t.protocol.replace(/:$/, '') : '',
                              host: t.host,
                              search: t.search ? t.search.replace(/^\?/, '') : '',
                              hash: t.hash ? t.hash.replace(/^#/, '') : '',
                              hostname: t.hostname,
                              port: t.port,
                              pathname: t.pathname.charAt(0) === '/' ? t.pathname : '/' + t.pathname,
                          }
                      )
                  }
                  return (
                      (n = s(window.location.href)),
                      function(o) {
                          var a = Be.isString(o) ? s(o) : o
                          return a.protocol === n.protocol && a.host === n.host
                      }
                  )
              })()
            : (function() {
                  return function() {
                      return !0
                  }
              })()
    })
    var z = c((Sr, je) => {
        'use strict'
        var T = h(),
            Gt = De(),
            Yt = qe(),
            Xt = H(),
            Jt = Ue(),
            Wt = Le(),
            Zt = Ne(),
            I = F()
        je.exports = function(e) {
            return new Promise(function(n, s) {
                var i = e.data,
                    o = e.headers
                T.isFormData(i) && delete o['Content-Type']
                var a = new XMLHttpRequest()
                if (e.auth) {
                    var l = e.auth.username || '',
                        p = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : ''
                    o.Authorization = 'Basic ' + btoa(l + ':' + p)
                }
                var v = Jt(e.baseURL, e.url)
                if (
                    (a.open(e.method.toUpperCase(), Xt(v, e.params, e.paramsSerializer), !0),
                    (a.timeout = e.timeout),
                    (a.onreadystatechange = function() {
                        if (!(!a || a.readyState !== 4) && !(a.status === 0 && !(a.responseURL && a.responseURL.indexOf('file:') === 0))) {
                            var u = 'getAllResponseHeaders' in a ? Wt(a.getAllResponseHeaders()) : null,
                                E = !e.responseType || e.responseType === 'text' ? a.responseText : a.response,
                                ht = { data: E, status: a.status, statusText: a.statusText, headers: u, config: e, request: a }
                            Gt(n, s, ht), (a = null)
                        }
                    }),
                    (a.onabort = function() {
                        !a || (s(I('Request aborted', e, 'ECONNABORTED', a)), (a = null))
                    }),
                    (a.onerror = function() {
                        s(I('Network Error', e, null, a)), (a = null)
                    }),
                    (a.ontimeout = function() {
                        var u = 'timeout of ' + e.timeout + 'ms exceeded'
                        e.timeoutErrorMessage && (u = e.timeoutErrorMessage), s(I(u, e, 'ECONNABORTED', a)), (a = null)
                    }),
                    T.isStandardBrowserEnv())
                ) {
                    var g = (e.withCredentials || Zt(v)) && e.xsrfCookieName ? Yt.read(e.xsrfCookieName) : void 0
                    g && (o[e.xsrfHeaderName] = g)
                }
                if (
                    ('setRequestHeader' in a &&
                        T.forEach(o, function(u, E) {
                            typeof i == 'undefined' && E.toLowerCase() === 'content-type' ? delete o[E] : a.setRequestHeader(E, u)
                        }),
                    T.isUndefined(e.withCredentials) || (a.withCredentials = !!e.withCredentials),
                    e.responseType)
                )
                    try {
                        a.responseType = e.responseType
                    } catch (f) {
                        if (e.responseType !== 'json') throw f
                    }
                typeof e.onDownloadProgress == 'function' && a.addEventListener('progress', e.onDownloadProgress),
                    typeof e.onUploadProgress == 'function' && a.upload && a.upload.addEventListener('progress', e.onUploadProgress),
                    e.cancelToken &&
                        e.cancelToken.promise.then(function(u) {
                            !a || (a.abort(), s(u), (a = null))
                        }),
                    i || (i = null),
                    a.send(i)
            })
        }
    })
    var _ = c((Or, He) => {
        'use strict'
        var m = h(),
            $e = ye(),
            Qt = { 'Content-Type': 'application/x-www-form-urlencoded' }
        function Fe(r, e) {
            !m.isUndefined(r) && m.isUndefined(r['Content-Type']) && (r['Content-Type'] = e)
        }
        function er() {
            var r
            return (
                typeof XMLHttpRequest != 'undefined'
                    ? (r = z())
                    : typeof process != 'undefined' && Object.prototype.toString.call(process) === '[object process]' && (r = z()),
                r
            )
        }
        var S = {
            adapter: er(),
            transformRequest: [
                function(e, t) {
                    return (
                        $e(t, 'Accept'),
                        $e(t, 'Content-Type'),
                        m.isFormData(e) || m.isArrayBuffer(e) || m.isBuffer(e) || m.isStream(e) || m.isFile(e) || m.isBlob(e)
                            ? e
                            : m.isArrayBufferView(e)
                            ? e.buffer
                            : m.isURLSearchParams(e)
                            ? (Fe(t, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString())
                            : m.isObject(e)
                            ? (Fe(t, 'application/json;charset=utf-8'), JSON.stringify(e))
                            : e
                    )
                },
            ],
            transformResponse: [
                function(e) {
                    if (typeof e == 'string')
                        try {
                            e = JSON.parse(e)
                        } catch (t) {}
                    return e
                },
            ],
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            maxBodyLength: -1,
            validateStatus: function(e) {
                return e >= 200 && e < 300
            },
        }
        S.headers = { common: { Accept: 'application/json, text/plain, */*' } }
        m.forEach(['delete', 'get', 'head'], function(e) {
            S.headers[e] = {}
        })
        m.forEach(['post', 'put', 'patch'], function(e) {
            S.headers[e] = m.merge(Qt)
        })
        He.exports = S
    })
    var ze = c((Rr, ke) => {
        'use strict'
        var Ie = h(),
            V = me(),
            tr = $(),
            rr = _()
        function K(r) {
            r.cancelToken && r.cancelToken.throwIfRequested()
        }
        ke.exports = function(e) {
            K(e),
                (e.headers = e.headers || {}),
                (e.data = V(e.data, e.headers, e.transformRequest)),
                (e.headers = Ie.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers)),
                Ie.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function(s) {
                    delete e.headers[s]
                })
            var t = e.adapter || rr.adapter
            return t(e).then(
                function(s) {
                    return K(e), (s.data = V(s.data, s.headers, e.transformResponse)), s
                },
                function(s) {
                    return (
                        tr(s) || (K(e), s && s.response && (s.response.data = V(s.response.data, s.response.headers, e.transformResponse))), Promise.reject(s)
                    )
                }
            )
        }
    })
    var G = c((Ar, _e) => {
        'use strict'
        var d = h()
        _e.exports = function(e, t) {
            t = t || {}
            var n = {},
                s = ['url', 'method', 'data'],
                i = ['headers', 'auth', 'proxy', 'params'],
                o = [
                    'baseURL',
                    'transformRequest',
                    'transformResponse',
                    'paramsSerializer',
                    'timeout',
                    'timeoutMessage',
                    'withCredentials',
                    'adapter',
                    'responseType',
                    'xsrfCookieName',
                    'xsrfHeaderName',
                    'onUploadProgress',
                    'onDownloadProgress',
                    'decompress',
                    'maxContentLength',
                    'maxBodyLength',
                    'maxRedirects',
                    'transport',
                    'httpAgent',
                    'httpsAgent',
                    'cancelToken',
                    'socketPath',
                    'responseEncoding',
                ],
                a = ['validateStatus']
            function l(f, u) {
                return d.isPlainObject(f) && d.isPlainObject(u) ? d.merge(f, u) : d.isPlainObject(u) ? d.merge({}, u) : d.isArray(u) ? u.slice() : u
            }
            function p(f) {
                d.isUndefined(t[f]) ? d.isUndefined(e[f]) || (n[f] = l(void 0, e[f])) : (n[f] = l(e[f], t[f]))
            }
            d.forEach(s, function(u) {
                d.isUndefined(t[u]) || (n[u] = l(void 0, t[u]))
            }),
                d.forEach(i, p),
                d.forEach(o, function(u) {
                    d.isUndefined(t[u]) ? d.isUndefined(e[u]) || (n[u] = l(void 0, e[u])) : (n[u] = l(void 0, t[u]))
                }),
                d.forEach(a, function(u) {
                    u in t ? (n[u] = l(e[u], t[u])) : u in e && (n[u] = l(void 0, e[u]))
                })
            var v = s
                    .concat(i)
                    .concat(o)
                    .concat(a),
                g = Object.keys(e)
                    .concat(Object.keys(t))
                    .filter(function(u) {
                        return v.indexOf(u) === -1
                    })
            return d.forEach(g, p), n
        }
    })
    var Ye = c((Ur, Ve) => {
        'use strict'
        var Ke = h(),
            nr = H(),
            Ge = pe(),
            sr = ze(),
            O = G()
        function x(r) {
            ;(this.defaults = r), (this.interceptors = { request: new Ge(), response: new Ge() })
        }
        x.prototype.request = function(e) {
            typeof e == 'string' ? ((e = arguments[1] || {}), (e.url = arguments[0])) : (e = e || {}),
                (e = O(this.defaults, e)),
                e.method ? (e.method = e.method.toLowerCase()) : this.defaults.method ? (e.method = this.defaults.method.toLowerCase()) : (e.method = 'get')
            var t = [sr, void 0],
                n = Promise.resolve(e)
            for (
                this.interceptors.request.forEach(function(i) {
                    t.unshift(i.fulfilled, i.rejected)
                }),
                    this.interceptors.response.forEach(function(i) {
                        t.push(i.fulfilled, i.rejected)
                    });
                t.length;

            )
                n = n.then(t.shift(), t.shift())
            return n
        }
        x.prototype.getUri = function(e) {
            return (e = O(this.defaults, e)), nr(e.url, e.params, e.paramsSerializer).replace(/^\?/, '')
        }
        Ke.forEach(['delete', 'get', 'head', 'options'], function(e) {
            x.prototype[e] = function(t, n) {
                return this.request(O(n || {}, { method: e, url: t, data: (n || {}).data }))
            }
        })
        Ke.forEach(['post', 'put', 'patch'], function(e) {
            x.prototype[e] = function(t, n, s) {
                return this.request(O(s || {}, { method: e, url: t, data: n }))
            }
        })
        Ve.exports = x
    })
    var X = c((Pr, Xe) => {
        'use strict'
        function Y(r) {
            this.message = r
        }
        Y.prototype.toString = function() {
            return 'Cancel' + (this.message ? ': ' + this.message : '')
        }
        Y.prototype.__CANCEL__ = !0
        Xe.exports = Y
    })
    var We = c((Lr, Je) => {
        'use strict'
        var ir = X()
        function R(r) {
            if (typeof r != 'function') throw new TypeError('executor must be a function.')
            var e
            this.promise = new Promise(function(s) {
                e = s
            })
            var t = this
            r(function(s) {
                t.reason || ((t.reason = new ir(s)), e(t.reason))
            })
        }
        R.prototype.throwIfRequested = function() {
            if (this.reason) throw this.reason
        }
        R.source = function() {
            var e,
                t = new R(function(s) {
                    e = s
                })
            return { token: t, cancel: e }
        }
        Je.exports = R
    })
    var Qe = c((Mr, Ze) => {
        'use strict'
        Ze.exports = function(e) {
            return function(n) {
                return e.apply(null, n)
            }
        }
    })
    var tt = c((Br, et) => {
        'use strict'
        et.exports = function(e) {
            return typeof e == 'object' && e.isAxiosError === !0
        }
    })
    var st = c((Nr, J) => {
        'use strict'
        var rt = h(),
            ar = L(),
            A = Ye(),
            or = G(),
            ur = _()
        function nt(r) {
            var e = new A(r),
                t = ar(A.prototype.request, e)
            return rt.extend(t, A.prototype, e), rt.extend(t, e), t
        }
        var w = nt(ur)
        w.Axios = A
        w.create = function(e) {
            return nt(or(w.defaults, e))
        }
        w.Cancel = X()
        w.CancelToken = We()
        w.isCancel = $()
        w.all = function(e) {
            return Promise.all(e)
        }
        w.spread = Qe()
        w.isAxiosError = tt()
        J.exports = w
        J.exports.default = w
    })
    var at = c((jr, it) => {
        it.exports = st()
    })
    var P = class {
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
        ie = P
    var W = xt(at()),
        Z
    ;(function(r) {
        ;(r.GET = 'GET'), (r.POST = 'POST')
    })(Z || (Z = {}))
    var ot = class {
            constructor(e, t) {
                this.BASE_URL = e
                this.COMPLETE = t
                this.DEFAULT_HEADER = {}
                ;(this.BASE_URL = e), (this.COMPLETE = t)
            }
            async request(e, t, n, s) {
                try {
                    let i = await W.default({ method: e, url: this.BASE_URL + (t || ''), data: n, headers: s || this.DEFAULT_HEADER || {} })
                    return await this.COMPLETE(i.data)
                } catch (i) {
                    throw i
                }
            }
        },
        Q = class {
            constructor() {}
            getRequester(e, t) {
                return new ot(e, t)
            }
            async fetch(e, t = Z.GET, n = {}, s = {}) {
                return (await W.default({ method: t, url: e, data: n, headers: s })).data
            }
        },
        ut = Q
    var ee = class {
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
                        .forEach((n) => (t += Number(n) < 10 ? `/0${n}` : `/${n}`)),
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
                    n = new Date(e)
                return (
                    (t = this.getTimeDTO()),
                    (t.hour = n.getHours() < 10 ? `0${n.getHours()}` : n.getHours().toString()),
                    (t.min = n.getMinutes() < 10 ? `0${n.getMinutes()}` : n.getMinutes().toString()),
                    (t.sec = n.getSeconds() < 10 ? `0${n.getSeconds()}` : n.getSeconds().toString()),
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
                    n = e - Date.now()
                if (n > 0) {
                    t = this.getTimeDTO()
                    let s = ~~(n / 1e3 / 60 / 60) % 24
                    t.hour = s < 10 ? `0${s}` : s.toString()
                    let i = ~~(n / 1e3 / 60) % 60
                    t.min = i < 10 ? `0${i}` : i.toString()
                    let o = ~~(n / 1e3) % 60
                    ;(t.sec = o < 10 ? `0${o}` : o.toString()), (t.full = `${t.hour}:${t.min}:${t.sec}`)
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
        ct = ee
    var te = class {
            constructor() {}
            isValidMobile(e) {
                return /^[1][0-9]{10}$/.test(e)
            }
            isValidEmail(e) {
                return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(e)
            }
        },
        lt = te
    var re = class {
            constructor() {}
            getLatLngDistance(e, t, n, s) {
                let i = (e * Math.PI) / 180,
                    o = (n * Math.PI) / 180,
                    a = i - o,
                    l = (t * Math.PI) / 180 - (s * Math.PI) / 180,
                    p = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(i) * Math.cos(o) * Math.pow(Math.sin(l / 2), 2)))
                return (p = p * 6378.137), (p = Math.round(p * 1e4) / 1e4), p.toFixed(2)
            }
            wannaObject(e, t) {
                return e
            }
        },
        ft = re
    var ne = class {
        constructor() {
            this.BinderMap = new Map()
            this.bindClass(this, 'Log', ie),
                this.bindClass(this, 'Requester', ut),
                this.bindClass(this, 'UtilsTime', ct),
                this.bindClass(this, 'UtilsVaild', lt),
                this.bindClass(this, 'UtilsCalculation', ft)
        }
        bindClass(e, t, n) {
            n instanceof Function &&
                (e.BinderMap.set(t, new n()),
                Object.getOwnPropertyNames(n.prototype).forEach((s) => {
                    s !== 'constructor' &&
                        (e[s] = (...i) => {
                            let o = e.BinderMap.get(t)
                            return o[s].apply(o, i)
                        })
                }))
        }
    }
    var se = class {
            constructor() {}
            getHeaders() {
                return { 'Cache-Control': 'no-cache', 'Content-type': 'application/json', authorization: localStorage['token-qqlx'] }
            }
            loadOff(e) {
                let t = e.message
                window.$warn(t), window.$load.hide(), window.$common.log(t)
            }
            Loading() {
                return (e, t, n) => {
                    let s = n.value
                    n.value = async function() {
                        try {
                            window.$load.show(), await s.apply(this, arguments), window.$load.hide()
                        } catch (i) {
                            window.$common.loadOff(i)
                        }
                    }
                }
            }
            getVueUrlParams() {
                let e = decodeURIComponent(location.href)
                e = e.substring(e.indexOf('?') + 1, e.length)
                let t = {}
                return (
                    e.split('&').forEach((n) => {
                        let s = n.split('=')
                        t[s[0]] = s[1]
                    }),
                    t
                )
            }
            handleHtmlError() {
                window.onerror = (e, t, n, s, i) => window.$common.log(e)
            }
        },
        dt = se
    var pt = class extends ne {
        constructor() {
            super()
            this.bindClass(this, 'UtilsReactWeb', dt)
        }
    }
    window.$common = new pt()
})()
