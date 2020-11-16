import { EmployeeParams, EmployeeFunc } from '../../model/Employee.js'
import { LoginParams, LoginFunc } from '../../model/Login.js'
import { ShopParams, ShopFunc } from '../../model/Shop.js'
import { HouseParams, HouseFunc } from '../../model/House.js'

@HouseFunc
@ShopFunc
@LoginFunc
@EmployeeFunc
export default class Model {
    constructor() {
        this.init()
    }
    // *
    @LoginParams
    @ShopParams
    @HouseParams
    @EmployeeParams
    async init() {
        await this.initUserInfo() // @Login
        this.renderShopList() // @Shop
    }

    // * 登录框点击确定
    async loginConfirm() {
        await this.postLogin()
        this.renderShopList() // @Shop
    }
    // * 注销登录
    reLogin() {
        if (this.iAmLogined()) this.clearUserInfo() // @Login
        this.houseList = [] // @House
        this.employeeList = [] // @Employee
        $store.commit('clearShopInfo')
    }
    // * 选择店铺
    pickShop(shop) {
        $store.commit('setShopInfo', shop)
        $store.commit('clearHouseInfo')
        this.employeeList = [] // @Employee
        this.renderHouseList() // @House
    }
    // * 选择仓库
    pickHouse(house) {
        if (!$store.state.shopInfo._id) return
        $store.commit('setHouseInfo', house)
        this.renderEmployeeList() // @Employee
    }
}
