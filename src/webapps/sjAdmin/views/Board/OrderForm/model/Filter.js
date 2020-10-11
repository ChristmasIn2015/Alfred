// *
// *
export function FilterParam(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.goodSourceList = []
        this.goodNameList = []
        this.goodPlugSearchKey = ''
        this.filterTimer = null
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
// *
// import { createOrder } from '@/webapps/sjAdmin/views/api.js'
export function FilterFunc(TargetClass) {
    TargetClass.prototype.initFilterParams = initFilterParams
    TargetClass.prototype.pickGoodName = pickGoodName
    TargetClass.prototype.filterGoodList = filterGoodList
}
function initFilterParams() {
    // * 商品名称归类
    let tempMap = {}
    let list = []
    this.goodSourceList.forEach((e) => (tempMap[e.name] = true))
    for (let key in tempMap) {
        list.push({
            name: key,
            checked: false,
        })
    }
    this.goodNameList = Object.assign([], list)
}
function pickGoodName(index) {
    let target = this.goodNameList[index]
    target.checked = !target.checked
    this.filterGoodList()
}
function filterGoodList() {
    $load.show()
    if (this.filterTimer) clearTimeout(this.filterTimer)
    this.filterTimer = setTimeout(() => {
        // * 名称筛选
        let allFalse = true
        let list = []
        for (let i = 0; i < this.goodNameList.length; i++) {
            let target = this.goodNameList[i]
            if (target.checked) {
                allFalse = false
                this.goodSourceList.forEach((e) => (e.name === target.name ? list.push(e) : ''))
            }
        }

        if (allFalse) list = this.goodSourceList
        this.goodList = Object.assign([], list)

        // * 规格筛选
        if (!this.goodPlugSearchKey) {
            $load.hide()
            return
        }
        let list2 = []
        let reg = new RegExp(this.goodPlugSearchKey)
        for (let i = 0; i < this.goodList.length; i++) {
            for (let j = 0; j < this.goodList[i].plugList.length; j++) {
                let target = this.goodList[i].plugList[j]
                if (reg.test(target.value)) {
                    list2.push(this.goodList[i])
                    break
                }
            }
        }
        this.goodList = Object.assign([], list2)
        $load.hide()
    }, 100)
}
