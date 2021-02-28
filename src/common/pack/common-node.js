var B=Object.create,u=Object.defineProperty,O=Object.getPrototypeOf,E=Object.prototype.hasOwnProperty,A=Object.getOwnPropertyNames,L=Object.getOwnPropertyDescriptor;var k=s=>u(s,"__esModule",{value:!0});var C=(s,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of A(e))!E.call(s,r)&&r!=="default"&&u(s,r,{get:()=>e[r],enumerable:!(t=L(e,r))||t.enumerable});return s},I=s=>s&&s.__esModule?s:C(k(u(s!=null?B(O(s)):{},"default",{value:s,enumerable:!0})),s);var g=class{constructor(){this.isDebug=!0}toggleDebug(){this.isDebug=!this.isDebug}async log(e){try{this.isDebug&&await global.$common.fetch("http://192.168.0.102/yjy-log/create","POST",{message:e})}catch(t){console.log(t)}}},y=g;var m=I(require("axios")),T;(function(s){s.GET="GET",s.POST="POST"})(T||(T={}));var w=class{constructor(e,t){this.BASE_URL=e;this.COMPLETE=t;this.DEFAULT_HEADER={};this.BASE_URL=e,this.COMPLETE=t}async request(e,t,r,n){try{let o=await m.default({method:e,url:this.BASE_URL+(t||""),data:r,headers:n||this.DEFAULT_HEADER||{}});return await this.COMPLETE(o.data)}catch(o){throw o}}},d=class{constructor(){}getRequester(e,t){return new w(e,t)}async fetch(e,t,r,n){return(await m.default({method:t,url:e,data:r,headers:n})).data}},$=d;var h=class{constructor(){}getTimeDTO(){return{year:"",day:"",hour:"",min:"",sec:"",full:"",week:""}}getYYMMDD(e=Date.now()){let t="";return new Date(e).toLocaleDateString().split("/").forEach(r=>t+=Number(r)<10?`/0${r}`:`/${r}`),t.replace("/","")}getYY(e=Date.now()){return new Date(e).getFullYear().toString()}getMM(e=Date.now()){let t=new Date(e).getMonth()+1;return(t<10?`0${t}`:t).toString()}getDD(e=Date.now()){let t=new Date(e).getDate();return(t<10?`0${t}`:t).toString()}getHHMMSS(e=Date.now()){let t=null,r=new Date(e);return t=this.getTimeDTO(),t.hour=r.getHours()<10?`0${r.getHours()}`:r.getHours().toString(),t.min=r.getMinutes()<10?`0${r.getMinutes()}`:r.getMinutes().toString(),t.sec=r.getSeconds()<10?`0${r.getSeconds()}`:r.getSeconds().toString(),t.full=`${t.hour}:${t.min}:${t.sec}`,t}getFullTime(e=Date.now()){let t=this.getHHMMSS();return t.year=new Date(e).getFullYear().toString(),t.full=`${t.year} ${t.full}`,t}getTimeGap(e=Date.now()+864e5){let t=null,r=e-Date.now();if(r>0){t=this.getTimeDTO();let n=~~(r/1e3/60/60)%24;t.hour=n<10?`0${n}`:n.toString();let o=~~(r/1e3/60)%60;t.min=o<10?`0${o}`:o.toString();let a=~~(r/1e3)%60;t.sec=a<10?`0${a}`:a.toString(),t.full=`${t.hour}:${t.min}:${t.sec}`}return t}getChineseWeek(e=Date.now()){let t="";switch(new Date(e).getDay()){case 1:t="\u5468\u4E00";break;case 2:t="\u5468\u4E8C";break;case 3:t="\u5468\u4E09";break;case 4:t="\u5468\u56DB";break;case 5:t="\u5468\u4E94";break;case 6:t="\u5468\u516D";break;case 0:t="\u5468\u65E5";break}return t}},M=h;var p=class{constructor(){}isValidMobile(e){return/^[1][0-9]{10}$/.test(e)}isValidEmail(e){return/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(e)}},P=p;var b=class{constructor(){}getLatLngDistance(e,t,r,n){let o=e*Math.PI/180,a=r*Math.PI/180,c=o-a,i=t*Math.PI/180-n*Math.PI/180,l=2*Math.asin(Math.sqrt(Math.pow(Math.sin(c/2),2)+Math.cos(o)*Math.cos(a)*Math.pow(Math.sin(i/2),2)));return l=l*6378.137,l=Math.round(l*1e4)/1e4,l.toFixed(2)}wannaObject(e,t){return e}},x=b;var D=class{constructor(){this.BinderMap=new Map;this.bindClass(this,"Log",y),this.bindClass(this,"Requester",$),this.bindClass(this,"UtilsTime",M),this.bindClass(this,"UtilsVaild",P),this.bindClass(this,"UtilsCalculation",x)}bindClass(e,t,r){r instanceof Function&&(e.BinderMap.set(t,new r),Object.getOwnPropertyNames(r.prototype).forEach(n=>{n!=="constructor"&&(e[n]=(...o)=>{let a=e.BinderMap.get(t);return a[n].apply(a,o)})}))}};var f=class{constructor(){this.IPv4=null;this.IPv4=this.getIPv4()}AlfredLogin(){let e=this.IPv4;return(t,r,n)=>{let o=n.value;n.value=async function(...a){let c=a[0],i=a[1];try{let l=await global.$common.fetch(`http://${e}:80/alfred/user/info`,"POST",null,{authorization:c.header("authorization")});if(l.code!==200)throw new Error(`${l.message}(code:${l.code})`);await o.apply(this,a)}catch(l){i.send({code:null,data:null,message:`\u767B\u5F55\u4FE1\u606F\u5F02\u5E38: ${l.message}`})}}}}AlfredLoginWS(){let e=this.IPv4;return(t,r,n)=>{let o=n.value;n.value=async function(...a){let c=a[0];try{let i=await global.$common.fetch(`http://${e}:80/alfred/user/info`,"POST",null,{});if(i.code!==200)throw new Error(`${i.message}(code:${i.code})`);await o.apply(this,a)}catch(i){global.$common.log(i.message),console.log(i.message)}}}}Response(e=""){return(t,r,n)=>{let o=n.value;n.value=async function(...a){let c={code:null,data:null,message:""};try{let i=await o.apply(this,a);c.code=200,c.data=i||e}catch(i){c.message=i.message||i}finally{a[1].send(c)}}}}getIPv4(){let e=null;if(global.process.platform==="win32"){let t=require("os").networkInterfaces();for(let r in t)if(r==="\u4EE5\u592A\u7F51"||r==="WLAN"){for(let n in t[r]){let o=t[r][n];if(o.family==="IPv4"){e=o.address;break}}break}}return e}printRed(e){console.log(`[41m[30m${e}[0m`)}printYellow(e){console.log(`[43m[30m${e}[0m`)}printBlue(e){console.log(`[44m[37m${e}[0m`)}printGreen(e){console.log(`[42m[30m${e}[0m`)}printLink(e){console.log(`[34m${e}[0m`)}printText(e){console.log(`[33m${e}[0m`)}},S=f;var v=class extends D{constructor(){super();this.bindClass(this,"UtilsReactNode",S)}};global.$common=new v;
