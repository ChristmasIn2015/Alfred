var me=Object.create,w=Object.defineProperty,he=Object.getPrototypeOf,pe=Object.prototype.hasOwnProperty,fe=Object.getOwnPropertyNames,U=Object.getOwnPropertyDescriptor;var ye=l=>w(l,"__esModule",{value:!0});var we=(l,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of fe(e))!pe.call(l,r)&&r!=="default"&&w(l,r,{get:()=>e[r],enumerable:!(t=U(e,r))||t.enumerable});return l},I=l=>l&&l.__esModule?l:we(ye(w(l!=null?me(he(l)):{},"default",{value:l,enumerable:!0})),l),d=(l,e,t,r)=>{for(var o=r>1?void 0:r?U(e,t):e,s=l.length-1,n;s>=0;s--)(n=l[s])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&w(e,t,o),o};var D=class{constructor(){this.isDebug=!0}toggleDebug(){this.isDebug=!this.isDebug}async log(e){try{this.isDebug&&await global.$common.fetch("http://wqao.top/yjy-log/create","POST",{message:e})}catch(t){console.log(t)}}},N=D;var $=I(require("axios")),G;(function(l){l.GET="GET",l.POST="POST"})(G||(G={}));var q=class{constructor(e,t){this.BASE_URL=e;this.COMPLETE=t;this.DEFAULT_HEADER={};this.BASE_URL=e,this.COMPLETE=t}async request(e,t,r,o){try{let s=await $.default({method:e,url:this.BASE_URL+(t||""),data:r,headers:o||this.DEFAULT_HEADER||{}});return await this.COMPLETE(s.data)}catch(s){throw s}}},P=class{constructor(){}getRequester(e,t){return new q(e,t)}async fetch(e,t,r,o){return(await $.default({method:t,url:e,data:r,headers:o})).data}},K=P;var C=class{constructor(){}getTimeDTO(){return{year:"",month:"",day:"",hour:"",min:"",sec:"",full:"",week:""}}getYYMMDD(e=Date.now()){let t="";return new Date(e).toLocaleDateString().split("/").forEach(r=>t+=Number(r)<10?`/0${r}`:`/${r}`),t.replace("/","")}getYY(e=Date.now()){return new Date(e).getFullYear().toString()}getMM(e=Date.now()){let t=new Date(e).getMonth()+1;return(t<10?`0${t}`:t).toString()}getDD(e=Date.now()){let t=new Date(e).getDate();return(t<10?`0${t}`:t).toString()}getHHMMSS(e=Date.now()){let t=null,r=new Date(e);return t=this.getTimeDTO(),t.hour=r.getHours()<10?`0${r.getHours()}`:r.getHours().toString(),t.min=r.getMinutes()<10?`0${r.getMinutes()}`:r.getMinutes().toString(),t.sec=r.getSeconds()<10?`0${r.getSeconds()}`:r.getSeconds().toString(),t.full=`${t.hour}:${t.min}:${t.sec}`,t}getFullTime(e=Date.now()){let t=this.getHHMMSS(e);return t.year=new Date(e).getFullYear().toString(),t.full=`${this.getYYMMDD(e)} ${t.full}`,t}getTimeGap(e=Date.now()+864e5){let t=null,r=e-Date.now();if(r>0){t=this.getTimeDTO();let o=~~(r/1e3/60/60)%24;t.hour=o<10?`0${o}`:o.toString();let s=~~(r/1e3/60)%60;t.min=s<10?`0${s}`:s.toString();let n=~~(r/1e3)%60;t.sec=n<10?`0${n}`:n.toString(),t.full=`${t.hour}:${t.min}:${t.sec}`}return t}getChineseWeek(e=Date.now()){let t="";switch(new Date(e).getDay()){case 1:t="\u5468\u4E00";break;case 2:t="\u5468\u4E8C";break;case 3:t="\u5468\u4E09";break;case 4:t="\u5468\u56DB";break;case 5:t="\u5468\u4E94";break;case 6:t="\u5468\u516D";break;case 0:t="\u5468\u65E5";break}return t}},W=C;var B=class{constructor(){}isValidMobile(e){return/^[1][0-9]{10}$/.test(e)}isValidEmail(e){return/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(e)}},Y=B;var x=class{constructor(){}getLatLngDistance(e,t,r,o){let s=e*Math.PI/180,n=r*Math.PI/180,a=s-n,i=t*Math.PI/180-o*Math.PI/180,c=2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2)+Math.cos(s)*Math.cos(n)*Math.pow(Math.sin(i/2),2)));return c=c*6378.137,c=Math.round(c*1e4)/1e4,c.toFixed(2)}wannaObject(e,t){return e}},z=x;var A=class{constructor(){this.BinderMap=new Map;this.bindClass(this,"Log",N),this.bindClass(this,"Requester",K),this.bindClass(this,"UtilsTime",W),this.bindClass(this,"UtilsVaild",Y),this.bindClass(this,"UtilsCalculation",z)}bindClass(e,t,r){r instanceof Function&&(e.BinderMap.set(t,new r),Object.getOwnPropertyNames(r.prototype).forEach(o=>{o!=="constructor"&&(e[o]=(...s)=>{let n=e.BinderMap.get(t);return n[o].apply(n,s)})}))}};var _=class{constructor(){this.IPv4=null;this.IPv4=this.getIPv4()}AlfredLogin(){let e=this.IPv4;return(t,r,o)=>{let s=o.value;o.value=async function(...n){let a=n[0],i=n[1];try{let c=await global.$common.fetch(`http://${e}:80/alfred/user/info`,"POST",null,{authorization:a.header("authorization")});if(c.code!==200)throw new Error(`${c.message}(code:${c.code})`);n.push(c.data),await s.apply(this,n)}catch(c){i.send({code:null,data:null,message:`\u767B\u5F55\u4FE1\u606F\u5F02\u5E38: ${c.message}`})}}}}Response(e=""){return(t,r,o)=>{let s=o.value;o.value=async function(...n){let a={code:null,data:null,message:""},i=Date.now();try{let c=await s.apply(this,n);a.code=200,a.data=c||e}catch(c){a.message=c.message||c}finally{n[1].send(a)}}}}WsAlfredLogin(){let e=this.IPv4;return(t,r,o)=>{let s=o.value;o.value=async function(...n){let a=n[0];try{let i=await global.$common.fetch(`http://${e}:80/alfred/user/info`,"POST",null,{authorization:a.DTO.authorization});if(i.code!==200)throw new Error(`${i.message}`);if(!i.data.isSystemMaster)throw new Error("\u60A8\u4E0D\u662F\u7BA1\u7406\u5458");await s.apply(this,n)}catch(i){a.orderName="/request/authorization",a.DTO=i.message||i||"\u60A8\u7684\u6743\u9650\u4E0D\u8DB3",global.Cabin.websocketAnswer(a)}}}}WsResponse(e="",t=!1){return(r,o,s)=>{let n=s.value;s.value=async function(...a){let i=a[0];try{let c=await n.apply(this,a);i.DTO=c||e||null}catch(c){i.orderName="/request/fail",i.DTO=c.message||c}finally{t?global.Cabin.websocketBoardCast(i):global.Cabin.websocketAnswer(i)}}}}ElectronResponse(e=""){return(t,r,o)=>{let s=o.value;o.value=async function(...n){let a={code:null,data:null,message:""};try{let i=await s.apply(this,n);a.code=200,a.data=i||e}catch(i){a.message=i.message||i}finally{return a}}}}getIPv4(){if(this.IPv4)return this.IPv4;let e=null;if(global.process.platform==="win32"){let t=require("os").networkInterfaces();for(let r in t)if(r==="\u4EE5\u592A\u7F51"||r==="WLAN"){for(let o in t[r]){let s=t[r][o];if(s.family==="IPv4"){e=s.address;break}}break}}return e}printRed(e){console.log(`[41m[30m${e}[0m`)}printYellow(e){console.log(`[43m[30m${e}[0m`)}printBlue(e){console.log(`[44m[37m${e}[0m`)}printGreen(e){console.log(`[42m[30m${e}[0m`)}printLink(e){console.log(`[34m${e}[0m`)}printText(e){console.log(`[33m${e}[0m`)}},F=_;var X=class extends A{constructor(){super();this.bindClass(this,"UtilsReactNode",F)}};global.$common=new X;var V=I(require("mongodb")),M=class{constructor(e){this.DBAddress="";this.DBOrigin=null;this.DBAddress=e}start(){return new Promise((e,t)=>{V.MongoClient.connect(this.DBAddress,{useUnifiedTopology:!0},(r,o)=>{r?t(r):(this.DBOrigin=o.db(this.DBAddress.split("/").reverse()[0]),e(!0))})})}getTableCaller(e){return new Promise((t,r)=>{this.DBOrigin.collection(e,{strict:!0},(o,s)=>{o?o.message===`Collection ${e} does not exist. Currently in strict mode.`?this.DBOrigin.createCollection(e,{},(n,a)=>{if(n){r(`\u521B\u5EFA\u96C6\u5408${e}\u5931\u8D25: ${n.message}`);return}t(a)}):r(o):t(s)})})}},Z=M;var J=I(require("mongodb")),k=class{constructor(e){this.TableName=null;this.TableStruct=null;this.TableCaller=null;this.TableCaller=e}async init(e,t){this.TableName=e,this.TableStruct=Object.assign({},t);for(let o in this.TableStruct)this.TableStruct[o]=null;let r=await this.getOldStruct();for(let o in t){if(o==="_id"||o==="timeCreate"||o==="timeUpdate"||r[o])continue;let s={};s[o]=null,await this.TableCaller.updateMany({},{$set:s})}for(let o in r){if(o==="_id"||o==="timeCreate"||o==="timeUpdate"||t[o])continue;let s={};s[o]=null,await this.TableCaller.updateMany({},{$unset:s})}}async create(e){e=this.model2TableStruct(e);let t=Date.now();return e=Object.assign(e,{_id:String(new J.ObjectId),timeCreate:t,timeUpdate:t}),(await this.TableCaller.insertOne(e,{forceServerObjectId:!0})).ops[0]}get(e){return new Promise((t,r)=>{this.TableCaller.find(e).toArray((o,s)=>{o?r(o.message):t(s[0]||null)})})}query(e){return new Promise((t,r)=>{this.TableCaller.find(e).toArray((o,s)=>{o?r(o.message):t(s)})})}async update(e,t){let r=this.getStruct();for(let s in t)s==="_id"||s==="timeCreate"||s==="timeUpdate"||r[s]===void 0&&delete t[s];return t=Object.assign(t,{timeUpdate:Date.now()}),await this.TableCaller.updateMany(e,{$set:t})}async delete(e){if((await this.TableCaller.deleteOne({_id:e})).deletedCount!==1)throw new Error(`${e} \u4E0D\u5B58\u5728`);return!0}async getOldStruct(){let e=await this.get({});for(let t in e)e[t]=!0;return e||{}}getStruct(){return Object.assign({},this.TableStruct)}model2TableStruct(e){let t=this.getStruct()||{};for(let r in t)e[r]!==void 0&&(t[r]=e[r]);return t}},Q=k;var L=class{constructor(){this.VUE_PATH=require("path").join(process.cwd(),"./src/web/dist");this.BinderMap=new Map;this.cabinDB=null;this.cabinHandler=null;this.cabinInfo=null;this.BODY_PARSE=require("body-parser");this.EXPRESS=require("express");this.EXPRESS_PROXY=require("http-proxy-middleware").createProxyMiddleware;this.NODE_WEBSOCKET=require("nodejs-websocket");this.NODE_WEBSOCKET_ConnectionMAP={};this.NODE_WEBSOCKET_OrderMAP={}}async dbLink(e){this.cabinDB=new Z(e),await this.cabinDB.start()}async dbTabler(e){if(global.$db||(global.$db={}),!this.cabinDB)throw new Error("\u6570\u636E\u5E93\u670D\u52A1\u4E0D\u5B58\u5728");for(let t in e){let r=e[t].name,o=await this.cabinDB.getTableCaller(r);global.$db[r]=new Q(o),await global.$db[r].init(r,e[t].struct)}}express(e,t){this.cabinInfo={CabinHandler:"express",APP_NAME:t,IPv4:global.$common.getIPv4(),SOCKET_NUMBER:e},e&&(this.cabinHandler=this.EXPRESS(),this.cabinHandler.all("*",(r,o,s)=>{o.header("Access-Control-Allow-Origin","*"),o.header("Access-Control-Allow-Headers","*"),o.header("Access-Control-Allow-Methods","*"),s()}),this.cabinHandler.use(this.EXPRESS.static(this.VUE_PATH)),this.cabinHandler.listen(e,"0.0.0.0"))}expressProxy(e,t,r){r=!!r;let o={target:t,changeOrigin:!0,ws:r};this.cabinHandler.use(e,this.EXPRESS_PROXY(o))}expressHtml(e,t){!this.cabinInfo.SOCKET_NUMBER||this.cabinHandler.get(e,(r,o)=>o.sendFile(t))}expressRoute(e,t,r){if(!!this.cabinInfo.SOCKET_NUMBER)switch(e){case"GET":this.cabinHandler.get(t,(o,s)=>r(o,s));break;case"POST":this.cabinHandler.post(t,this.BODY_PARSE.json(),(o,s)=>r(o,s));break}}websocket(e,t){return this.cabinInfo={CabinHandler:"websocket",APP_NAME:t,IPv4:global.$common.getIPv4(),SOCKET_NUMBER:e},new Promise((r,o)=>{if(!e){o(`\u8BF7\u9009\u62E9\u7AEF\u53E3\u53F7:${e}`);return}this.cabinHandler=this.NODE_WEBSOCKET.createServer(s=>{let n=s.key;this.NODE_WEBSOCKET_ConnectionMAP[n]=s,s.on("text",async a=>{try{if(typeof a!="string")return;a=JSON.parse(a),a.connectionKey=n;let i=this.NODE_WEBSOCKET_OrderMAP[a.orderName];if(!a.orderName||!i)return;await i(a)}catch(i){this.websocketAnswer({connectionKey:n,orderName:`${a.orderName}/error`,DTO:i.message})}}),s.on("close",a=>{delete this.NODE_WEBSOCKET_ConnectionMAP[n],this.websocketAnswer({connectionKey:n,orderName:"/connection/close",DTO:"\u670D\u52A1\u5DF2\u5173\u95ED"})}),s.on("error",a=>{delete this.NODE_WEBSOCKET_ConnectionMAP[n]}),this.websocketAnswer({connectionKey:n,orderName:"/connection/success",DTO:null})}),this.cabinHandler.listen(e),r(!0)})}websocketRoute(e,t){!e||(this.NODE_WEBSOCKET_OrderMAP[e]=t)}websocketAnswer(e){let t=this.NODE_WEBSOCKET_ConnectionMAP[e.connectionKey];!t||t.sendText(JSON.stringify(e))}websocketBoardCast(e){for(let t in this.NODE_WEBSOCKET_ConnectionMAP){let r=this.NODE_WEBSOCKET_ConnectionMAP[t];!r||r.sendText(JSON.stringify(e))}}},ee=L;var R=global.$common.Response,H=global.$common.AlfredLogin,h=class{constructor(){}async createShop(e,t,r){if(!e.body.name)throw new Error("\u8BF7\u8F93\u5165\u5E97\u94FA\u540D\u79F0");if(!e.body._id){let o=await global.$db.Shop.create({name:e.body.name});await global.$db.ShopByUser.create({shopId:o._id,userId:r._id,role:0})}}async getShopList(e,t,r){let o={userId:r._id},s=await global.$db.ShopByUser.query(o),n=[];for(let c in s){let u=await global.$db.Shop.get({_id:s[c].shopId});u.role=s[c].role,u&&n.push(u)}let a=n.filter(c=>c.role===0),i=n.filter(c=>c.role===1);return{shopList:a,officeList:i}}async deleteShop(e,t,r){let o={shopId:e.body.shopId,userId:r._id,role:0},s=await global.$db.ShopByUser.get(o);if(!s)throw new Error("\u672A\u627E\u5230\u60A8\u7684\u5E97\u94FA, \u6216\u60A8\u4E0D\u662F\u5E97\u957F");return await global.$db.Shop.delete({_id:s.shopId}),await global.$db.ShopByUser.delete({_id:s._id}),"\u5220\u9664\u5E97\u94FA\u6210\u529F"}};d([H(),R("\u6DFB\u52A0\u5E97\u94FA\u6210\u529F")],h.prototype,"createShop",1),d([H(),R("\u83B7\u53D6\u5E97\u94FA\u6210\u529F")],h.prototype,"getShopList",1),d([H(),R()],h.prototype,"deleteShop",1);var te=h;var oe=global.$common.Response,re=global.$common.AlfredLogin,p=class{constructor(){}async createHouse(e,t,r){if(!e.body.shopId)throw new Error("\u8BF7\u9009\u62E9\u5E97\u94FA");if(!e.body.name)throw new Error("\u8BF7\u8F93\u5165\u4ED3\u5E93\u540D\u79F0");let o={shopId:e.body.shopId,userId:r._id,role:0};if(!await global.$db.ShopByUser.get(o))throw new Error("\u60A8\u9009\u62E9\u7684\u5E97\u94FA\u4E0D\u5B58\u5728, \u8BF7\u91CD\u65B0\u9009\u62E9\u5E97\u94FA");if(!e.body._id){let n=await global.$db.House.create({name:e.body.name});await global.$db.HouseByShop.create({houseId:n._id,shopId:e.body.shopId})}}async getHouseList(e,t,r){if(!e.body.shopId)throw new Error("\u8BF7\u9009\u62E9\u5E97\u94FA");let o=await global.$db.HouseByShop.query({shopId:e.body.shopId}),s=[];for(let n in o){let a=await global.$db.House.get({_id:o[n].houseId});a&&s.push(a)}return s}};d([re(),oe("\u521B\u5EFA\u4ED3\u5E93\u6210\u529F")],p.prototype,"createHouse",1),d([re(),oe("\u83B7\u53D6\u4ED3\u5E93\u6210\u529F")],p.prototype,"getHouseList",1);var se=p;var Oe=global.$common.Response,Se=global.$common.AlfredLogin,O=class{constructor(){}async getEmployeeList(e,t){let r=e.body.shopId;if(!await global.$db.Shop.get({_id:r}))throw new Error("\u8BF7\u9009\u62E9\u5E97\u94FA, \u6216\u8BE5\u5E97\u94FA\u4E0D\u5B58\u5728");let s=await global.$db.ShopByUser.query({shopId:r});s.forEach(i=>i._id=i.userId);let n=global.$common.getIPv4(),a=await global.$common.fetch(`http://${n}:80/alfred/user/listById`,"POST",{ids:s},{authorization:e.header("authorization")});if(a.code!==200)throw new Error(a.message);return a.data}};d([Se(),Oe("\u83B7\u53D6\u96C7\u5458\u5217\u8868\u6210\u529F")],O.prototype,"getEmployeeList",1);var ne=O;var S=global.$common.Response,v=global.$common.AlfredLogin,g=class{constructor(){}async createGoodInHouse(e,t,r){let o=e.body.houseId;if(!o)throw new Error("\u8BF7\u9009\u62E9\u4ED3\u5E93");let s=e.body.goodList;if(!s)throw new Error("\u5F85\u521B\u5EFA\u5546\u54C1\u5F02\u5E38");for(let n in s){let a=s[n],i=a.name,c=a.norm||"";if(!i)throw new Error(`\u5546\u54C1\u540D\u79F0\u4E0D\u80FD\u4E3A:${i}`);let u=await global.$db.Good.create({name:i,norm:c}),b=Number(a.count||0),m=a.countName||"",T=a.remark||"",E=a.cost||"";await global.$db.HouseGood.create({houseId:o,goodId:u._id,count:b,countName:m,remark:T,cost:E})}}async getGoodListInHouse(e,t,r){let o=e.body.houseId;if(!o)throw new Error("\u8BF7\u9009\u62E9\u4ED3\u5E93");let s=await global.$db.HouseGood.query({houseId:o}),n={},a=[];for(let i in s){let c=s[i].goodId;if(n[c])continue;n[c]=!0;let u=await global.$db.Good.get({_id:c});s[i]._id=c,a.push(Object.assign(u,s[i]))}return a}async updateGood(e,t){}async deleteGood(e,t){}};d([v(),S("\u6DFB\u52A0\u5546\u54C1\u6210\u529F")],g.prototype,"createGoodInHouse",1),d([v(),S()],g.prototype,"getGoodListInHouse",1),d([v(),S()],g.prototype,"updateGood",1),d([S("\u5220\u9664\u5546\u54C1\u6210\u529F")],g.prototype,"deleteGood",1);var ae=g;var ie=global.$common.Response,le=global.$common.AlfredLogin,f=class{constructor(){}async addCustomer(e,t,r){let o=e.body.shopId;if(!o)throw new Error("\u8BF7\u9009\u62E9\u5E97\u94FA");let n=(await global.$db.ShopByUser.query({shopId:o})).find(m=>m.role===0);if(!n)throw new Error("\u627E\u4E0D\u5230\u5E97\u957F");let a=n.userId,i=e.body.name;if(!i)throw new Error("\u8BF7\u8F93\u5165\u5BA2\u6237\u540D\u79F0");let c=e.body.contact,u=e.body.remark,b=await global.$db.Customer.create({name:i,contact:c,remark:u});await global.$db.CustomerByUser.create({userId:a,customerId:b._id})}async getCustomerList(e,t,r){let o=e.body.shopId;if(!o)throw new Error("\u8BF7\u9009\u62E9\u5E97\u94FA");let n=(await global.$db.ShopByUser.query({shopId:o})).find(u=>u.role===0);if(!n)throw new Error("\u627E\u4E0D\u5230\u5E97\u957F");let a=n.userId,i=await global.$db.CustomerByUser.query({userId:a}),c=[];for(let u in i){let b=await global.$db.Customer.get({_id:i[u].customerId});b&&c.push(b)}return c}};d([le(),ie("\u6DFB\u52A0\u5BA2\u6237\u6210\u529F")],f.prototype,"addCustomer",1),d([le(),ie("\u83B7\u53D6\u5BA2\u6237\u5217\u8868\u6210\u529F")],f.prototype,"getCustomerList",1);var ce=f;var de=global.$common.Response,ue=global.$common.AlfredLogin,y=class{constructor(){}async addOrder(e,t,r){let o=e.body.houseId;if(!o)throw new Error("\u8BF7\u9009\u62E9\u4ED3\u5E93");let s=e.body.customerId;if(!s)throw new Error("\u8BF7\u9009\u62E9\u5BA2\u6237");let n=e.body.saleGoodList;if(!n)throw new Error("\u8BF7\u9009\u62E9\u5546\u54C1");let a=e.body.remark,c=(await global.$db.Order.create({createrId:r._id,houseId:o,customerId:s,remark:a}))._id;for(let u in n){let b=n[u]._id;if(!b)continue;let m=Number(n[u].count)||0,T=n[u].countName,E=n[u].remark,ge=n[u].retailPrice,j=await global.$db.HouseGood.get({houseId:o,goodId:b});!j||(await global.$db.OrderGood.create({orderId:c,goodId:b,count:m,countName:T,remark:E,transportStatus:0,retailPrice:ge}),await global.$db.HouseGood.update({houseId:o,goodId:b},{count:j.count-m}))}}async getOrderListByHouseId(e,t){let r=e.body.houseId;if(!r)throw new Error("\u8BF7\u9009\u62E9\u4ED3\u5E93");let o=await global.$db.Order.query({houseId:r});for(let s in o){let n=await global.$db.OrderGood.query({orderId:o[s]._id});for(let a in n){let i=await global.$db.Good.get({_id:n[a].goodId});i&&(n[a]=Object.assign(i,n[a]))}o[s].saleGoodList=n}return o}};d([ue(),de("\u521B\u5EFA\u8BA2\u5355\u6210\u529F")],y.prototype,"addOrder",1),d([ue(),de()],y.prototype,"getOrderListByHouseId",1);var be=y;async function Te(){try{let l=parseInt(process.argv[2]);if(!l)throw new Error(`Please chose your socket number, now is ${l}`);let e=new ee;await e.dbLink("mongodb://127.0.0.1:27017/QtShop"),await e.dbTabler([{name:"Shop",struct:{name:"string"}},{name:"ShopByUser",struct:{userId:"string",role:"number",shopId:"string"}},{name:"House",struct:{name:"string"}},{name:"HouseByShop",struct:{shopId:"string",houseId:"string"}},{name:"Good",struct:{name:"string",norm:"string"}},{name:"HouseGood",struct:{houseId:"string",goodId:"string",count:"number",countName:"string",remark:"string",cost:"number"}},{name:"Customer",struct:{name:"string",contact:"string",remark:"string"}},{name:"CustomerByUser",struct:{userId:"string",customerId:"string"}},{name:"Order",struct:{createrId:"string",customerId:"string",houseId:"string",remark:"string"}},{name:"OrderGood",struct:{orderId:"string",goodId:"string",count:"number",countName:"string",remark:"string",transportStatus:"number",retailPrice:"number"}}]),global.$common.bindClass(e,"QtShop_Shop",te),global.$common.bindClass(e,"QtShop_House",se),global.$common.bindClass(e,"QtShop_Employee",ne),global.$common.bindClass(e,"QtShop_Good",ae),global.$common.bindClass(e,"QtShop_Customer",ce),global.$common.bindClass(e,"QtShop_Order",be),e.express(l,"QtShop"),global.Cabin=e,e.expressRoute("POST","/qt-shop/shop/create",global.Cabin.createShop),e.expressRoute("GET","/qt-shop/shop/list",global.Cabin.getShopList),e.expressRoute("POST","/qt-shop/shop/delete",global.Cabin.deleteShop),e.expressRoute("POST","/qt-shop/house/create",global.Cabin.createHouse),e.expressRoute("POST","/qt-shop/house/list",global.Cabin.getHouseList),e.expressRoute("POST","/qt-shop/employee/list",global.Cabin.getEmployeeList),e.expressRoute("POST","/qt-shop/good/create",global.Cabin.createGoodInHouse),e.expressRoute("POST","/qt-shop/good/list",global.Cabin.getGoodListInHouse),e.expressRoute("POST","/qt-shop/customer/create",global.Cabin.addCustomer),e.expressRoute("POST","/qt-shop/customer/list",global.Cabin.getCustomerList),e.expressRoute("POST","/qt-shop/order/create",global.Cabin.addOrder),e.expressRoute("POST","/qt-shop/order/list",global.Cabin.getOrderListByHouseId),console.log(e.cabinInfo)}catch(l){console.log(l.message),process.exit()}}Te();
