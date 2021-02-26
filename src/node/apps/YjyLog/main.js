var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
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
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

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
  async fetch(url, method, params, config) {
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
    this.BinderMap = new Map();
    this.bindClass(this, "Log", Log_default);
    this.bindClass(this, "Requester", Requester_default);
    this.bindClass(this, "UtilsTime", UtilsTime_default);
    this.bindClass(this, "UtilsVaild", UtilsVaild_default);
    this.bindClass(this, "UtilsCalculation", UtilsCalculation_default);
  }
  bindClass(Target, OriginName, Origin) {
    if (Origin instanceof Function) {
      Target.BinderMap.set(OriginName, new Origin());
      Object.getOwnPropertyNames(Origin.prototype).forEach((FunctionName) => {
        if (FunctionName === "constructor")
          return;
        Target[FunctionName] = (...args) => {
          const ORIGIN = Target.BinderMap.get(OriginName);
          return ORIGIN[FunctionName].apply(ORIGIN, args);
        };
      });
    }
  }
};

// src/common/modules/Utils/UtilsReactNode.ts
var UtilsNodeReact = class {
  constructor() {
    this.IPv4 = null;
    this.IPv4 = this.getIPv4();
  }
  AlfredLogin() {
    const IPv4 = this.IPv4;
    return (target, propertyKey, descriptor) => {
      const sourceFunction = descriptor.value;
      descriptor.value = async function(...args) {
        const request = args[0];
        const response = args[1];
        try {
          let data = await global["$common"].fetch(`http://${IPv4}:80/alfred/user/info`, "POST", null, {
            authorization: request.header("authorization")
          });
          if (data.code !== 200)
            throw new Error(`${data.message}(code:${data.code})`);
          await sourceFunction.apply(this, args);
        } catch (error) {
          response.send({
            code: null,
            data: null,
            message: `\u767B\u5F55\u4FE1\u606F\u5F02\u5E38: ${error.message}`
          });
        }
      };
    };
  }
  Response(answer = "") {
    return (target, propertyKey, descriptor) => {
      const sourceFunction = descriptor.value;
      descriptor.value = async function(...args) {
        let result = {
          code: null,
          data: null,
          message: ""
        };
        try {
          let data = await sourceFunction.apply(this, args);
          result.code = 200;
          result.data = data || answer;
        } catch (error) {
          result.message = error.message || error;
        } finally {
          const response = args[1];
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
    this.VUE_PATH = require("path").join(process.cwd(), "./src/web/dist");
    this.BinderMap = new Map();
    this.cabinDB = null;
    this.cabinHandler = null;
    this.cabinInfo = null;
    this.BODY_PARSE = require("body-parser");
    this.EXPRESS = require("express");
    this.EXPRESS_PROXY = require("http-proxy-middleware").createProxyMiddleware;
    this.EXPRESS_AHTHO = {};
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
      this.cabinHandler.use(this.EXPRESS.static(this.VUE_PATH));
      this.cabinHandler.listen(SOCKET_NUMBER, "0.0.0.0");
    }
  }
  expressProxy(proxyRoute, target) {
    const option = {target, changeOrigin: true};
    this.cabinHandler.use(proxyRoute, this.EXPRESS_PROXY(option));
  }
  expressHtml(route, indexPath) {
    if (!this.cabinInfo.SOCKET_NUMBER)
      return;
    this.cabinHandler.get(route, (request, response) => response.sendFile(indexPath));
  }
  expressRoute(method, route, next) {
    if (!this.cabinInfo.SOCKET_NUMBER)
      return;
    switch (method) {
      case "GET":
        this.cabinHandler.get(route, (request, response) => next(request, response));
        break;
      case "POST":
        this.cabinHandler.post(route, this.BODY_PARSE.json(), (request, response) => next(request, response));
        break;
    }
  }
};
var CabinExpress_default = CabinExpress;

// src/node/apps/YjyLog/dispatchers/Yjy_Log.ts
var Response = global["$common"].Response;
var AlfredLogin = global["$common"].AlfredLogin;
var Yjy_Log = class {
  constructor() {
  }
  async createLog(request, response) {
    await global["$db"].Log.create({
      ip: request.ip,
      message: request.body.message
    });
  }
  async getLogs(request, response) {
    let list = await global["$db"].Log.query({});
    list = list.reverse().slice(0, 50);
    list.forEach((e) => {
      e["timeCreateChinese"] = new Date(e.timeCreate).toLocaleString();
      e["timeUpdateChinese"] = new Date(e.timeUpdate).toLocaleString();
    });
    return list;
  }
};
__decorate([
  Response("\u6DFB\u52A0\u65E5\u5FD7\u6210\u529F")
], Yjy_Log.prototype, "createLog", 1);
__decorate([
  AlfredLogin(),
  Response()
], Yjy_Log.prototype, "getLogs", 1);
var Yjy_Log_default = Yjy_Log;

// src/node/apps/YjyLog/main.ts
async function go() {
  try {
    const SOCKET_NUMBER = parseInt(process.argv[2]);
    if (!SOCKET_NUMBER)
      throw new Error(`Please chose your socket number, now is ${SOCKET_NUMBER}`);
    let Cabin = new CabinExpress_default();
    await Cabin.dbLink("mongodb://127.0.0.1:27017/YjyLog");
    await Cabin.dbTabler([
      {name: "Log", struct: {ip: "string", message: "object"}}
    ]);
    global["$common"].bindClass(Cabin, "Yjy_Log", Yjy_Log_default);
    Cabin.express(SOCKET_NUMBER, "YjyLog");
    global["Cabin"] = Cabin;
    Cabin.expressRoute("POST", "/yjy-log/create", global["Cabin"].createLog);
    Cabin.expressRoute("GET", "/yjy-log/list", global["Cabin"].getLogs);
    console.log(Cabin.cabinInfo);
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
}
go();
