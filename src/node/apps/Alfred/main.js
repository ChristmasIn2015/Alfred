var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module2) => () => {
  if (!module2) {
    module2 = {exports: {}};
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  if (module2 && module2.__esModule)
    return module2;
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", {value: module2, enumerable: true})), module2);
};

// node_modules/http-proxy/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS((exports2, module2) => {
  "use strict";
  var has = Object.prototype.hasOwnProperty;
  var prefix = "~";
  function Events() {
  }
  if (Object.create) {
    Events.prototype = Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }
  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  }
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Events();
    else
      delete emitter._events[evt];
  }
  function EventEmitter() {
    this._events = new Events();
    this._eventsCount = 0;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events) {
      if (has.call(events, name))
        names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
      return 0;
    if (listeners.fn)
      return 1;
    return listeners.length;
  };
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, void 0, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0; i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, void 0, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };
  EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else
        clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt])
        clearEvent(this, evt);
    } else {
      this._events = new Events();
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;
  EventEmitter.prefixed = prefix;
  EventEmitter.EventEmitter = EventEmitter;
  if (typeof module2 !== "undefined") {
    module2.exports = EventEmitter;
  }
});

// node_modules/requires-port/index.js
var require_requires_port = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = function required(port, protocol) {
    protocol = protocol.split(":")[0];
    port = +port;
    if (!port)
      return false;
    switch (protocol) {
      case "http":
      case "ws":
        return port !== 80;
      case "https":
      case "wss":
        return port !== 443;
      case "ftp":
        return port !== 21;
      case "gopher":
        return port !== 70;
      case "file":
        return false;
    }
    return port !== 0;
  };
});

// node_modules/http-proxy/lib/http-proxy/common.js
var require_common = __commonJS((exports2) => {
  var common = exports2;
  var url = require("url");
  var extend = require("util")._extend;
  var required = require_requires_port();
  var upgradeHeader = /(^|,)\s*upgrade\s*($|,)/i;
  var isSSL = /^https|wss/;
  common.isSSL = isSSL;
  common.setupOutgoing = function(outgoing, options, req, forward) {
    outgoing.port = options[forward || "target"].port || (isSSL.test(options[forward || "target"].protocol) ? 443 : 80);
    [
      "host",
      "hostname",
      "socketPath",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "secureProtocol"
    ].forEach(function(e) {
      outgoing[e] = options[forward || "target"][e];
    });
    outgoing.method = options.method || req.method;
    outgoing.headers = extend({}, req.headers);
    if (options.headers) {
      extend(outgoing.headers, options.headers);
    }
    if (options.auth) {
      outgoing.auth = options.auth;
    }
    if (options.ca) {
      outgoing.ca = options.ca;
    }
    if (isSSL.test(options[forward || "target"].protocol)) {
      outgoing.rejectUnauthorized = typeof options.secure === "undefined" ? true : options.secure;
    }
    outgoing.agent = options.agent || false;
    outgoing.localAddress = options.localAddress;
    if (!outgoing.agent) {
      outgoing.headers = outgoing.headers || {};
      if (typeof outgoing.headers.connection !== "string" || !upgradeHeader.test(outgoing.headers.connection)) {
        outgoing.headers.connection = "close";
      }
    }
    var target = options[forward || "target"];
    var targetPath = target && options.prependPath !== false ? target.path || "" : "";
    var outgoingPath = !options.toProxy ? url.parse(req.url).path || "" : req.url;
    outgoingPath = !options.ignorePath ? outgoingPath : "";
    outgoing.path = common.urlJoin(targetPath, outgoingPath);
    if (options.changeOrigin) {
      outgoing.headers.host = required(outgoing.port, options[forward || "target"].protocol) && !hasPort(outgoing.host) ? outgoing.host + ":" + outgoing.port : outgoing.host;
    }
    return outgoing;
  };
  common.setupSocket = function(socket) {
    socket.setTimeout(0);
    socket.setNoDelay(true);
    socket.setKeepAlive(true, 0);
    return socket;
  };
  common.getPort = function(req) {
    var res = req.headers.host ? req.headers.host.match(/:(\d+)/) : "";
    return res ? res[1] : common.hasEncryptedConnection(req) ? "443" : "80";
  };
  common.hasEncryptedConnection = function(req) {
    return Boolean(req.connection.encrypted || req.connection.pair);
  };
  common.urlJoin = function() {
    var args = Array.prototype.slice.call(arguments), lastIndex = args.length - 1, last = args[lastIndex], lastSegs = last.split("?"), retSegs;
    args[lastIndex] = lastSegs.shift();
    retSegs = [
      args.filter(Boolean).join("/").replace(/\/+/g, "/").replace("http:/", "http://").replace("https:/", "https://")
    ];
    retSegs.push.apply(retSegs, lastSegs);
    return retSegs.join("?");
  };
  common.rewriteCookieProperty = function rewriteCookieProperty(header, config, property) {
    if (Array.isArray(header)) {
      return header.map(function(headerElement) {
        return rewriteCookieProperty(headerElement, config, property);
      });
    }
    return header.replace(new RegExp("(;\\s*" + property + "=)([^;]+)", "i"), function(match, prefix, previousValue) {
      var newValue;
      if (previousValue in config) {
        newValue = config[previousValue];
      } else if ("*" in config) {
        newValue = config["*"];
      } else {
        return match;
      }
      if (newValue) {
        return prefix + newValue;
      } else {
        return "";
      }
    });
  };
  function hasPort(host) {
    return !!~host.indexOf(":");
  }
});

