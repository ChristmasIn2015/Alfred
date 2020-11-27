export default function GoodFilter(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // * 参数
        this.filterKey = ''
        this.goodNameList = []
        this.filterTimer = null
        // * 方法
        this.renderGoodNameList = renderGoodNameList
        this.pickGoodName = pickGoodName
        this.filterGoodList = filterGoodList
        this.filterClear = filterClear
        //
        sourceFunction.apply(this, arguments)
    }
}
// goodList 去重
function renderGoodNameList() {
    let mySet = new Set()
    this.goodList.forEach((e) => mySet.add(e.name))
    this.goodNameList = Array.from(mySet).map((e) => {
        return { name: e, checked: false }
    })
}
// 按商品名称筛选
function pickGoodName(index) {
    let target = this.goodNameList[index]
    target['checked'] = !target['checked']
    this.goodNameList = Object.assign([], this.goodNameList)
    this.filterGoodList()
}
function filterGoodList() {
    if (this.filterTimer) clearTimeout(this.filterTimer)
    this.filterTimer = setTimeout(() => {
        $load.show()
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
        if (allFalse) list = Object.assign([], this.goodSourceList)

        // * 规格筛选
        let list2 = []
        if (this.filterKey) {
            for (let i = 0; i < list.length; i++) {
                for (let j = 0; j < list[i].plugList.length; j++) {
                    let plug = list[i].plugList[j]
                    if ((plug.value + plug.name).includes(this.filterKey)) {
                        list2.push(list[i])
                        break
                    }
                }
            }
        } else {
            list2 = list
        }
        this.goodList = Object.assign([], list2)
    }, 255)
}
// 清空筛选
async function filterClear() {
    try {
        this.filterKey = ''
        this.renderGoodList() // @Good
        this.renderGoodNameList() // @GoodFilter
    } catch (error) {
        $common.loadOff(error)
    }
}
