import CenterOrder from '@/web/apps/QtShop/module/CenterOrder.js'
//
export default class ReactOrderCenter {
    constructor() {
        //
        this.initReact() // ASYNC
    }

    @CenterOrder
    async initReact() {
        try {
            $load.show()
            await this.renderOrderList()
            $load.hide()
        } catch (error) {
            $common.loadOff(error)
            if (error.message === '请选择仓库') {
                $load.show()
                setTimeout(() => {
                    $router.push({ path: '/hall/center' })
                    $load.hide()
                }, 1000)
            }
        }
    }
}