// node_modules/http-proxy/lib/http-proxy/passes/web-outgoing.js
var require_web_outgoing = __commonJS((exports2, module2) => {
  var url = require("url");
  var common = require_common();
  var redirectRegex = /^201|30(1|2|7|8)$/;
  /*!
   * Array of passes.
   *
   * A `pass` is just a function that is executed on `req, res, options`
   * so that you can easily add new checks while still keeping the base
   * flexible.
   */
  module2.exports = {
    removeChunked: function removeChunked(req, res, proxyRes) {
      if (req.httpVersion === "1.0") {
        delete proxyRes.headers["transfer-encoding"];
      }
    },
    setConnection: function setConnection(req, res, proxyRes) {
      if (req.httpVersion === "1.0") {
        proxyRes.headers.connection = req.headers.connection || "close";
      } else if (req.httpVersion !== "2.0" && !proxyRes.headers.connection) {
        proxyRes.headers.connection = req.headers.connection || "keep-alive";
      }
    },
    setRedirectHostRewrite: function setRedirectHostRewrite(req, res, proxyRes, options) {
      if ((options.hostRewrite || options.autoRewrite || options.protocolRewrite) && proxyRes.headers["location"] && redirectRegex.test(proxyRes.statusCode)) {
        var target = url.parse(options.target);
        var u = url.parse(proxyRes.headers["location"]);
        if (target.host != u.host) {
          return;
        }
        if (options.hostRewrite) {
          u.host = options.hostRewrite;
        } else if (options.autoRewrite) {
          u.host = req.headers["host"];
        }
        if (options.protocolRewrite) {
          u.protocol = options.protocolRewrite;
        }
        proxyRes.headers["location"] = u.format();
      }
    },
    writeHeaders: function writeHeaders(req, res, proxyRes, options) {
      var rewriteCookieDomainConfig = options.cookieDomainRewrite, rewriteCookiePathConfig = options.cookiePathRewrite, preserveHeaderKeyCase = options.preserveHeaderKeyCase, rawHeaderKeyMap, setHeader = function(key2, header) {
        if (header == void 0)
          return;
        if (rewriteCookieDomainConfig && key2.toLowerCase() === "set-cookie") {
          header = common.rewriteCookieProperty(header, rewriteCookieDomainConfig, "domain");
        }
        if (rewriteCookiePathConfig && key2.toLowerCase() === "set-cookie") {
          header = common.rewriteCookieProperty(header, rewriteCookiePathConfig, "path");
        }
        res.setHeader(String(key2).trim(), header);
      };
      if (typeof rewriteCookieDomainConfig === "string") {
        rewriteCookieDomainConfig = {"*": rewriteCookieDomainConfig};
      }
      if (typeof rewriteCookiePathConfig === "string") {
        rewriteCookiePathConfig = {"*": rewriteCookiePathConfig};
      }
      if (preserveHeaderKeyCase && proxyRes.rawHeaders != void 0) {
        rawHeaderKeyMap = {};
        for (var i = 0; i < proxyRes.rawHeaders.length; i += 2) {
          var key = proxyRes.rawHeaders[i];
          rawHeaderKeyMap[key.toLowerCase()] = key;
        }
      }
      Object.keys(proxyRes.headers).forEach(function(key2) {
        var header = proxyRes.headers[key2];
        if (preserveHeaderKeyCase && rawHeaderKeyMap) {
          key2 = rawHeaderKeyMap[key2] || key2;
        }
        setHeader(key2, header);
      });
    },
    writeStatusCode: function writeStatusCode(req, res, proxyRes) {
      if (proxyRes.statusMessage) {
        res.statusCode = proxyRes.statusCode;
        res.statusMessage = proxyRes.statusMessage;
      } else {
        res.statusCode = proxyRes.statusCode;
      }
    }
  };
});

// node_modules/ms/index.js
var require_ms = __commonJS((exports2, module2) => {
  var s = 1e3;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var y = d * 365.25;
  module2.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms) {
    if (ms >= d) {
      return Math.round(ms / d) + "d";
    }
    if (ms >= h) {
      return Math.round(ms / h) + "h";
    }
    if (ms >= m) {
      return Math.round(ms / m) + "m";
    }
    if (ms >= s) {
      return Math.round(ms / s) + "s";
    }
    return ms + "ms";
  }
  function fmtLong(ms) {
    return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
  }
  function plural(ms, n, name) {
    if (ms < n) {
      return;
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + " " + name;
    }
    return Math.ceil(ms / n) + " " + name + "s";
  }
});

// node_modules/debug/src/debug.js
var require_debug = __commonJS((exports2, module2) => {
  exports2 = module2.exports = createDebug.debug = createDebug["default"] = createDebug;
  exports2.coerce = coerce;
  exports2.disable = disable;
  exports2.enable = enable;
  exports2.enabled = enabled;
  exports2.humanize = require_ms();
  exports2.names = [];
  exports2.skips = [];
  exports2.formatters = {};
  var prevTime;
  function selectColor(namespace) {
    var hash = 0, i;
    for (i in namespace) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0;
    }
    return exports2.colors[Math.abs(hash) % exports2.colors.length];
  }
  function createDebug(namespace) {
    function debug() {
      if (!debug.enabled)
        return;
      var self = debug;
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      args[0] = exports2.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%O");
      }
      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
        if (match === "%%")
          return match;
        index++;
        var formatter = exports2.formatters[format];
        if (typeof formatter === "function") {
          var val = args[index];
          match = formatter.call(self, val);
          args.splice(index, 1);
          index--;
        }
        return match;
      });
      exports2.formatArgs.call(self, args);
      var logFn = debug.log || exports2.log || console.log.bind(console);
      logFn.apply(self, args);
    }
    debug.namespace = namespace;
    debug.enabled = exports2.enabled(namespace);
    debug.useColors = exports2.useColors();
    debug.color = selectColor(namespace);
    if (typeof exports2.init === "function") {
      exports2.init(debug);
    }
    return debug;
  }
  function enable(namespaces) {
    exports2.save(namespaces);
    exports2.names = [];
    exports2.skips = [];
    var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
    var len = split.length;
    for (var i = 0; i < len; i++) {
      if (!split[i])
        continue;
      namespaces = split[i].replace(/\*/g, ".*?");
      if (namespaces[0] === "-") {
        exports2.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
      } else {
        exports2.names.push(new RegExp("^" + namespaces + "$"));
      }
    }
  }
  function disable() {
    exports2.enable("");
  }
  function enabled(name) {
    var i, len;
    for (i = 0, len = exports2.skips.length; i < len; i++) {
      if (exports2.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports2.names.length; i < len; i++) {
      if (exports2.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }
  function coerce(val) {
    if (val instanceof Error)
      return val.stack || val.message;
    return val;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS((exports2, module2) => {
  exports2 = module2.exports = require_debug();
  exports2.log = log;
  exports2.formatArgs = formatArgs;
  exports2.save = save;
  exports2.load = load;
  exports2.useColors = useColors;
  exports2.storage = typeof chrome != "undefined" && typeof chrome.storage != "undefined" ? chrome.storage.local : localstorage();
  exports2.colors = [
    "lightseagreen",
    "forestgreen",
    "goldenrod",
    "dodgerblue",
    "darkorchid",
    "crimson"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
      return true;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  exports2.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return "[UnexpectedJSONParseError]: " + err.message;
    }
  };
  function formatArgs(args) {
    var useColors2 = this.useColors;
    args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports2.humanize(this.diff);
    if (!useColors2)
      return;
    var c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if (match === "%%")
        return;
      index++;
      if (match === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  function log() {
    return typeof console === "object" && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }
  function save(namespaces) {
    try {
      if (namespaces == null) {
        exports2.storage.removeItem("debug");
      } else {
        exports2.storage.debug = namespaces;
      }
    } catch (e) {
    }
  }
  function load() {
    var r;
    try {
      r = exports2.storage.debug;
    } catch (e) {
    }
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = process.env.DEBUG;
    }
    return r;
  }
  exports2.enable(load());
  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {
    }
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS((exports2, module2) => {
  var tty = require("tty");
  var util = require("util");
  exports2 = module2.exports = require_debug();
  exports2.init = init;
  exports2.log = log;
  exports2.formatArgs = formatArgs;
  exports2.save = save;
  exports2.load = load;
  exports2.useColors = useColors;
  exports2.colors = [6, 2, 3, 4, 5, 1];
  exports2.inspectOpts = Object.keys(process.env).filter(function(key) {
    return /^debug_/i.test(key);
  }).reduce(function(obj, key) {
    var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
      return k.toUpperCase();
    });
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val))
      val = true;
    else if (/^(no|off|false|disabled)$/i.test(val))
      val = false;
    else if (val === "null")
      val = null;
    else
      val = Number(val);
    obj[prop] = val;
    return obj;
  }, {});
  var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
  if (fd !== 1 && fd !== 2) {
    util.deprecate(function() {
    }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
  }
  var stream = fd === 1 ? process.stdout : fd === 2 ? process.stderr : createWritableStdioStream(fd);
  function useColors() {
    return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(fd);
  }
  exports2.formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
      return str.trim();
    }).join(" ");
  };
  exports2.formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };
  function formatArgs(args) {
    var name = this.namespace;
    var useColors2 = this.useColors;
    if (useColors2) {
      var c = this.color;
      var prefix = "  [3" + c + ";1m" + name + " [0m";
      args[0] = prefix + args[0].split("\n").join("\n" + prefix);
      args.push("[3" + c + "m+" + exports2.humanize(this.diff) + "[0m");
    } else {
      args[0] = new Date().toUTCString() + " " + name + " " + args[0];
    }
  }
  function log() {
    return stream.write(util.format.apply(util, arguments) + "\n");
  }
  function save(namespaces) {
    if (namespaces == null) {
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = namespaces;
    }
  }
  function load() {
    return process.env.DEBUG;
  }
  function createWritableStdioStream(fd2) {
    var stream2;
    var tty_wrap = process.binding("tty_wrap");
    switch (tty_wrap.guessHandleType(fd2)) {
      case "TTY":
        stream2 = new tty.WriteStream(fd2);
        stream2._type = "tty";
        if (stream2._handle && stream2._handle.unref) {
          stream2._handle.unref();
        }
        break;
      case "FILE":
        var fs = require("fs");
        stream2 = new fs.SyncWriteStream(fd2, {autoClose: false});
        stream2._type = "fs";
        break;
      case "PIPE":
      case "TCP":
        var net = require("net");
        stream2 = new net.Socket({
          fd: fd2,
          readable: false,
          writable: true
        });
        stream2.readable = false;
        stream2.read = null;
        stream2._type = "pipe";
        if (stream2._handle && stream2._handle.unref) {
          stream2._handle.unref();
        }
        break;
      default:
        throw new Error("Implement me. Unknown stream file type!");
    }
    stream2.fd = fd2;
    stream2._isStdio = true;
    return stream2;
  }
  function init(debug) {
    debug.inspectOpts = {};
    var keys = Object.keys(exports2.inspectOpts);
    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
    }
  }
  exports2.enable(load());
});

