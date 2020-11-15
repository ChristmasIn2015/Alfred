export function ReactParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // ************************* 侧边栏控制
        this.sideList = [
            { name: '员工管理', icon: 'ios-people' },
            { name: '库存管理', icon: 'md-home' },
            { name: '订单管理', icon: 'ios-paper' },
        ]
        this.sideIndex = -1
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
export function ReactFunc(TargetClass) {
    TargetClass.prototype.pickSide = pickSide
}
// * 侧边栏点击项目
function pickSide(index) {
    if (!this.iAmLogined()) return // @React

    // 所有选项必须有店铺信息
    if (!$store.state.shopInfo._id) {
        $warn('请选择店铺')
        this.toggleShopModal() // @Shop
        return
    }

    // // 仓库管理 开单 订单管理必须选择了仓库
    if (index > 0 && !$store.state.houseInfo._id) {
        $warn('请选择仓库')
        this.toggleHouseModal() // @House
        return
    }

    // *
    this.sideIndex = index
}
