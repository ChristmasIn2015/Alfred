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
        try {
            await this.initUserInfo() // @Login
            this.renderShopList() // @Shop
        } catch (error) {
            $common.loadOff(error)
        }
    }

    // * 登录框点击确定
    async loginConfirm() {
        try {
            await this.postLogin() // Login
            await this.renderShopList() // @Shop
        } catch (error) {
            $common.loadOff(error)
        }
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
        try {
            $store.commit('setShopInfo', shop)
            $store.commit('clearHouseInfo')
            this.employeeList = [] // @Employee
            this.renderHouseList() // @House
        } catch (error) {
            $common.loadOff(error)
        }
    }
    // * 选择仓库
    pickHouse(house) {
        try {
            if (!$store.state.shopInfo._id) return
            $store.commit('setHouseInfo', house)
            this.renderEmployeeList() // @Employee
        } catch (error) {
            $common.loadOff(error)
        }
    }
}
