var nt=Object.create,N=Object.defineProperty,st=Object.getPrototypeOf,it=Object.prototype.hasOwnProperty,ot=Object.getOwnPropertyNames,at=Object.getOwnPropertyDescriptor;var oe=t=>N(t,"__esModule",{value:!0});var g=(t,e)=>()=>(e||(e={exports:{}},t(e.exports,e)),e.exports),ut=(t,e)=>{for(var r in e)N(t,r,{get:e[r],enumerable:!0})},ct=(t,e,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of ot(e))!it.call(t,n)&&n!=="default"&&N(t,n,{get:()=>e[n],enumerable:!(r=at(e,n))||r.enumerable});return t},ae=t=>t&&t.__esModule?t:ct(oe(N(t!=null?nt(st(t)):{},"default",{value:t,enumerable:!0})),t);var de=g((ar,W)=>{"use strict";var ft=Object.prototype.hasOwnProperty,w="~";function S(){}Object.create&&(S.prototype=Object.create(null),new S().__proto__||(w=!1));function lt(t,e,r){this.fn=t,this.context=e,this.once=r||!1}function he(t,e,r,n,s){if(typeof r!="function")throw new TypeError("The listener must be a function");var i=new lt(r,n||t,s),o=w?w+e:e;return t._events[o]?t._events[o].fn?t._events[o]=[t._events[o],i]:t._events[o].push(i):(t._events[o]=i,t._eventsCount++),t}function k(t,e){--t._eventsCount==0?t._events=new S:delete t._events[e]}function v(){this._events=new S,this._eventsCount=0}v.prototype.eventNames=function(){var e=[],r,n;if(this._eventsCount===0)return e;for(n in r=this._events)ft.call(r,n)&&e.push(w?n.slice(1):n);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(r)):e};v.prototype.listeners=function(e){var r=w?w+e:e,n=this._events[r];if(!n)return[];if(n.fn)return[n.fn];for(var s=0,i=n.length,o=new Array(i);s<i;s++)o[s]=n[s].fn;return o};v.prototype.listenerCount=function(e){var r=w?w+e:e,n=this._events[r];return n?n.fn?1:n.length:0};v.prototype.emit=function(e,r,n,s,i,o){var f=w?w+e:e;if(!this._events[f])return!1;var a=this._events[f],l=arguments.length,u,c;if(a.fn){switch(a.once&&this.removeListener(e,a.fn,void 0,!0),l){case 1:return a.fn.call(a.context),!0;case 2:return a.fn.call(a.context,r),!0;case 3:return a.fn.call(a.context,r,n),!0;case 4:return a.fn.call(a.context,r,n,s),!0;case 5:return a.fn.call(a.context,r,n,s,i),!0;case 6:return a.fn.call(a.context,r,n,s,i,o),!0}for(c=1,u=new Array(l-1);c<l;c++)u[c-1]=arguments[c];a.fn.apply(a.context,u)}else{var h=a.length,p;for(c=0;c<h;c++)switch(a[c].once&&this.removeListener(e,a[c].fn,void 0,!0),l){case 1:a[c].fn.call(a[c].context);break;case 2:a[c].fn.call(a[c].context,r);break;case 3:a[c].fn.call(a[c].context,r,n);break;case 4:a[c].fn.call(a[c].context,r,n,s);break;default:if(!u)for(p=1,u=new Array(l-1);p<l;p++)u[p-1]=arguments[p];a[c].fn.apply(a[c].context,u)}}return!0};v.prototype.on=function(e,r,n){return he(this,e,r,n,!1)};v.prototype.once=function(e,r,n){return he(this,e,r,n,!0)};v.prototype.removeListener=function(e,r,n,s){var i=w?w+e:e;if(!this._events[i])return this;if(!r)return k(this,i),this;var o=this._events[i];if(o.fn)o.fn===r&&(!s||o.once)&&(!n||o.context===n)&&k(this,i);else{for(var f=0,a=[],l=o.length;f<l;f++)(o[f].fn!==r||s&&!o[f].once||n&&o[f].context!==n)&&a.push(o[f]);a.length?this._events[i]=a.length===1?a[0]:a:k(this,i)}return this};v.prototype.removeAllListeners=function(e){var r;return e?(r=w?w+e:e,this._events[r]&&k(this,r)):(this._events=new S,this._eventsCount=0),this};v.prototype.off=v.prototype.removeListener;v.prototype.addListener=v.prototype.on;v.prefixed=w;v.EventEmitter=v;typeof W!="undefined"&&(W.exports=v)});var me=g((ur,pe)=>{"use strict";pe.exports=function(e,r){if(r=r.split(":")[0],e=+e,!e)return!1;switch(r){case"http":case"ws":return e!==80;case"https":case"wss":return e!==443;case"ftp":return e!==21;case"gopher":return e!==70;case"file":return!1}return e!==0}});var U=g(ge=>{var E=ge,ht=require("url"),ve=require("util")._extend,dt=me(),pt=/(^|,)\s*upgrade\s*($|,)/i,Y=/^https|wss/;E.isSSL=Y;E.setupOutgoing=function(t,e,r,n){t.port=e[n||"target"].port||(Y.test(e[n||"target"].protocol)?443:80),["host","hostname","socketPath","pfx","key","passphrase","cert","ca","ciphers","secureProtocol"].forEach(function(f){t[f]=e[n||"target"][f]}),t.method=e.method||r.method,t.headers=ve({},r.headers),e.headers&&ve(t.headers,e.headers),e.auth&&(t.auth=e.auth),e.ca&&(t.ca=e.ca),Y.test(e[n||"target"].protocol)&&(t.rejectUnauthorized=typeof e.secure=="undefined"?!0:e.secure),t.agent=e.agent||!1,t.localAddress=e.localAddress,t.agent||(t.headers=t.headers||{},(typeof t.headers.connection!="string"||!pt.test(t.headers.connection))&&(t.headers.connection="close"));var s=e[n||"target"],i=s&&e.prependPath!==!1&&s.path||"",o=e.toProxy?r.url:ht.parse(r.url).path||"";return o=e.ignorePath?"":o,t.path=E.urlJoin(i,o),e.changeOrigin&&(t.headers.host=dt(t.port,e[n||"target"].protocol)&&!mt(t.host)?t.host+":"+t.port:t.host),t};E.setupSocket=function(t){return t.setTimeout(0),t.setNoDelay(!0),t.setKeepAlive(!0,0),t};E.getPort=function(t){var e=t.headers.host?t.headers.host.match(/:(\d+)/):"";return e?e[1]:E.hasEncryptedConnection(t)?"443":"80"};E.hasEncryptedConnection=function(t){return Boolean(t.connection.encrypted||t.connection.pair)};E.urlJoin=function(){var t=Array.prototype.slice.call(arguments),e=t.length-1,r=t[e],n=r.split("?"),s;return t[e]=n.shift(),s=[t.filter(Boolean).join("/").replace(/\/+/g,"/").replace("http:/","http://").replace("https:/","https://")],s.push.apply(s,n),s.join("?")};E.rewriteCookieProperty=function t(e,r,n){return Array.isArray(e)?e.map(function(s){return t(s,r,n)}):e.replace(new RegExp("(;\\s*"+n+"=)([^;]+)","i"),function(s,i,o){var f;if(o in r)f=r[o];else if("*"in r)f=r["*"];else return s;return f?i+f:""})};function mt(t){return!!~t.indexOf(":")}});var _e=g((fr,we)=>{var be=require("url"),ye=U(),gt=/^201|30(1|2|7|8)$/;we.exports={removeChunked:function(e,r,n){e.httpVersion==="1.0"&&delete n.headers["transfer-encoding"]},setConnection:function(e,r,n){e.httpVersion==="1.0"?n.headers.connection=e.headers.connection||"close":e.httpVersion!=="2.0"&&!n.headers.connection&&(n.headers.connection=e.headers.connection||"keep-alive")},setRedirectHostRewrite:function(e,r,n,s){if((s.hostRewrite||s.autoRewrite||s.protocolRewrite)&&n.headers.location&&gt.test(n.statusCode)){var i=be.parse(s.target),o=be.parse(n.headers.location);if(i.host!=o.host)return;s.hostRewrite?o.host=s.hostRewrite:s.autoRewrite&&(o.host=e.headers.host),s.protocolRewrite&&(o.protocol=s.protocolRewrite),n.headers.location=o.format()}},writeHeaders:function(e,r,n,s){var i=s.cookieDomainRewrite,o=s.cookiePathRewrite,f=s.preserveHeaderKeyCase,a,l=function(h,p){p!=null&&(i&&h.toLowerCase()==="set-cookie"&&(p=ye.rewriteCookieProperty(p,i,"domain")),o&&h.toLowerCase()==="set-cookie"&&(p=ye.rewriteCookieProperty(p,o,"path")),r.setHeader(String(h).trim(),p))};if(typeof i=="string"&&(i={"*":i}),typeof o=="string"&&(o={"*":o}),f&&n.rawHeaders!=null){a={};for(var u=0;u<n.rawHeaders.length;u+=2){var c=n.rawHeaders[u];a[c.toLowerCase()]=c}}Object.keys(n.headers).forEach(function(h){var p=n.headers[h];f&&a&&(h=a[h]||h),l(h,p)})},writeStatusCode:function(e,r,n){n.statusMessage?(r.statusCode=n.statusCode,r.statusMessage=n.statusMessage):r.statusCode=n.statusCode}}});var Ce=g((lr,Ee)=>{var B=1e3,A=B*60,D=A*60,H=D*24,vt=H*365.25;Ee.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return wt(t);if(r==="number"&&isNaN(t)===!1)return e.long?yt(t):bt(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function wt(t){if(t=String(t),!(t.length>100)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(!!e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*vt;case"days":case"day":case"d":return r*H;case"hours":case"hour":case"hrs":case"hr":case"h":return r*D;case"minutes":case"minute":case"mins":case"min":case"m":return r*A;case"seconds":case"second":case"secs":case"sec":case"s":return r*B;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function bt(t){return t>=H?Math.round(t/H)+"d":t>=D?Math.round(t/D)+"h":t>=A?Math.round(t/A)+"m":t>=B?Math.round(t/B)+"s":t+"ms"}function yt(t){return $(t,H,"day")||$(t,D,"hour")||$(t,A,"minute")||$(t,B,"second")||t+" ms"}function $(t,e,r){if(!(t<e))return t<e*1.5?Math.floor(t/e)+" "+r:Math.ceil(t/e)+" "+r+"s"}});var V=g((d,Pe)=>{d=Pe.exports=K.debug=K.default=K;d.coerce=_t;d.disable=Et;d.enable=Ct;d.enabled=Pt;d.humanize=Ce();d.names=[];d.skips=[];d.formatters={};var J;function Rt(t){var e=0,r;for(r in t)e=(e<<5)-e+t.charCodeAt(r),e|=0;return d.colors[Math.abs(e)%d.colors.length]}function K(t){function e(){if(!!e.enabled){var r=e,n=+new Date,s=n-(J||n);r.diff=s,r.prev=J,r.curr=n,J=n;for(var i=new Array(arguments.length),o=0;o<i.length;o++)i[o]=arguments[o];i[0]=d.coerce(i[0]),typeof i[0]!="string"&&i.unshift("%O");var f=0;i[0]=i[0].replace(/%([a-zA-Z%])/g,function(l,u){if(l==="%%")return l;f++;var c=d.formatters[u];if(typeof c=="function"){var h=i[f];l=c.call(r,h),i.splice(f,1),f--}return l}),d.formatArgs.call(r,i);var a=e.log||d.log||console.log.bind(console);a.apply(r,i)}}return e.namespace=t,e.enabled=d.enabled(t),e.useColors=d.useColors(),e.color=Rt(t),typeof d.init=="function"&&d.init(e),e}function Ct(t){d.save(t),d.names=[],d.skips=[];for(var e=(typeof t=="string"?t:"").split(/[\s,]+/),r=e.length,n=0;n<r;n++)!e[n]||(t=e[n].replace(/\*/g,".*?"),t[0]==="-"?d.skips.push(new RegExp("^"+t.substr(1)+"$")):d.names.push(new RegExp("^"+t+"$")))}function Et(){d.enable("")}function Pt(t){var e,r;for(e=0,r=d.skips.length;e<r;e++)if(d.skips[e].test(t))return!1;for(e=0,r=d.names.length;e<r;e++)if(d.names[e].test(t))return!0;return!1}function _t(t){return t instanceof Error?t.stack||t.message:t}});var xe=g((b,Re)=>{b=Re.exports=V();b.log=Ot;b.formatArgs=xt;b.save=Tt;b.load=Oe;b.useColors=St;b.storage=typeof chrome!="undefined"&&typeof chrome.storage!="undefined"?chrome.storage.local:Bt();b.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"];function St(){return typeof window!="undefined"&&window.process&&window.process.type==="renderer"?!0:typeof document!="undefined"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window!="undefined"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}b.formatters.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}};function xt(t){var e=this.useColors;if(t[0]=(e?"%c":"")+this.namespace+(e?" %c":" ")+t[0]+(e?"%c ":" ")+"+"+b.humanize(this.diff),!!e){var r="color: "+this.color;t.splice(1,0,r,"color: inherit");var n=0,s=0;t[0].replace(/%[a-zA-Z%]/g,function(i){i!=="%%"&&(n++,i==="%c"&&(s=n))}),t.splice(s,0,r)}}function Ot(){return typeof console=="object"&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function Tt(t){try{t==null?b.storage.removeItem("debug"):b.storage.debug=t}catch(e){}}function Oe(){var t;try{t=b.storage.debug}catch(e){}return!t&&typeof process!="undefined"&&"env"in process&&(t=process.env.DEBUG),t}b.enable(Oe());function Bt(){try{return window.localStorage}catch(t){}}});var Ae=g((m,Te)=>{var Se=require("tty"),q=require("util");m=Te.exports=V();m.init=At;m.log=Dt;m.formatArgs=Ht;m.save=qt;m.load=Be;m.useColors=Lt;m.colors=[6,2,3,4,5,1];m.inspectOpts=Object.keys(process.env).filter(function(t){return/^debug_/i.test(t)}).reduce(function(t,e){var r=e.substring(6).toLowerCase().replace(/_([a-z])/g,function(s,i){return i.toUpperCase()}),n=process.env[e];return/^(yes|on|true|enabled)$/i.test(n)?n=!0:/^(no|off|false|disabled)$/i.test(n)?n=!1:n==="null"?n=null:n=Number(n),t[r]=n,t},{});var O=parseInt(process.env.DEBUG_FD,10)||2;O!==1&&O!==2&&q.deprecate(function(){},"except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();var Mt=O===1?process.stdout:O===2?process.stderr:jt(O);function Lt(){return"colors"in m.inspectOpts?Boolean(m.inspectOpts.colors):Se.isatty(O)}m.formatters.o=function(t){return this.inspectOpts.colors=this.useColors,q.inspect(t,this.inspectOpts).split(`
`).map(function(e){return e.trim()}).join(" ")};m.formatters.O=function(t){return this.inspectOpts.colors=this.useColors,q.inspect(t,this.inspectOpts)};function Ht(t){var e=this.namespace,r=this.useColors;if(r){var n=this.color,s="  [3"+n+";1m"+e+" [0m";t[0]=s+t[0].split(`
`).join(`
`+s),t.push("[3"+n+"m+"+m.humanize(this.diff)+"[0m")}else t[0]=new Date().toUTCString()+" "+e+" "+t[0]}function Dt(){return Mt.write(q.format.apply(q,arguments)+`
`)}function qt(t){t==null?delete process.env.DEBUG:process.env.DEBUG=t}function Be(){return process.env.DEBUG}function jt(t){var e,r=process.binding("tty_wrap");switch(r.guessHandleType(t)){case"TTY":e=new Se.WriteStream(t),e._type="tty",e._handle&&e._handle.unref&&e._handle.unref();break;case"FILE":var n=require("fs");e=new n.SyncWriteStream(t,{autoClose:!1}),e._type="fs";break;case"PIPE":case"TCP":var s=require("net");e=new s.Socket({fd:t,readable:!1,writable:!0}),e.readable=!1,e.read=null,e._type="pipe",e._handle&&e._handle.unref&&e._handle.unref();break;default:throw new Error("Implement me. Unknown stream file type!")}return e.fd=t,e._isStdio=!0,e}function At(t){t.inspectOpts={};for(var e=Object.keys(m.inspectOpts),r=0;r<e.length;r++)t.inspectOpts[e[r]]=m.inspectOpts[e[r]]}m.enable(Be())});var De=g((hr,Z)=>{typeof process!="undefined"&&process.type==="renderer"?Z.exports=xe():Z.exports=Ae()});var qe=g((dr,He)=>{var I;He.exports=function(){if(!I)try{I=De()("follow-redirects")}catch(t){I=function(){}}I.apply(null,arguments)}});var $e=g((pr,Q)=>{var x=require("url"),ee=x.URL,Nt=require("http"),kt=require("https"),Le=require("stream").Writable,Ut=require("assert"),je=qe(),te=Object.create(null);["abort","aborted","connect","error","socket","timeout"].forEach(function(t){te[t]=function(e,r,n){this._redirectable.emit(t,e,r,n)}});var $t=X("ERR_FR_REDIRECTION_FAILURE",""),It=X("ERR_FR_TOO_MANY_REDIRECTS","Maximum number of redirects exceeded"),Xt=X("ERR_FR_MAX_BODY_LENGTH_EXCEEDED","Request body larger than maxBodyLength limit"),Ft=X("ERR_STREAM_WRITE_AFTER_END","write after end");function _(t,e){Le.call(this),this._sanitizeOptions(t),this._options=t,this._ended=!1,this._ending=!1,this._redirectCount=0,this._redirects=[],this._requestBodyLength=0,this._requestBodyBuffers=[],e&&this.on("response",e);var r=this;this._onNativeResponse=function(n){r._processResponse(n)},this._performRequest()}_.prototype=Object.create(Le.prototype);_.prototype.write=function(t,e,r){if(this._ending)throw new Ft;if(!(typeof t=="string"||typeof t=="object"&&"length"in t))throw new TypeError("data should be a string, Buffer or Uint8Array");if(typeof e=="function"&&(r=e,e=null),t.length===0){r&&r();return}this._requestBodyLength+t.length<=this._options.maxBodyLength?(this._requestBodyLength+=t.length,this._requestBodyBuffers.push({data:t,encoding:e}),this._currentRequest.write(t,e,r)):(this.emit("error",new Xt),this.abort())};_.prototype.end=function(t,e,r){if(typeof t=="function"?(r=t,t=e=null):typeof e=="function"&&(r=e,e=null),!t)this._ended=this._ending=!0,this._currentRequest.end(null,null,r);else{var n=this,s=this._currentRequest;this.write(t,e,function(){n._ended=!0,s.end(null,null,r)}),this._ending=!0}};_.prototype.setHeader=function(t,e){this._options.headers[t]=e,this._currentRequest.setHeader(t,e)};_.prototype.removeHeader=function(t){delete this._options.headers[t],this._currentRequest.removeHeader(t)};_.prototype.setTimeout=function(t,e){if(e&&this.once("timeout",e),this.socket)Me(this,t);else{var r=this;this._currentRequest.once("socket",function(){Me(r,t)})}return this.once("response",Ne),this.once("error",Ne),this};function Me(t,e){clearTimeout(t._timeout),t._timeout=setTimeout(function(){t.emit("timeout")},e)}function Ne(){clearTimeout(this._timeout)}["abort","flushHeaders","getHeader","setNoDelay","setSocketKeepAlive"].forEach(function(t){_.prototype[t]=function(e,r){return this._currentRequest[t](e,r)}});["aborted","connection","socket"].forEach(function(t){Object.defineProperty(_.prototype,t,{get:function(){return this._currentRequest[t]}})});_.prototype._sanitizeOptions=function(t){if(t.headers||(t.headers={}),t.host&&(t.hostname||(t.hostname=t.host),delete t.host),!t.pathname&&t.path){var e=t.path.indexOf("?");e<0?t.pathname=t.path:(t.pathname=t.path.substring(0,e),t.search=t.path.substring(e))}};_.prototype._performRequest=function(){var t=this._options.protocol,e=this._options.nativeProtocols[t];if(!e){this.emit("error",new TypeError("Unsupported protocol "+t));return}if(this._options.agents){var r=t.substr(0,t.length-1);this._options.agent=this._options.agents[r]}var n=this._currentRequest=e.request(this._options,this._onNativeResponse);this._currentUrl=x.format(this._options),n._redirectable=this;for(var s in te)s&&n.on(s,te[s]);if(this._isRedirect){var i=0,o=this,f=this._requestBodyBuffers;(function a(l){if(n===o._currentRequest)if(l)o.emit("error",l);else if(i<f.length){var u=f[i++];n.finished||n.write(u.data,u.encoding,a)}else o._ended&&n.end()})()}};_.prototype._processResponse=function(t){var e=t.statusCode;this._options.trackRedirects&&this._redirects.push({url:this._currentUrl,headers:t.headers,statusCode:e});var r=t.headers.location;if(r&&this._options.followRedirects!==!1&&e>=300&&e<400){if(this._currentRequest.removeAllListeners(),this._currentRequest.on("error",zt),this._currentRequest.abort(),t.destroy(),++this._redirectCount>this._options.maxRedirects){this.emit("error",new It);return}((e===301||e===302)&&this._options.method==="POST"||e===303&&!/^(?:GET|HEAD)$/.test(this._options.method))&&(this._options.method="GET",this._requestBodyBuffers=[],re(/^content-/i,this._options.headers));var n=re(/^host$/i,this._options.headers)||x.parse(this._currentUrl).hostname,s=x.resolve(this._currentUrl,r);je("redirecting to",s),this._isRedirect=!0;var i=x.parse(s);if(Object.assign(this._options,i),i.hostname!==n&&re(/^authorization$/i,this._options.headers),typeof this._options.beforeRedirect=="function"){var o={headers:t.headers};try{this._options.beforeRedirect.call(null,this._options,o)}catch(a){this.emit("error",a);return}this._sanitizeOptions(this._options)}try{this._performRequest()}catch(a){var f=new $t("Redirected request failed: "+a.message);f.cause=a,this.emit("error",f)}}else t.responseUrl=this._currentUrl,t.redirects=this._redirects,this.emit("response",t),this._requestBodyBuffers=[]};function Ue(t){var e={maxRedirects:21,maxBodyLength:10*1024*1024},r={};return Object.keys(t).forEach(function(n){var s=n+":",i=r[s]=t[n],o=e[n]=Object.create(i);function f(l,u,c){if(typeof l=="string"){var h=l;try{l=ke(new ee(h))}catch(p){l=x.parse(h)}}else ee&&l instanceof ee?l=ke(l):(c=u,u=l,l={protocol:s});return typeof u=="function"&&(c=u,u=null),u=Object.assign({maxRedirects:e.maxRedirects,maxBodyLength:e.maxBodyLength},l,u),u.nativeProtocols=r,Ut.equal(u.protocol,s,"protocol mismatch"),je("options",u),new _(u,c)}function a(l,u,c){var h=o.request(l,u,c);return h.end(),h}Object.defineProperties(o,{request:{value:f,configurable:!0,enumerable:!0,writable:!0},get:{value:a,configurable:!0,enumerable:!0,writable:!0}})}),e}function zt(){}function ke(t){var e={protocol:t.protocol,hostname:t.hostname.startsWith("[")?t.hostname.slice(1,-1):t.hostname,hash:t.hash,search:t.search,pathname:t.pathname,path:t.pathname+t.search,href:t.href};return t.port!==""&&(e.port=Number(t.port)),e}function re(t,e){var r;for(var n in e)t.test(n)&&(r=e[n],delete e[n]);return r}function X(t,e){function r(n){Error.captureStackTrace(this,this.constructor),this.message=n||e}return r.prototype=new Error,r.prototype.constructor=r,r.prototype.name="Error ["+t+"]",r.prototype.code=t,r}Q.exports=Ue({http:Nt,https:kt});Q.exports.wrap=Ue});var Xe=g((mr,Ie)=>{var Gt=require("http"),Wt=require("https"),L=_e(),F=U(),Yt=$e();L=Object.keys(L).map(function(t){return L[t]});var Kt={http:Gt,https:Wt};Ie.exports={deleteLength:function(e,r,n){(e.method==="DELETE"||e.method==="OPTIONS")&&!e.headers["content-length"]&&(e.headers["content-length"]="0",delete e.headers["transfer-encoding"])},timeout:function(e,r,n){n.timeout&&e.socket.setTimeout(n.timeout)},XHeaders:function(e,r,n){if(!!n.xfwd){var s=e.isSpdy||F.hasEncryptedConnection(e),i={for:e.connection.remoteAddress||e.socket.remoteAddress,port:F.getPort(e),proto:s?"https":"http"};["for","port","proto"].forEach(function(o){e.headers["x-forwarded-"+o]=(e.headers["x-forwarded-"+o]||"")+(e.headers["x-forwarded-"+o]?",":"")+i[o]}),e.headers["x-forwarded-host"]=e.headers["x-forwarded-host"]||e.headers.host||""}},stream:function(e,r,n,s,i,o){i.emit("start",e,r,n.target||n.forward);var f=n.followRedirects?Yt:Kt,a=f.http,l=f.https;if(n.forward){var u=(n.forward.protocol==="https:"?l:a).request(F.setupOutgoing(n.ssl||{},n,e,"forward")),c=C(u,n.forward);if(e.on("error",c),u.on("error",c),(n.buffer||e).pipe(u),!n.target)return r.end()}var h=(n.target.protocol==="https:"?l:a).request(F.setupOutgoing(n.ssl||{},n,e));h.on("socket",function(y){i&&!h.getHeader("expect")&&i.emit("proxyReq",h,e,r,n)}),n.proxyTimeout&&h.setTimeout(n.proxyTimeout,function(){h.abort()}),e.on("aborted",function(){h.abort()});var p=C(h,n.target);e.on("error",p),h.on("error",p);function C(y,P){return function(M){if(e.socket.destroyed&&M.code==="ECONNRESET")return i.emit("econnreset",M,e,r,P),y.abort();o?o(M,e,r,P):i.emit("error",M,e,r,P)}}(n.buffer||e).pipe(h),h.on("response",function(y){if(i&&i.emit("proxyRes",y,e,r),!r.headersSent&&!n.selfHandleResponse)for(var P=0;P<L.length&&!L[P](e,r,y,n);P++);r.finished?i&&i.emit("end",e,r,y):(y.on("end",function(){i&&i.emit("end",e,r,y)}),n.selfHandleResponse||y.pipe(r))})}}});var ze=g((gr,Fe)=>{var Jt=require("http"),Vt=require("https"),T=U();Fe.exports={checkMethodAndHeader:function(e,r){if(e.method!=="GET"||!e.headers.upgrade||e.headers.upgrade.toLowerCase()!=="websocket")return r.destroy(),!0},XHeaders:function(e,r,n){if(!!n.xfwd){var s={for:e.connection.remoteAddress||e.socket.remoteAddress,port:T.getPort(e),proto:T.hasEncryptedConnection(e)?"wss":"ws"};["for","port","proto"].forEach(function(i){e.headers["x-forwarded-"+i]=(e.headers["x-forwarded-"+i]||"")+(e.headers["x-forwarded-"+i]?",":"")+s[i]})}},stream:function(e,r,n,s,i,o){var f=function(u,c){return Object.keys(c).reduce(function(h,p){var C=c[p];if(!Array.isArray(C))return h.push(p+": "+C),h;for(var y=0;y<C.length;y++)h.push(p+": "+C[y]);return h},[u]).join(`\r
`)+`\r
\r
`};T.setupSocket(r),s&&s.length&&r.unshift(s);var a=(T.isSSL.test(n.target.protocol)?Vt:Jt).request(T.setupOutgoing(n.ssl||{},n,e));return i&&i.emit("proxyReqWs",a,e,r,n,s),a.on("error",l),a.on("response",function(u){u.upgrade||(r.write(f("HTTP/"+u.httpVersion+" "+u.statusCode+" "+u.statusMessage,u.headers)),u.pipe(r))}),a.on("upgrade",function(u,c,h){c.on("error",l),c.on("end",function(){i.emit("close",u,c,h)}),r.on("error",function(){c.end()}),T.setupSocket(c),h&&h.length&&c.unshift(h),r.write(f("HTTP/1.1 101 Switching Protocols",u.headers)),c.pipe(r).pipe(c),i.emit("open",c),i.emit("proxySocket",c)}),a.end();function l(u){o?o(u,e,r):i.emit("error",u,e,r),r.end()}}}});var Ze=g((vr,Ge)=>{var We=Ge.exports,Ye=require("util")._extend,Zt=require("url").parse,Ke=de(),Qt=require("http"),er=require("https"),Je=Xe(),Ve=ze();We.Server=R;function ne(t){return function(e){return function(r,n){var s=t==="ws"?this.wsPasses:this.webPasses,i=[].slice.call(arguments),o=i.length-1,f,a;typeof i[o]=="function"&&(a=i[o],o--);var l=e;if(!(i[o]instanceof Buffer)&&i[o]!==n&&(l=Ye({},e),Ye(l,i[o]),o--),i[o]instanceof Buffer&&(f=i[o]),["target","forward"].forEach(function(c){typeof l[c]=="string"&&(l[c]=Zt(l[c]))}),!l.target&&!l.forward)return this.emit("error",new Error("Must provide a proper URL as target"));for(var u=0;u<s.length&&!s[u](r,n,l,f,this,a);u++);}}}We.createRightProxy=ne;function R(t){Ke.call(this),t=t||{},t.prependPath=t.prependPath!==!1,this.web=this.proxyRequest=ne("web")(t),this.ws=this.proxyWebsocketRequest=ne("ws")(t),this.options=t,this.webPasses=Object.keys(Je).map(function(e){return Je[e]}),this.wsPasses=Object.keys(Ve).map(function(e){return Ve[e]}),this.on("error",this.onError,this)}require("util").inherits(R,Ke);R.prototype.onError=function(t){if(this.listeners("error").length===1)throw t};R.prototype.listen=function(t,e){var r=this,n=function(s,i){r.web(s,i)};return this._server=this.options.ssl?er.createServer(this.options.ssl,n):Qt.createServer(n),this.options.ws&&this._server.on("upgrade",function(s,i,o){r.ws(s,i,o)}),this._server.listen(t,e),this};R.prototype.close=function(t){var e=this;this._server&&this._server.close(r);function r(){e._server=null,t&&t.apply(null,arguments)}};R.prototype.before=function(t,e,r){if(t!=="ws"&&t!=="web")throw new Error("type must be `web` or `ws`");var n=t==="ws"?this.wsPasses:this.webPasses,s=!1;if(n.forEach(function(i,o){i.name===e&&(s=o)}),s===!1)throw new Error("No such pass");n.splice(s,0,r)};R.prototype.after=function(t,e,r){if(t!=="ws"&&t!=="web")throw new Error("type must be `web` or `ws`");var n=t==="ws"?this.wsPasses:this.webPasses,s=!1;if(n.forEach(function(i,o){i.name===e&&(s=o)}),s===!1)throw new Error("No such pass");n.splice(s++,0,r)}});var et=g((wr,Qe)=>{var j=Ze().Server;function se(t){return new j(t)}j.createProxyServer=se;j.createServer=se;j.createProxy=se;Qe.exports=j});var rt=g((br,tt)=>{tt.exports=et()});oe(exports);ut(exports,{default:()=>tr});var ue=ae(require("mongodb")),z=class{constructor(e){this.DBAddress="";this.DBOrigin=null;this.DBAddress=e}start(){return new Promise((e,r)=>{ue.MongoClient.connect(this.DBAddress,{useUnifiedTopology:!0},(n,s)=>{n?r(n):(this.DBOrigin=s.db(this.DBAddress.split("/").reverse()[0]),e(!0))})})}getTableCaller(e){return new Promise((r,n)=>{this.DBOrigin.collection(e,{strict:!0},(s,i)=>{s?s.message===`Collection ${e} does not exist. Currently in strict mode.`?this.DBOrigin.createCollection(e,{},(o,f)=>{if(o){n(`\u521B\u5EFA\u96C6\u5408${e}\u5931\u8D25: ${o.message}`);return}r(f)}):n(s):r(i)})})}},ce=z;var fe=ae(require("mongodb")),G=class{constructor(e){this.TableName=null;this.TableStruct=null;this.TableCaller=null;this.TableCaller=e}async init(e,r){this.TableName=e,this.TableStruct=Object.assign({},r);for(let s in this.TableStruct)this.TableStruct[s]=null;let n=await this.getOldStruct();for(let s in r){if(s==="id"||s==="_id"||s==="timeCreate"||s==="timeUpdate"||n[s])continue;let i={};i[s]=null,console.log("create",s),await this.TableCaller.updateMany({},{$set:i})}for(let s in n){if(s==="id"||s==="_id"||s==="timeCreate"||s==="timeUpdate"||r[s])continue;let i={};i[s]=null,console.log("delete",s),await this.TableCaller.updateMany({},{$unset:i})}}async create(e){e=this.model2TableStruct(e);let r=Date.now();return e=Object.assign(e,{_id:String(new fe.ObjectId),timeCreate:r,timeUpdate:r}),(await this.TableCaller.insertOne(e,{forceServerObjectId:!0})).ops[0]}get(e){return new Promise((r,n)=>{this.TableCaller.find(e).toArray((s,i)=>{s?n(s.message):r(i[0]||null)})})}query(e){return new Promise((r,n)=>{this.TableCaller.find(e).toArray((s,i)=>{s?n(s.message):r(i)})})}async update(e,r){let n=this.getStruct();for(let i in r)i==="_id"||i==="timeCreate"||i==="timeUpdate"||n[i]===void 0&&delete r[i];return r=Object.assign(r,{timeUpdate:Date.now()}),await this.TableCaller.updateMany(e,{$set:r})}async delete(e){if((await this.TableCaller.deleteOne({_id:e})).deletedCount!==1)throw new Error(`${e} \u4E0D\u5B58\u5728`);return!0}async getOldStruct(){let e=await this.get({});for(let r in e)e[r]=!0;return e||{}}getStruct(){return Object.assign({},this.TableStruct)}model2TableStruct(e){let r=this.getStruct()||{};for(let n in r)e[n]&&(r[n]=e[n]);return r}},le=G;var ie=class{constructor(){this.cabinDB=null;this.cabinInfo=null;this.cabinHandler=null;this.OriginMap=new Map;this.EXPRESS=null;this.BODY_PARSE=null;this.NODE_HTTP_PROXY=null;this.EXPRESS=require("express"),this.BODY_PARSE=require("body-parser"),this.NODE_HTTP_PROXY=rt().createProxyServer()}async dbLink(e){this.cabinDB=new ce(e),await this.cabinDB.start()}async dbTabler(e){if(global.$db||(global.$db={}),!this.cabinDB)throw new Error("\u6570\u636E\u5E93\u670D\u52A1\u4E0D\u5B58\u5728");for(let r in e){let n=e[r].name,s=await this.cabinDB.getTableCaller(n);global.$db[n]=new le(s),await global.$db[n].init(n,e[r].struct)}}express(e,r){this.cabinInfo={CabinHandler:"express",APP_NAME:r,IPv4:global.$common.getIPv4(),SOCKET_NUMBER:e},e&&(this.cabinHandler=this.EXPRESS(),this.cabinHandler.all("*",(n,s,i)=>{s.header("Access-Control-Allow-Origin","*"),s.header("Access-Control-Allow-Headers","*"),s.header("Access-Control-Allow-Methods","*"),i()}),this.cabinHandler.listen(e,"0.0.0.0"))}expressRoute(e,r,n,s){if(!this.cabinInfo.SOCKET_NUMBER)return;let i=(o,f)=>{s?(console.log("Proxy",s),this.NODE_HTTP_PROXY.web(o,f,{target:s})):n(o,f)};switch(e){case"GET":this.cabinHandler.get(r,i);break;case"POST":this.cabinHandler.post(r,this.BODY_PARSE.json(),i);break}}expressHtml(e,r,n){this.cabinInfo.SOCKET_NUMBER||(this.cabinHandler.use(this.EXPRESS.static(r)),this.cabinHandler.get(e,(s,i)=>i.sendFile(n)))}expressProxy(e,r){!!this.cabinInfo.SOCKET_NUMBER}},tr=ie;
/*!
 * Array of passes.
 *
 * A `pass` is just a function that is executed on `req, res, options`
 * so that you can easily add new checks while still keeping the base
 * flexible.
 */
/*!
 * Array of passes.
 *
 * A `pass` is just a function that is executed on `req, socket, options`
 * so that you can easily add new checks while still keeping the base
 * flexible.
 */
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