// node_modules/debug/src/index.js
var require_src = __commonJS((exports2, module2) => {
  if (typeof process !== "undefined" && process.type === "renderer") {
    module2.exports = require_browser();
  } else {
    module2.exports = require_node();
  }
});

// node_modules/follow-redirects/debug.js
var require_debug2 = __commonJS((exports2, module2) => {
  var debug;
  module2.exports = function() {
    if (!debug) {
      try {
        debug = require_src()("follow-redirects");
      } catch (error) {
        debug = function() {
        };
      }
    }
    debug.apply(null, arguments);
  };
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS((exports2, module2) => {
  var url = require("url");
  var URL = url.URL;
  var http = require("http");
  var https = require("https");
  var Writable = require("stream").Writable;
  var assert = require("assert");
  var debug = require_debug2();
  var eventHandlers = Object.create(null);
  ["abort", "aborted", "connect", "error", "socket", "timeout"].forEach(function(event) {
    eventHandlers[event] = function(arg1, arg2, arg3) {
      this._redirectable.emit(event, arg1, arg2, arg3);
    };
  });
  var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "");
  var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
  var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
  var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
  function RedirectableRequest(options, responseCallback) {
    Writable.call(this);
    this._sanitizeOptions(options);
    this._options = options;
    this._ended = false;
    this._ending = false;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];
    if (responseCallback) {
      this.on("response", responseCallback);
    }
    var self = this;
    this._onNativeResponse = function(response) {
      self._processResponse(response);
    };
    this._performRequest();
  }
  RedirectableRequest.prototype = Object.create(Writable.prototype);
  RedirectableRequest.prototype.write = function(data, encoding, callback) {
    if (this._ending) {
      throw new WriteAfterEndError();
    }
    if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
      throw new TypeError("data should be a string, Buffer or Uint8Array");
    }
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }
    if (data.length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
      this._requestBodyLength += data.length;
      this._requestBodyBuffers.push({data, encoding});
      this._currentRequest.write(data, encoding, callback);
    } else {
      this.emit("error", new MaxBodyLengthExceededError());
      this.abort();
    }
  };
  RedirectableRequest.prototype.end = function(data, encoding, callback) {
    if (typeof data === "function") {
      callback = data;
      data = encoding = null;
    } else if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }
    if (!data) {
      this._ended = this._ending = true;
      this._currentRequest.end(null, null, callback);
    } else {
      var self = this;
      var currentRequest = this._currentRequest;
      this.write(data, encoding, function() {
        self._ended = true;
        currentRequest.end(null, null, callback);
      });
      this._ending = true;
    }
  };
  RedirectableRequest.prototype.setHeader = function(name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
  };
  RedirectableRequest.prototype.removeHeader = function(name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
  };
  RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
    if (callback) {
      this.once("timeout", callback);
    }
    if (this.socket) {
      startTimer(this, msecs);
    } else {
      var self = this;
      this._currentRequest.once("socket", function() {
        startTimer(self, msecs);
      });
    }
    this.once("response", clearTimer);
    this.once("error", clearTimer);
    return this;
  };
  function startTimer(request, msecs) {
    clearTimeout(request._timeout);
    request._timeout = setTimeout(function() {
      request.emit("timeout");
    }, msecs);
  }
  function clearTimer() {
    clearTimeout(this._timeout);
  }
  [
    "abort",
    "flushHeaders",
    "getHeader",
    "setNoDelay",
    "setSocketKeepAlive"
  ].forEach(function(method) {
    RedirectableRequest.prototype[method] = function(a, b) {
      return this._currentRequest[method](a, b);
    };
  });
  ["aborted", "connection", "socket"].forEach(function(property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
      get: function() {
        return this._currentRequest[property];
      }
    });
  });
  RedirectableRequest.prototype._sanitizeOptions = function(options) {
    if (!options.headers) {
      options.headers = {};
    }
    if (options.host) {
      if (!options.hostname) {
        options.hostname = options.host;
      }
      delete options.host;
    }
    if (!options.pathname && options.path) {
      var searchPos = options.path.indexOf("?");
      if (searchPos < 0) {
        options.pathname = options.path;
      } else {
        options.pathname = options.path.substring(0, searchPos);
        options.search = options.path.substring(searchPos);
      }
    }
  };
  RedirectableRequest.prototype._performRequest = function() {
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
      this.emit("error", new TypeError("Unsupported protocol " + protocol));
      return;
    }
    if (this._options.agents) {
      var scheme = protocol.substr(0, protocol.length - 1);
      this._options.agent = this._options.agents[scheme];
    }
    var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
    this._currentUrl = url.format(this._options);
    request._redirectable = this;
    for (var event in eventHandlers) {
      if (event) {
        request.on(event, eventHandlers[event]);
      }
    }
    if (this._isRedirect) {
      var i = 0;
      var self = this;
      var buffers = this._requestBodyBuffers;
      (function writeNext(error) {
        if (request === self._currentRequest) {
          if (error) {
            self.emit("error", error);
          } else if (i < buffers.length) {
            var buffer = buffers[i++];
            if (!request.finished) {
              request.write(buffer.data, buffer.encoding, writeNext);
            }
          } else if (self._ended) {
            request.end();
          }
        }
      })();
    }
  };
  RedirectableRequest.prototype._processResponse = function(response) {
    var statusCode = response.statusCode;
    if (this._options.trackRedirects) {
      this._redirects.push({
        url: this._currentUrl,
        headers: response.headers,
        statusCode
      });
    }
    var location = response.headers.location;
    if (location && this._options.followRedirects !== false && statusCode >= 300 && statusCode < 400) {
      this._currentRequest.removeAllListeners();
      this._currentRequest.on("error", noop);
      this._currentRequest.abort();
      response.destroy();
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new TooManyRedirectsError());
        return;
      }
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) || url.parse(this._currentUrl).hostname;
      var redirectUrl = url.resolve(this._currentUrl, location);
      debug("redirecting to", redirectUrl);
      this._isRedirect = true;
      var redirectUrlParts = url.parse(redirectUrl);
      Object.assign(this._options, redirectUrlParts);
      if (redirectUrlParts.hostname !== previousHostName) {
        removeMatchingHeaders(/^authorization$/i, this._options.headers);
      }
      if (typeof this._options.beforeRedirect === "function") {
        var responseDetails = {headers: response.headers};
        try {
          this._options.beforeRedirect.call(null, this._options, responseDetails);
        } catch (err) {
          this.emit("error", err);
          return;
        }
        this._sanitizeOptions(this._options);
      }
      try {
        this._performRequest();
      } catch (cause) {
        var error = new RedirectionError("Redirected request failed: " + cause.message);
        error.cause = cause;
        this.emit("error", error);
      }
    } else {
      response.responseUrl = this._currentUrl;
      response.redirects = this._redirects;
      this.emit("response", response);
      this._requestBodyBuffers = [];
    }
  };
  function wrap(protocols) {
    var exports3 = {
      maxRedirects: 21,
      maxBodyLength: 10 * 1024 * 1024
    };
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function(scheme) {
      var protocol = scheme + ":";
      var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
      var wrappedProtocol = exports3[scheme] = Object.create(nativeProtocol);
      function request(input, options, callback) {
        if (typeof input === "string") {
          var urlStr = input;
          try {
            input = urlToOptions(new URL(urlStr));
          } catch (err) {
            input = url.parse(urlStr);
          }
        } else if (URL && input instanceof URL) {
          input = urlToOptions(input);
        } else {
          callback = options;
          options = input;
          input = {protocol};
        }
        if (typeof options === "function") {
          callback = options;
          options = null;
        }
        options = Object.assign({
          maxRedirects: exports3.maxRedirects,
          maxBodyLength: exports3.maxBodyLength
        }, input, options);
        options.nativeProtocols = nativeProtocols;
        assert.equal(options.protocol, protocol, "protocol mismatch");
        debug("options", options);
        return new RedirectableRequest(options, callback);
      }
      function get(input, options, callback) {
        var wrappedRequest = wrappedProtocol.request(input, options, callback);
        wrappedRequest.end();
        return wrappedRequest;
      }
      Object.defineProperties(wrappedProtocol, {
        request: {value: request, configurable: true, enumerable: true, writable: true},
        get: {value: get, configurable: true, enumerable: true, writable: true}
      });
    });
    return exports3;
  }
  function noop() {
  }
  function urlToOptions(urlObject) {
    var options = {
      protocol: urlObject.protocol,
      hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
      hash: urlObject.hash,
      search: urlObject.search,
      pathname: urlObject.pathname,
      path: urlObject.pathname + urlObject.search,
      href: urlObject.href
    };
    if (urlObject.port !== "") {
      options.port = Number(urlObject.port);
    }
    return options;
  }
  function removeMatchingHeaders(regex, headers) {
    var lastValue;
    for (var header in headers) {
      if (regex.test(header)) {
        lastValue = headers[header];
        delete headers[header];
      }
    }
    return lastValue;
  }
  function createErrorType(code, defaultMessage) {
    function CustomError(message) {
      Error.captureStackTrace(this, this.constructor);
      this.message = message || defaultMessage;
    }
    CustomError.prototype = new Error();
    CustomError.prototype.constructor = CustomError;
    CustomError.prototype.name = "Error [" + code + "]";
    CustomError.prototype.code = code;
    return CustomError;
  }
  module2.exports = wrap({http, https});
  module2.exports.wrap = wrap;
});

