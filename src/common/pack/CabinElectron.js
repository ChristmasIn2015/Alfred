var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// src/common/ts/CabinElectron.ts
__markAsModule(exports);
__export(exports, {
  default: () => CabinElectron_default
});
var CabinElectron = class {
  constructor(SOCKET_NUMBER) {
    this.info = {};
    this.communication = null;
  }
};
var CabinElectron_default = CabinElectron;
