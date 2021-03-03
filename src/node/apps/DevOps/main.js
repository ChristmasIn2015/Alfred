var V=Object.create,f=Object.defineProperty,Z=Object.getPrototypeOf,J=Object.prototype.hasOwnProperty,Q=Object.getOwnPropertyNames,A=Object.getOwnPropertyDescriptor;var ee=s=>f(s,"__esModule",{value:!0});var te=(s,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Q(e))!J.call(s,n)&&n!=="default"&&f(s,n,{get:()=>e[n],enumerable:!(t=A(e,n))||t.enumerable});return s},D=s=>s&&s.__esModule?s:te(ee(f(s!=null?V(Z(s)):{},"default",{value:s,enumerable:!0})),s),g=(s,e,t,n)=>{for(var r=n>1?void 0:n?A(e,t):e,o=s.length-1,a;o>=0;o--)(a=s[o])&&(r=(n?a(e,t,r):a(r))||r);return n&&r&&f(e,t,r),r};var T=class{constructor(){this.isDebug=!0}toggleDebug(){this.isDebug=!this.isDebug}async log(e){try{this.isDebug&&await global.$common.fetch("http://wqao.top/yjy-log/create","POST",{message:e})}catch(t){console.log(t)}}},_=T;var O=D(require("axios")),v;(function(s){s.GET="GET",s.POST="POST"})(v||(v={}));var I=class{constructor(e,t){this.BASE_URL=e;this.COMPLETE=t;this.DEFAULT_HEADER={};this.BASE_URL=e,this.COMPLETE=t}async request(e,t,n,r){try{let o=await O.default({method:e,url:this.BASE_URL+(t||""),data:n,headers:r||this.DEFAULT_HEADER||{}});return await this.COMPLETE(o.data)}catch(o){throw o}}},C=class{constructor(){}getRequester(e,t){return new I(e,t)}async fetch(e,t,n,r){return(await O.default({method:t,url:e,data:n,headers:r})).data}},N=C;var E=class{constructor(){}getTimeDTO(){return{year:"",month:"",day:"",hour:"",min:"",sec:"",full:"",week:""}}getYYMMDD(e=Date.now()){let t="";return new Date(e).toLocaleDateString().split("/").forEach(n=>t+=Number(n)<10?`/0${n}`:`/${n}`),t.replace("/","")}getYY(e=Date.now()){return new Date(e).getFullYear().toString()}getMM(e=Date.now()){let t=new Date(e).getMonth()+1;return(t<10?`0${t}`:t).toString()}getDD(e=Date.now()){let t=new Date(e).getDate();return(t<10?`0${t}`:t).toString()}getHHMMSS(e=Date.now()){let t=null,n=new Date(e);return t=this.getTimeDTO(),t.hour=n.getHours()<10?`0${n.getHours()}`:n.getHours().toString(),t.min=n.getMinutes()<10?`0${n.getMinutes()}`:n.getMinutes().toString(),t.sec=n.getSeconds()<10?`0${n.getSeconds()}`:n.getSeconds().toString(),t.full=`${t.hour}:${t.min}:${t.sec}`,t}getFullTime(e=Date.now()){let t=this.getHHMMSS();return t.year=new Date(e).getFullYear().toString(),t.full=`${this.getYYMMDD(e)} ${t.full}`,t}getTimeGap(e=Date.now()+864e5){let t=null,n=e-Date.now();if(n>0){t=this.getTimeDTO();let r=~~(n/1e3/60/60)%24;t.hour=r<10?`0${r}`:r.toString();let o=~~(n/1e3/60)%60;t.min=o<10?`0${o}`:o.toString();let a=~~(n/1e3)%60;t.sec=a<10?`0${a}`:a.toString(),t.full=`${t.hour}:${t.min}:${t.sec}`}return t}getChineseWeek(e=Date.now()){let t="";switch(new Date(e).getDay()){case 1:t="\u5468\u4E00";break;case 2:t="\u5468\u4E8C";break;case 3:t="\u5468\u4E09";break;case 4:t="\u5468\u56DB";break;case 5:t="\u5468\u4E94";break;case 6:t="\u5468\u516D";break;case 0:t="\u5468\u65E5";break}return t}},j=E;var $=class{constructor(){}isValidMobile(e){return/^[1][0-9]{10}$/.test(e)}isValidEmail(e){return/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(e)}},W=$;var S=class{constructor(){}getLatLngDistance(e,t,n,r){let o=e*Math.PI/180,a=n*Math.PI/180,i=o-a,l=t*Math.PI/180-r*Math.PI/180,c=2*Math.asin(Math.sqrt(Math.pow(Math.sin(i/2),2)+Math.cos(o)*Math.cos(a)*Math.pow(Math.sin(l/2),2)));return c=c*6378.137,c=Math.round(c*1e4)/1e4,c.toFixed(2)}wannaObject(e,t){return e}},H=S;var P=class{constructor(){this.BinderMap=new Map;this.bindClass(this,"Log",_),this.bindClass(this,"Requester",N),this.bindClass(this,"UtilsTime",j),this.bindClass(this,"UtilsVaild",W),this.bindClass(this,"UtilsCalculation",H)}bindClass(e,t,n){n instanceof Function&&(e.BinderMap.set(t,new n),Object.getOwnPropertyNames(n.prototype).forEach(r=>{r!=="constructor"&&(e[r]=(...o)=>{let a=e.BinderMap.get(t);return a[r].apply(a,o)})}))}};var k=class{constructor(){this.IPv4=null;this.IPv4=this.getIPv4()}AlfredLogin(){let e=this.IPv4;return(t,n,r)=>{let o=r.value;r.value=async function(...a){let i=a[0],l=a[1];try{let c=await global.$common.fetch(`http://${e}:80/alfred/user/info`,"POST",null,{authorization:i.header("authorization")});if(c.code!==200)throw new Error(`${c.message}(code:${c.code})`);await o.apply(this,a)}catch(c){l.send({code:null,data:null,message:`\u767B\u5F55\u4FE1\u606F\u5F02\u5E38: ${c.message}`})}}}}Response(e=""){return(t,n,r)=>{let o=r.value;r.value=async function(...a){let i={code:null,data:null,message:""};try{let l=await o.apply(this,a);i.code=200,i.data=l||e}catch(l){i.message=l.message||l}finally{a[1].send(i)}}}}WsAlfredLogin(){let e=this.IPv4;return(t,n,r)=>{let o=r.value;r.value=async function(...a){let i=a[0];try{let l=await global.$common.fetch(`http://${e}:80/alfred/user/info`,"POST",null,{authorization:i.DTO.authorization});if(l.code!==200)throw new Error(`${l.message}`);if(l.data._id!=="603e28cd6b57e016b0bbb9b5")throw new Error("\u60A8\u4E0D\u662F\u7BA1\u7406\u5458");await o.apply(this,a)}catch(l){i.orderName="/request/authorization",i.DTO=l.message||l||"\u60A8\u7684\u6743\u9650\u4E0D\u8DB3",global.Cabin.websocketAnswer(i)}}}}WsResponse(e="",t=!1){return(n,r,o)=>{let a=o.value;o.value=async function(...i){let l=i[0];try{let c=await a.apply(this,i);l.DTO=c||e||null}catch(c){l.orderName="/request/fail",l.DTO=c.message||c}finally{t?global.Cabin.websocketBoardCast(l):global.Cabin.websocketAnswer(l)}}}}ElectronResponse(e=""){return(t,n,r)=>{let o=r.value;r.value=async function(...a){let i={code:null,data:null,message:""};try{let l=await o.apply(this,a);i.code=200,i.data=l||e}catch(l){i.message=l.message||l}finally{return i}}}}getIPv4(){let e=null;if(global.process.platform==="win32"){let t=require("os").networkInterfaces();for(let n in t)if(n==="\u4EE5\u592A\u7F51"||n==="WLAN"){for(let r in t[n]){let o=t[n][r];if(o.family==="IPv4"){e=o.address;break}}break}}return e}printRed(e){console.log(`[41m[30m${e}[0m`)}printYellow(e){console.log(`[43m[30m${e}[0m`)}printBlue(e){console.log(`[44m[37m${e}[0m`)}printGreen(e){console.log(`[42m[30m${e}[0m`)}printLink(e){console.log(`[34m${e}[0m`)}printText(e){console.log(`[33m${e}[0m`)}},K=k;var q=class extends P{constructor(){super();this.bindClass(this,"UtilsReactNode",K)}};global.$common=new q;var U=D(require("mongodb")),x=class{constructor(e){this.DBAddress="";this.DBOrigin=null;this.DBAddress=e}start(){return new Promise((e,t)=>{U.MongoClient.connect(this.DBAddress,{useUnifiedTopology:!0},(n,r)=>{n?t(n):(this.DBOrigin=r.db(this.DBAddress.split("/").reverse()[0]),e(!0))})})}getTableCaller(e){return new Promise((t,n)=>{this.DBOrigin.collection(e,{strict:!0},(r,o)=>{r?r.message===`Collection ${e} does not exist. Currently in strict mode.`?this.DBOrigin.createCollection(e,{},(a,i)=>{if(a){n(`\u521B\u5EFA\u96C6\u5408${e}\u5931\u8D25: ${a.message}`);return}t(i)}):n(r):t(o)})})}},L=x;var Y=D(require("mongodb")),B=class{constructor(e){this.TableName=null;this.TableStruct=null;this.TableCaller=null;this.TableCaller=e}async init(e,t){this.TableName=e,this.TableStruct=Object.assign({},t);for(let r in this.TableStruct)this.TableStruct[r]=null;let n=await this.getOldStruct();for(let r in t){if(r==="_id"||r==="timeCreate"||r==="timeUpdate"||n[r])continue;let o={};o[r]=null,await this.TableCaller.updateMany({},{$set:o})}for(let r in n){if(r==="_id"||r==="timeCreate"||r==="timeUpdate"||t[r])continue;let o={};o[r]=null,await this.TableCaller.updateMany({},{$unset:o})}}async create(e){e=this.model2TableStruct(e);let t=Date.now();return e=Object.assign(e,{_id:String(new Y.ObjectId),timeCreate:t,timeUpdate:t}),(await this.TableCaller.insertOne(e,{forceServerObjectId:!0})).ops[0]}get(e){return new Promise((t,n)=>{this.TableCaller.find(e).toArray((r,o)=>{r?n(r.message):t(o[0]||null)})})}query(e){return new Promise((t,n)=>{this.TableCaller.find(e).toArray((r,o)=>{r?n(r.message):t(o)})})}async update(e,t){let n=this.getStruct();for(let o in t)o==="_id"||o==="timeCreate"||o==="timeUpdate"||n[o]===void 0&&delete t[o];return t=Object.assign(t,{timeUpdate:Date.now()}),await this.TableCaller.updateMany(e,{$set:t})}async delete(e){if((await this.TableCaller.deleteOne({_id:e})).deletedCount!==1)throw new Error(`${e} \u4E0D\u5B58\u5728`);return!0}async getOldStruct(){let e=await this.get({});for(let t in e)e[t]=!0;return e||{}}getStruct(){return Object.assign({},this.TableStruct)}model2TableStruct(e){let t=this.getStruct()||{};for(let n in t)e[n]&&(t[n]=e[n]);return t}},F=B;var M=class{constructor(){this.VUE_PATH=require("path").join(process.cwd(),"./src/web/dist");this.BinderMap=new Map;this.cabinDB=null;this.cabinHandler=null;this.cabinInfo=null;this.BODY_PARSE=require("body-parser");this.EXPRESS=require("express");this.EXPRESS_PROXY=require("http-proxy-middleware").createProxyMiddleware;this.NODE_WEBSOCKET=require("nodejs-websocket");this.NODE_WEBSOCKET_ConnectionMAP={};this.NODE_WEBSOCKET_OrderMAP={}}async dbLink(e){this.cabinDB=new L(e),await this.cabinDB.start()}async dbTabler(e){if(global.$db||(global.$db={}),!this.cabinDB)throw new Error("\u6570\u636E\u5E93\u670D\u52A1\u4E0D\u5B58\u5728");for(let t in e){let n=e[t].name,r=await this.cabinDB.getTableCaller(n);global.$db[n]=new F(r),await global.$db[n].init(n,e[t].struct)}}express(e,t){this.cabinInfo={CabinHandler:"express",APP_NAME:t,IPv4:global.$common.getIPv4(),SOCKET_NUMBER:e},e&&(this.cabinHandler=this.EXPRESS(),this.cabinHandler.all("*",(n,r,o)=>{r.header("Access-Control-Allow-Origin","*"),r.header("Access-Control-Allow-Headers","*"),r.header("Access-Control-Allow-Methods","*"),o()}),this.cabinHandler.use(this.EXPRESS.static(this.VUE_PATH)),this.cabinHandler.listen(e,"0.0.0.0"))}expressProxy(e,t,n){n=!!n;let r={target:t,changeOrigin:!0,ws:n};this.cabinHandler.use(e,this.EXPRESS_PROXY(r))}expressHtml(e,t){!this.cabinInfo.SOCKET_NUMBER||this.cabinHandler.get(e,(n,r)=>r.sendFile(t))}expressRoute(e,t,n){if(!!this.cabinInfo.SOCKET_NUMBER)switch(e){case"GET":this.cabinHandler.get(t,(r,o)=>n(r,o));break;case"POST":this.cabinHandler.post(t,this.BODY_PARSE.json(),(r,o)=>n(r,o));break}}websocket(e,t){return this.cabinInfo={CabinHandler:"websocket",APP_NAME:t,IPv4:global.$common.getIPv4(),SOCKET_NUMBER:e},new Promise((n,r)=>{if(!e){r(`\u8BF7\u9009\u62E9\u7AEF\u53E3\u53F7:${e}`);return}this.cabinHandler=this.NODE_WEBSOCKET.createServer(o=>{let a=o.key;this.NODE_WEBSOCKET_ConnectionMAP[a]=o,o.on("text",async i=>{try{if(typeof i!="string")return;i=JSON.parse(i),i.connectionKey=a;let l=this.NODE_WEBSOCKET_OrderMAP[i.orderName];if(!i.orderName||!l)return;await l(i)}catch(l){this.websocketAnswer({connectionKey:a,orderName:`${i.orderName}/error`,DTO:l.message})}}),o.on("close",i=>{delete this.NODE_WEBSOCKET_ConnectionMAP[a],this.websocketAnswer({connectionKey:a,orderName:"/connection/close",DTO:"\u670D\u52A1\u5DF2\u5173\u95ED"})}),o.on("error",i=>{delete this.NODE_WEBSOCKET_ConnectionMAP[a]}),this.websocketAnswer({connectionKey:a,orderName:"/connection/success",DTO:null})}),this.cabinHandler.listen(e),n(!0)})}websocketRoute(e,t){!e||(this.NODE_WEBSOCKET_OrderMAP[e]=t)}websocketAnswer(e){let t=this.NODE_WEBSOCKET_ConnectionMAP[e.connectionKey];!t||t.sendText(JSON.stringify(e))}websocketBoardCast(e){for(let t in this.NODE_WEBSOCKET_ConnectionMAP){let n=this.NODE_WEBSOCKET_ConnectionMAP[t];!n||n.sendText(JSON.stringify(e))}}},G=M;var m;(function(s){s.WHITE="white",s.GREEN="green",s.YELLOW="yellow",s.RED="red"})(m||(m={}));function z(s,e){if(s=s.replace(/\n/g," "),ne(s)){let i=global.$common.getFullTime().full;e({pid:null,text:`@Node(${process.pid}) Danger Cmd: ${s}`,html:h(m.RED,`@Node(${process.pid}) Danger Cmd: ${s}`,i)});return}let t=require("child_process").exec(s,{maxBuffer:1024*1024*1024},(i,l,c)=>{let d=`@Node(${process.pid}) Cmd(${t.pid})`,y=global.$common.getFullTime().full,b={pid:null,text:`${d} Task end`,html:h(m.GREEN,d,`${d} Task end`,y)};i?(b.text=`${d} Command error:${i.message}`,b.html=h(m.RED,d,b.text,y)):c&&(b.text=`${d} Task error:${c.message}`,b.html=h(m.RED,d,b.text,y)),e(b)}),n="latin1";t.stdout.setEncoding(n);let r="utf8",o=`@Node(${process.pid}) Cmd(${t.pid}) Task start\uFF1A${n}=>${r}`,a=require("iconv-lite");return e({pid:t.pid,text:o,html:h(m.GREEN,o)}),t.stdout.on("data",i=>{let l=a.decode(Buffer.from(`@Log(${t.pid}) ${i}`,n),r);e({pid:t.pid,text:l,html:h(m.WHITE,l)}),i.includes("Merge conflict")&&R(t.pid)}),t.pid}function R(s){require("tree-kill")(s)}function ne(s){s=s.trim().toUpperCase();let e=!1;return s.length===0&&(e=!0),s.indexOf("SSH")>=0&&(e=!0),e}function h(s,...e){let t="";return e.forEach(n=>t+=`<div style="color:${s}">${n}</div>`),t}var w=global.$common.WsResponse,p=global.$common.WsAlfredLogin,u=class{constructor(){this.cmdId_pid={}}async getRemoteCmdList(e){let t=await global.$db.Command.query({});return t.forEach(n=>{n.pid=this.cmdId_pid[n._id]||null,n.log=""}),t}async createRemoteCmd(e){let t=e.DTO.name,n=e.DTO.command;if(!t)throw new Error(`No empty name: ${t}`);if(!n)throw new Error(`No empty command: ${n}`);return await global.$db.Command.create({name:t,command:n}),`\u521B\u5EFA\u8FDC\u7A0B\u547D\u4EE4:${t}, \u6210\u529F`}async deleteRemoteCmd(e){let t=e.DTO._id,n=e.DTO.name;if(!t)throw new Error("\u672A\u627E\u5230\u8FDC\u7A0B\u547D\u4EE4");return await global.$db.Command.delete(t),`\u5220\u9664\u8FDC\u7A0B\u547D\u4EE4:${n}, \u6210\u529F`}async updateRemoteCmd(e){let t=e.DTO._id;if(!t)throw new Error("\u672A\u627E\u5230\u8FDC\u7A0B\u547D\u4EE4");let n=e.DTO.name,r=e.DTO.command;if(!n)throw new Error(`No empty name: ${n}`);if(!r)throw new Error(`No empty command: ${r}`);return await global.$db.Command.update({_id:t},{name:n,command:r}),`\u7F16\u8F91\u8FDC\u7A0B\u547D\u4EE4:${n}, \u6210\u529F`}async excuteRemoteCmd(e){let t={connectionKey:e.connectionKey,orderName:"/request/fail",DTO:null};try{let n=e.DTO._id,r=await global.$db.Command.get({_id:n});if(this.cmdId_pid[n])throw new Error(`${r.name}, \u6B63\u5728\u8FD0\u884C`);if(!r)throw new Error(`\u627E\u4E0D\u5230\u547D\u4EE4: ${e.DTO.name}`);z(r.command,o=>{this.cmdId_pid[n]||(this.cmdId_pid[n]=o.pid),global.Cabin.websocketBoardCast({connectionKey:e.connectionKey,orderName:"/excuteRemoteCmd",DTO:Object.assign({logListIndex:e.DTO.logListIndex},o)}),o.pid||delete this.cmdId_pid[n]})}catch(n){t.DTO=n.message,global.Cabin.websocketBoardCast(t)}}killRemoteCmd(e){try{let t=e.DTO.pid;if(!t)throw new Error(`\u627E\u4E0D\u5230\u8FDB\u7A0B: ${t}`);R(t),global.Cabin.websocketBoardCast(e)}catch(t){e.orderName="/request/fail",e.DTO=t.message,global.Cabin.websocketBoardCast(e)}}};g([p(),w("\u83B7\u53D6\u8FDC\u7A0B\u547D\u4EE4\u6210\u529F",!0)],u.prototype,"getRemoteCmdList",1),g([p(),w("\u521B\u5EFA\u8FDC\u7A0B\u547D\u4EE4\u6210\u529F",!0)],u.prototype,"createRemoteCmd",1),g([p(),w("\u5220\u9664\u8FDC\u7A0B\u547D\u4EE4\u6210\u529F",!0)],u.prototype,"deleteRemoteCmd",1),g([p(),w("\u66F4\u65B0\u8FDC\u7A0B\u547D\u4EE4\u6210\u529F",!0)],u.prototype,"updateRemoteCmd",1),g([p()],u.prototype,"excuteRemoteCmd",1),g([p()],u.prototype,"killRemoteCmd",1);var X=u;async function re(){try{let s=parseInt(process.argv[2]);if(!s)throw new Error(`Please chose your socket number, now is ${s}`);let e=new G;await e.dbLink("mongodb://127.0.0.1:27017/DevOps"),await e.dbTabler([{name:"Command",struct:{name:"string",command:"string"}}]),global.$common.bindClass(e,"DevOps_Cmd",X),await e.websocket(s,"DevOps"),global.Cabin=e,e.websocketRoute("/createRemoteCmd",global.Cabin.createRemoteCmd),e.websocketRoute("/getRemoteCmdList",global.Cabin.getRemoteCmdList),e.websocketRoute("/deleteRemoteCmd",global.Cabin.deleteRemoteCmd),e.websocketRoute("/updateRemoteCmd",global.Cabin.updateRemoteCmd),e.websocketRoute("/excuteRemoteCmd",global.Cabin.excuteRemoteCmd),e.websocketRoute("/killRemoteCmd",global.Cabin.killRemoteCmd),console.log(e.cabinInfo)}catch(s){console.log(s.message),process.exit()}}re();