// node_modules/http-proxy/lib/http-proxy/passes/web-incoming.js
var require_web_incoming = __commonJS((exports2, module2) => {
  var httpNative = require("http");
  var httpsNative = require("https");
  var web_o = require_web_outgoing();
  var common = require_common();
  var followRedirects = require_follow_redirects();
  web_o = Object.keys(web_o).map(function(pass) {
    return web_o[pass];
  });
  var nativeAgents = {http: httpNative, https: httpsNative};
  /*!
   * Array of passes.
   *
   * A `pass` is just a function that is executed on `req, res, options`
   * so that you can easily add new checks while still keeping the base
   * flexible.
   */
  module2.exports = {
    deleteLength: function deleteLength(req, res, options) {
      if ((req.method === "DELETE" || req.method === "OPTIONS") && !req.headers["content-length"]) {
        req.headers["content-length"] = "0";
        delete req.headers["transfer-encoding"];
      }
    },
    timeout: function timeout(req, res, options) {
      if (options.timeout) {
        req.socket.setTimeout(options.timeout);
      }
    },
    XHeaders: function XHeaders(req, res, options) {
      if (!options.xfwd)
        return;
      var encrypted = req.isSpdy || common.hasEncryptedConnection(req);
      var values = {
        for: req.connection.remoteAddress || req.socket.remoteAddress,
        port: common.getPort(req),
        proto: encrypted ? "https" : "http"
      };
      ["for", "port", "proto"].forEach(function(header) {
        req.headers["x-forwarded-" + header] = (req.headers["x-forwarded-" + header] || "") + (req.headers["x-forwarded-" + header] ? "," : "") + values[header];
      });
      req.headers["x-forwarded-host"] = req.headers["x-forwarded-host"] || req.headers["host"] || "";
    },
    stream: function stream(req, res, options, _, server, clb) {
      server.emit("start", req, res, options.target || options.forward);
      var agents = options.followRedirects ? followRedirects : nativeAgents;
      var http = agents.http;
      var https = agents.https;
      if (options.forward) {
        var forwardReq = (options.forward.protocol === "https:" ? https : http).request(common.setupOutgoing(options.ssl || {}, options, req, "forward"));
        var forwardError = createErrorHandler(forwardReq, options.forward);
        req.on("error", forwardError);
        forwardReq.on("error", forwardError);
        (options.buffer || req).pipe(forwardReq);
        if (!options.target) {
          return res.end();
        }
      }
      var proxyReq = (options.target.protocol === "https:" ? https : http).request(common.setupOutgoing(options.ssl || {}, options, req));
      proxyReq.on("socket", function(socket) {
        if (server && !proxyReq.getHeader("expect")) {
          server.emit("proxyReq", proxyReq, req, res, options);
        }
      });
      if (options.proxyTimeout) {
        proxyReq.setTimeout(options.proxyTimeout, function() {
          proxyReq.abort();
        });
      }
      req.on("aborted", function() {
        proxyReq.abort();
      });
      var proxyError = createErrorHandler(proxyReq, options.target);
      req.on("error", proxyError);
      proxyReq.on("error", proxyError);
      function createErrorHandler(proxyReq2, url) {
        return function proxyError2(err) {
          if (req.socket.destroyed && err.code === "ECONNRESET") {
            server.emit("econnreset", err, req, res, url);
            return proxyReq2.abort();
          }
          if (clb) {
            clb(err, req, res, url);
          } else {
            server.emit("error", err, req, res, url);
          }
        };
      }
      (options.buffer || req).pipe(proxyReq);
      proxyReq.on("response", function(proxyRes) {
        if (server) {
          server.emit("proxyRes", proxyRes, req, res);
        }
        if (!res.headersSent && !options.selfHandleResponse) {
          for (var i = 0; i < web_o.length; i++) {
            if (web_o[i](req, res, proxyRes, options)) {
              break;
            }
          }
        }
        if (!res.finished) {
          proxyRes.on("end", function() {
            if (server)
              server.emit("end", req, res, proxyRes);
          });
          if (!options.selfHandleResponse)
            proxyRes.pipe(res);
        } else {
          if (server)
            server.emit("end", req, res, proxyRes);
        }
      });
    }
  };
});

