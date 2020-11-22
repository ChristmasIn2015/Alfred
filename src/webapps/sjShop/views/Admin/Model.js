export default class Model {
    constructor() {
        this.init()
    }
    // *
    init() {
        document.title = ''
        this.sideList = [
            { name: '员工管理', icon: 'ios-people' },
            { name: '库存管理', icon: 'md-home' },
            { name: '订单管理', icon: 'ios-paper' },
        ]
        this.sideIndex = 0
    }

    //
    pickSide(index) {
        if (!$store.state.userInfo._id) {
            $warn('请先登录')
            return
        }

        // 所有选项必须有店铺信息
        if (!$store.state.shopInfo._id) {
            $warn('请选择店铺')
            index = 0
        }

        // // 仓库管理 开单 订单管理必须选择了仓库
        if (index > 0 && !$store.state.houseInfo._id) {
            $warn('请选择仓库')
            index = 0
        }

        // *
        this.sideIndex = index
    }
}
