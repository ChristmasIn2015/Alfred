var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
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

// src/common/ts/CabinExpress.ts
__markAsModule(exports);
__export(exports, {
  default: () => CabinExpress_default
});

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
    this.NODE_WEBSOCKET = require("nodejs-websocket");
    this.NODE_WEBSOCKET_ConnectionMAP = {};
    this.NODE_WEBSOCKET_OrderMAP = {};
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
  websocket(SOCKET_NUMBER, APP_NAME) {
    this.cabinInfo = {
      CabinHandler: "websocket",
      APP_NAME,
      IPv4: global["$common"].getIPv4(),
      SOCKET_NUMBER
    };
    return new Promise((resolve, reject) => {
      if (!SOCKET_NUMBER) {
        reject(`\u8BF7\u9009\u62E9\u7AEF\u53E3\u53F7:${SOCKET_NUMBER}`);
        return;
      }
      this.cabinHandler = this.NODE_WEBSOCKET.createServer((connection) => {
        const KEY = connection.key;
        this.NODE_WEBSOCKET_ConnectionMAP[KEY] = connection;
        connection.on("text", async (order) => {
          try {
            if (typeof order !== "string")
              return;
            order = JSON.parse(order);
            order["connectionKey"] = KEY;
            const next = this.NODE_WEBSOCKET_OrderMAP[order.orderName];
            if (!order.orderName || !next)
              return;
            let info = await next(order);
            console.log(info);
          } catch (error) {
            console.log(error);
          }
        });
        connection.on("close", (code) => {
          delete this.NODE_WEBSOCKET_ConnectionMAP[KEY];
        });
        connection.on("error", (code) => {
          delete this.NODE_WEBSOCKET_ConnectionMAP[KEY];
        });
        const SUCCESS = {connectionKey: KEY, orderName: "/success", DTO: {}};
        this.websocketAnswer(SUCCESS);
      });
      this.cabinHandler.listen(SOCKET_NUMBER);
      resolve(true);
    });
  }
  websocketRoute(orderName, next) {
    if (!orderName)
      return;
    this.NODE_WEBSOCKET_OrderMAP[orderName] = next;
  }
  websocketAnswer(order) {
    const connection = this.NODE_WEBSOCKET_ConnectionMAP[order.connectionKey];
    if (!connection)
      return;
    connection.sendText(JSON.stringify(order));
  }
  websocketBoardCast(order) {
  }
};
var CabinExpress_default = CabinExpress;