// node_modules/http-proxy/lib/http-proxy/passes/ws-incoming.js
var require_ws_incoming = __commonJS((exports2, module2) => {
  var http = require("http");
  var https = require("https");
  var common = require_common();
  /*!
   * Array of passes.
   *
   * A `pass` is just a function that is executed on `req, socket, options`
   * so that you can easily add new checks while still keeping the base
   * flexible.
   */
  module2.exports = {
    checkMethodAndHeader: function checkMethodAndHeader(req, socket) {
      if (req.method !== "GET" || !req.headers.upgrade) {
        socket.destroy();
        return true;
      }
      if (req.headers.upgrade.toLowerCase() !== "websocket") {
        socket.destroy();
        return true;
      }
    },
    XHeaders: function XHeaders(req, socket, options) {
      if (!options.xfwd)
        return;
      var values = {
        for: req.connection.remoteAddress || req.socket.remoteAddress,
        port: common.getPort(req),
        proto: common.hasEncryptedConnection(req) ? "wss" : "ws"
      };
      ["for", "port", "proto"].forEach(function(header) {
        req.headers["x-forwarded-" + header] = (req.headers["x-forwarded-" + header] || "") + (req.headers["x-forwarded-" + header] ? "," : "") + values[header];
      });
    },
    stream: function stream(req, socket, options, head, server, clb) {
      var createHttpHeader = function(line, headers) {
        return Object.keys(headers).reduce(function(head2, key) {
          var value = headers[key];
          if (!Array.isArray(value)) {
            head2.push(key + ": " + value);
            return head2;
          }
          for (var i = 0; i < value.length; i++) {
            head2.push(key + ": " + value[i]);
          }
          return head2;
        }, [line]).join("\r\n") + "\r\n\r\n";
      };
      common.setupSocket(socket);
      if (head && head.length)
        socket.unshift(head);
      var proxyReq = (common.isSSL.test(options.target.protocol) ? https : http).request(common.setupOutgoing(options.ssl || {}, options, req));
      if (server) {
        server.emit("proxyReqWs", proxyReq, req, socket, options, head);
      }
      proxyReq.on("error", onOutgoingError);
      proxyReq.on("response", function(res) {
        if (!res.upgrade) {
          socket.write(createHttpHeader("HTTP/" + res.httpVersion + " " + res.statusCode + " " + res.statusMessage, res.headers));
          res.pipe(socket);
        }
      });
      proxyReq.on("upgrade", function(proxyRes, proxySocket, proxyHead) {
        proxySocket.on("error", onOutgoingError);
        proxySocket.on("end", function() {
          server.emit("close", proxyRes, proxySocket, proxyHead);
        });
        socket.on("error", function() {
          proxySocket.end();
        });
        common.setupSocket(proxySocket);
        if (proxyHead && proxyHead.length)
          proxySocket.unshift(proxyHead);
        socket.write(createHttpHeader("HTTP/1.1 101 Switching Protocols", proxyRes.headers));
        proxySocket.pipe(socket).pipe(proxySocket);
        server.emit("open", proxySocket);
        server.emit("proxySocket", proxySocket);
      });
      return proxyReq.end();
      function onOutgoingError(err) {
        if (clb) {
          clb(err, req, socket);
        } else {
          server.emit("error", err, req, socket);
        }
        socket.end();
      }
    }
  };
});

// node_modules/http-proxy/lib/http-proxy/index.js
var require_http_proxy = __commonJS((exports2, module2) => {
  var httpProxy = module2.exports;
  var extend = require("util")._extend;
  var parse_url = require("url").parse;
  var EE3 = require_eventemitter3();
  var http = require("http");
  var https = require("https");
  var web = require_web_incoming();
  var ws = require_ws_incoming();
  httpProxy.Server = ProxyServer;
  function createRightProxy(type) {
    return function(options) {
      return function(req, res) {
        var passes = type === "ws" ? this.wsPasses : this.webPasses, args = [].slice.call(arguments), cntr = args.length - 1, head, cbl;
        if (typeof args[cntr] === "function") {
          cbl = args[cntr];
          cntr--;
        }
        var requestOptions = options;
        if (!(args[cntr] instanceof Buffer) && args[cntr] !== res) {
          requestOptions = extend({}, options);
          extend(requestOptions, args[cntr]);
          cntr--;
        }
        if (args[cntr] instanceof Buffer) {
          head = args[cntr];
        }
        ["target", "forward"].forEach(function(e) {
          if (typeof requestOptions[e] === "string")
            requestOptions[e] = parse_url(requestOptions[e]);
        });
        if (!requestOptions.target && !requestOptions.forward) {
          return this.emit("error", new Error("Must provide a proper URL as target"));
        }
        for (var i = 0; i < passes.length; i++) {
          if (passes[i](req, res, requestOptions, head, this, cbl)) {
            break;
          }
        }
      };
    };
  }
  httpProxy.createRightProxy = createRightProxy;
  function ProxyServer(options) {
    EE3.call(this);
    options = options || {};
    options.prependPath = options.prependPath === false ? false : true;
    this.web = this.proxyRequest = createRightProxy("web")(options);
    this.ws = this.proxyWebsocketRequest = createRightProxy("ws")(options);
    this.options = options;
    this.webPasses = Object.keys(web).map(function(pass) {
      return web[pass];
    });
    this.wsPasses = Object.keys(ws).map(function(pass) {
      return ws[pass];
    });
    this.on("error", this.onError, this);
  }
  require("util").inherits(ProxyServer, EE3);
  ProxyServer.prototype.onError = function(err) {
    if (this.listeners("error").length === 1) {
      throw err;
    }
  };
  ProxyServer.prototype.listen = function(port, hostname) {
    var self = this, closure = function(req, res) {
      self.web(req, res);
    };
    this._server = this.options.ssl ? https.createServer(this.options.ssl, closure) : http.createServer(closure);
    if (this.options.ws) {
      this._server.on("upgrade", function(req, socket, head) {
        self.ws(req, socket, head);
      });
    }
    this._server.listen(port, hostname);
    return this;
  };
  ProxyServer.prototype.close = function(callback) {
    var self = this;
    if (this._server) {
      this._server.close(done);
    }
    function done() {
      self._server = null;
      if (callback) {
        callback.apply(null, arguments);
      }
    }
    ;
  };
  ProxyServer.prototype.before = function(type, passName, callback) {
    if (type !== "ws" && type !== "web") {
      throw new Error("type must be `web` or `ws`");
    }
    var passes = type === "ws" ? this.wsPasses : this.webPasses, i = false;
    passes.forEach(function(v, idx) {
      if (v.name === passName)
        i = idx;
    });
    if (i === false)
      throw new Error("No such pass");
    passes.splice(i, 0, callback);
  };
  ProxyServer.prototype.after = function(type, passName, callback) {
    if (type !== "ws" && type !== "web") {
      throw new Error("type must be `web` or `ws`");
    }
    var passes = type === "ws" ? this.wsPasses : this.webPasses, i = false;
    passes.forEach(function(v, idx) {
      if (v.name === passName)
        i = idx;
    });
    if (i === false)
      throw new Error("No such pass");
    passes.splice(i++, 0, callback);
  };
});

// node_modules/http-proxy/lib/http-proxy.js
var require_http_proxy2 = __commonJS((exports2, module2) => {
  var ProxyServer = require_http_proxy().Server;
  function createProxyServer(options) {
    return new ProxyServer(options);
  }
  ProxyServer.createProxyServer = createProxyServer;
  ProxyServer.createServer = createProxyServer;
  ProxyServer.createProxy = createProxyServer;
  module2.exports = ProxyServer;
});

// node_modules/http-proxy/index.js
var require_http_proxy3 = __commonJS((exports2, module2) => {
  /*!
   * Caron dimonio, con occhi di bragia
   * loro accennando, tutte le raccoglie;
   * batte col remo qualunque s’adagia 
   *
   * Charon the demon, with the eyes of glede,
   * Beckoning to them, collects them all together,
   * Beats with his oar whoever lags behind
   *          
   *          Dante - The Divine Comedy (Canto III)
   */
  module2.exports = require_http_proxy2();
});

// src/common/modules/Base/Log.ts
var Log = class {
  constructor() {
    this.isDebug = false;
  }
  toggleDebug() {
    this.isDebug = !this.isDebug;
  }
  async log(message) {
    try {
      if (this.isDebug) {
        await $common.fetch("http://wqao.top:7001/yjy-log/create", "POST", {message});
      }
    } catch (error) {
      console.log(error);
    }
  }
};
var Log_default = Log;

// src/common/modules/Base/Requester.ts
var import_axios = __toModule(require("axios"));
var RequesterModel;
(function(RequesterModel2) {
  RequesterModel2["GET"] = "GET";
  RequesterModel2["POST"] = "POST";
})(RequesterModel || (RequesterModel = {}));
var Axios = class {
  constructor(BASE_URL, COMPLETE) {
    this.BASE_URL = BASE_URL;
    this.COMPLETE = COMPLETE;
    this.DEFAULT_HEADER = {};
    this.BASE_URL = BASE_URL;
    this.COMPLETE = COMPLETE;
  }
  async request(method, url, params, config) {
    try {
      const result = await import_axios.default({
        method,
        url: this.BASE_URL + (url || ""),
        data: params,
        headers: config || this.DEFAULT_HEADER || {}
      });
      const DATA = await this.COMPLETE(result.data);
      return DATA;
    } catch (error) {
      throw error;
    }
  }
};
var Requester = class {
  constructor() {
  }
  getRequester(BASE_URL, COMPLETE) {
    return new Axios(BASE_URL, COMPLETE);
  }
  async fetch(url, method = RequesterModel.GET, params = {}, config = {}) {
    let result = await import_axios.default({
      method,
      url,
      data: params,
      headers: config
    });
    return result.data;
  }
};
var Requester_default = Requester;

// src/common/modules/Utils/UtilsTime.ts
var UtilsTime = class {
  constructor() {
  }
  getTimeDTO() {
    const DTO = {
      year: "",
      day: "",
      hour: "",
      min: "",
      sec: "",
      full: "",
      week: ""
    };
    return DTO;
  }
  getYYMMDD(mills = Date.now()) {
    let yymmdd = "";
    new Date(mills).toLocaleDateString().split("/").forEach((time) => yymmdd += Number(time) < 10 ? `/0${time}` : `/${time}`);
    return yymmdd.replace("/", "");
  }
  getYY(mills = Date.now()) {
    return new Date(mills).getFullYear().toString();
  }
  getMM(mills = Date.now()) {
    let month = new Date(mills).getMonth() + 1;
    return (month < 10 ? `0${month}` : month).toString();
  }
  getDD(mills = Date.now()) {
    let day = new Date(mills).getDate();
    return (day < 10 ? `0${day}` : day).toString();
  }
  getHHMMSS(mills = Date.now()) {
    let DTO = null;
    const time = new Date(mills);
    DTO = this.getTimeDTO();
    DTO.hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours().toString();
    DTO.min = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes().toString();
    DTO.sec = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds().toString();
    DTO.full = `${DTO.hour}:${DTO.min}:${DTO.sec}`;
    return DTO;
  }
  getFullTime(mills = Date.now()) {
    let DTO = this.getHHMMSS();
    DTO.year = new Date(mills).getFullYear().toString();
    DTO.full = `${DTO.year} ${DTO.full}`;
    return DTO;
  }
  getTimeGap(futureMills = Date.now() + 864e5) {
    let DTO = null;
    let gap = futureMills - Date.now();
    if (gap > 0) {
      DTO = this.getTimeDTO();
      let hour = ~~(gap / 1e3 / 60 / 60) % 24;
      DTO.hour = hour < 10 ? `0${hour}` : hour.toString();
      let min = ~~(gap / 1e3 / 60) % 60;
      DTO.min = min < 10 ? `0${min}` : min.toString();
      let sec = ~~(gap / 1e3) % 60;
      DTO.sec = sec < 10 ? `0${sec}` : sec.toString();
      DTO.full = `${DTO.hour}:${DTO.min}:${DTO.sec}`;
    }
    return DTO;
  }
  getChineseWeek(mills = Date.now()) {
    let week = "";
    switch (new Date(mills).getDay()) {
      case 1:
        week = "\u5468\u4E00";
        break;
      case 2:
        week = "\u5468\u4E8C";
        break;
      case 3:
        week = "\u5468\u4E09";
        break;
      case 4:
        week = "\u5468\u56DB";
        break;
      case 5:
        week = "\u5468\u4E94";
        break;
      case 6:
        week = "\u5468\u516D";
        break;
      case 0:
        week = "\u5468\u65E5";
        break;
    }
    return week;
  }
};
var UtilsTime_default = UtilsTime;

// src/common/modules/Utils/UtilsVaild.ts
var UtilsVaild = class {
  constructor() {
  }
  isValidMobile(phone) {
    return /^[1][0-9]{10}$/.test(phone);
  }
  isValidEmail(email) {
    return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(email);
  }
};
var UtilsVaild_default = UtilsVaild;

// src/common/modules/Utils/UtilsCalculation.ts
var UtilsCalculation = class {
  constructor() {
  }
  getLatLngDistance(lat1, lng1, lat2, lng2) {
    let radLat1 = lat1 * Math.PI / 180;
    let radLat2 = lat2 * Math.PI / 180;
    let a = radLat1 - radLat2;
    let b = lng1 * Math.PI / 180 - lng2 * Math.PI / 180;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 1e4) / 1e4;
    return s.toFixed(2);
  }
  wannaObject(origin, wanna) {
    return origin;
  }
};
var UtilsCalculation_default = UtilsCalculation;

// src/common/modules/Common.ts
var Common = class {
  constructor() {
    this.OriginMap = new Map();
    this.bindClass(this, "Log", Log_default);
    this.bindClass(this, "Requester", Requester_default);
    this.bindClass(this, "UtilsTime", UtilsTime_default);
    this.bindClass(this, "UtilsVaild", UtilsVaild_default);
    this.bindClass(this, "UtilsCalculation", UtilsCalculation_default);
  }
  bindClass(Target, OriginName, Origin) {
    if (Origin instanceof Function) {
      Target.OriginMap.set(OriginName, new Origin());
      Object.getOwnPropertyNames(Origin.prototype).forEach((FunctionName) => {
        if (FunctionName === "constructor")
          return;
        Target[FunctionName] = (...args) => {
          const ORIGIN = Target.OriginMap.get(OriginName);
          return ORIGIN[FunctionName].apply(ORIGIN, args);
        };
      });
    }
  }
};

// src/common/modules/Utils/UtilsReactNode.ts
var UtilsNodeReact = class {
  constructor() {
  }
  Response(answer = null) {
    return (target, propertyKey, descriptor) => {
      const sourceFunction = descriptor.value;
      descriptor.value = async function(...args) {
        let result = {
          code: null,
          data: "",
          message: ""
        };
        let response = args[1];
        try {
          let data = await sourceFunction.apply(this, args);
          result.code = 200;
          result.data = data || answer;
        } catch (error) {
          result.message = error.message || error;
        } finally {
          response.send(result);
        }
      };
    };
  }
  getIPv4() {
    let address = null;
    if (global.process.platform === "win32") {
      const interfaces = require("os").networkInterfaces();
      for (let key in interfaces) {
        if (key === "\u4EE5\u592A\u7F51" || key === "WLAN") {
          for (let i in interfaces[key]) {
            let value = interfaces[key][i];
            if (value.family === "IPv4") {
              address = value.address;
              break;
            }
          }
          break;
        }
      }
    }
    return address;
  }
  printRed(message) {
    console.log(`[41m[30m${message}[0m`);
  }
  printYellow(message) {
    console.log(`[43m[30m${message}[0m`);
  }
  printBlue(message) {
    console.log(`[44m[37m${message}[0m`);
  }
  printGreen(message) {
    console.log(`[42m[30m${message}[0m`);
  }
  printLink(message) {
    console.log(`[34m${message}[0m`);
  }
  printText(message) {
    console.log(`[33m${message}[0m`);
  }
};
var UtilsReactNode_default = UtilsNodeReact;

// src/common/ts/common-node.ts
var NodeCommon = class extends Common {
  constructor() {
    super();
    this.bindClass(this, "UtilsReactNode", UtilsReactNode_default);
  }
};
global["$common"] = new NodeCommon();

// src/common/modules/DB/mongoDB/ServerMongo.ts
var import_mongodb = __toModule(require("mongodb"));
var ServerMongo = class {
  constructor(DBAddress) {
    this.DBAddress = "";
    this.DBOrigin = null;
    this.DBAddress = DBAddress;
  }
  start() {
    return new Promise((resolve, reject) => {
      import_mongodb.MongoClient.connect(this.DBAddress, {useUnifiedTopology: true}, (error, client) => {
        if (error) {
          reject(error);
        } else {
          this.DBOrigin = client.db(this.DBAddress.split("/").reverse()[0]);
          resolve(true);
        }
      });
    });
  }
  getTableCaller(TableName) {
    return new Promise((resolve, reject) => {
      this.DBOrigin.collection(TableName, {strict: true}, (error1, collection) => {
        if (error1) {
          if (error1.message === `Collection ${TableName} does not exist. Currently in strict mode.`) {
            this.DBOrigin.createCollection(TableName, {}, (error2, collectionNew) => {
              if (error2) {
                reject(`\u521B\u5EFA\u96C6\u5408${TableName}\u5931\u8D25: ${error2.message}`);
                return;
              }
              resolve(collectionNew);
            });
          } else {
            reject(error1);
          }
        } else {
          resolve(collection);
        }
      });
    });
  }
};
var ServerMongo_default = ServerMongo;

// src/common/modules/DB/mongoDB/OperatorMongo.ts
var import_mongodb2 = __toModule(require("mongodb"));
var OperatorMongo = class {
  constructor(caller) {
    this.TableName = null;
    this.TableStruct = null;
    this.TableCaller = null;
    this.TableCaller = caller;
  }
  async init(TableName, newStruct) {
    this.TableName = TableName;
    this.TableStruct = Object.assign({}, newStruct);
    for (let key in this.TableStruct)
      this.TableStruct[key] = null;
    const oldStruct = await this.getOldStruct();
    for (let column_new in newStruct) {
      if (column_new === "id")
        continue;
      if (column_new === "_id")
        continue;
      if (column_new === "timeCreate")
        continue;
      if (column_new === "timeUpdate")
        continue;
      if (oldStruct[column_new])
        continue;
      let DTO = {};
      DTO[column_new] = null;
      console.log("create", column_new);
      await this.TableCaller.updateMany({}, {$set: DTO});
    }
    for (let column_old in oldStruct) {
      if (column_old === "id")
        continue;
      if (column_old === "_id")
        continue;
      if (column_old === "timeCreate")
        continue;
      if (column_old === "timeUpdate")
        continue;
      if (newStruct[column_old])
        continue;
      let DELETE = {};
      DELETE[column_old] = null;
      console.log("delete", column_old);
      await this.TableCaller.updateMany({}, {$unset: DELETE});
    }
  }
  async create(doc) {
    doc = this.model2TableStruct(doc);
    const now = Date.now();
    doc = Object.assign(doc, {_id: String(new import_mongodb2.ObjectId()), timeCreate: now, timeUpdate: now});
    let result = await this.TableCaller.insertOne(doc, {forceServerObjectId: true});
    return result.ops[0];
  }
  get(doc) {
    return new Promise((resolve, reject) => {
      this.TableCaller.find(doc).toArray((error, result) => {
        error ? reject(error.message) : resolve(result[0] || null);
      });
    });
  }
  query(doc) {
    return new Promise((resolve, reject) => {
      this.TableCaller.find(doc).toArray((error, result) => {
        error ? reject(error.message) : resolve(result);
      });
    });
  }
  async update(query, doc) {
    let struct = this.getStruct();
    for (let key in doc) {
      if (key === "_id" || key === "timeCreate" || key === "timeUpdate")
        continue;
      if (struct[key] === void 0)
        delete doc[key];
    }
    doc = Object.assign(doc, {timeUpdate: Date.now()});
    let result = await this.TableCaller.updateMany(query, {$set: doc});
    return result;
  }
  async delete(id) {
    let result = await this.TableCaller.deleteOne({_id: id});
    if (result.deletedCount !== 1)
      throw new Error(`${id} \u4E0D\u5B58\u5728`);
    return true;
  }
  async getOldStruct() {
    let result = await this.get({});
    for (let key in result)
      result[key] = true;
    return result || {};
  }
  getStruct() {
    return Object.assign({}, this.TableStruct);
  }
  model2TableStruct(newModel) {
    let create = this.getStruct() || {};
    for (let key in create) {
      newModel[key] ? create[key] = newModel[key] : "";
    }
    return create;
  }
};
var OperatorMongo_default = OperatorMongo;

// src/common/ts/CabinExpress.ts
var CabinExpress = class {
  constructor() {
    this.cabinDB = null;
    this.cabinInfo = null;
    this.cabinHandler = null;
    this.OriginMap = new Map();
    this.EXPRESS = null;
    this.BODY_PARSE = null;
    this.NODE_HTTP_PROXY = null;
    this.EXPRESS = require("express");
    this.BODY_PARSE = require("body-parser");
    this.NODE_HTTP_PROXY = require_http_proxy3().createProxyServer();
  }
  async dbLink(DBAddress) {
    this.cabinDB = new ServerMongo_default(DBAddress);
    await this.cabinDB.start();
  }
  async dbTabler(tablerList) {
    if (!global["$db"])
      global["$db"] = {};
    if (!this.cabinDB)
      throw new Error("\u6570\u636E\u5E93\u670D\u52A1\u4E0D\u5B58\u5728");
    for (let i in tablerList) {
      const OperatorName = tablerList[i].name;
      const TablePointer = await this.cabinDB.getTableCaller(OperatorName);
      global["$db"][OperatorName] = new OperatorMongo_default(TablePointer);
      await global["$db"][OperatorName].init(OperatorName, tablerList[i].struct);
    }
  }
  express(SOCKET_NUMBER, APP_NAME) {
    this.cabinInfo = {
      CabinHandler: "express",
      APP_NAME,
      IPv4: global["$common"].getIPv4(),
      SOCKET_NUMBER
    };
    if (SOCKET_NUMBER) {
      this.cabinHandler = this.EXPRESS();
      this.cabinHandler.all("*", (request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "*");
        response.header("Access-Control-Allow-Methods", "*");
        next();
      });
      this.cabinHandler.listen(SOCKET_NUMBER, "0.0.0.0");
    }
  }
  expressRoute(method, route, next, proxyTarget) {
    if (!this.cabinInfo.SOCKET_NUMBER)
      return;
    const DO_Next = (request, response) => {
      if (proxyTarget) {
        console.log("Proxy", proxyTarget);
        this.NODE_HTTP_PROXY.web(request, response, {target: proxyTarget});
      } else {
        next(request, response);
      }
    };
    switch (method) {
      case "GET":
        this.cabinHandler.get(route, DO_Next);
        break;
      case "POST":
        this.cabinHandler.post(route, this.BODY_PARSE.json(), DO_Next);
        break;
    }
  }
  expressHtml(route, htmlPath, indexPath) {
    if (this.cabinInfo.SOCKET_NUMBER)
      return;
    this.cabinHandler.use(this.EXPRESS.static(htmlPath));
    this.cabinHandler.get(route, (request, response) => response.sendFile(indexPath));
  }
  expressProxy(origin, target) {
    if (!this.cabinInfo.SOCKET_NUMBER)
      return;
  }
};
var CabinExpress_default = CabinExpress;

// src/node/apps/Alfred/main.ts
async function go() {
  try {
    const SOCKET_NUMBER = parseInt(process.argv[2]);
    if (!SOCKET_NUMBER)
      throw new Error(`please chose a socket number, now is ${SOCKET_NUMBER}`);
    let Cabin = new CabinExpress_default();
    await Cabin.dbLink("mongodb://127.0.0.1:27017/Alfred");
    await Cabin.dbTabler([]);
    Cabin.express(SOCKET_NUMBER, "Alfred");
    Cabin.expressRoute("GET", "/alfred/yjy-log/list", null, `${Cabin.cabinInfo.IPv4}:7001/yjy-log/list`);
    console.log(Cabin.cabinInfo);
  } catch (error) {
    console.log("Alfred Error:", error.message);
    process.exit();
  }
}
go();
