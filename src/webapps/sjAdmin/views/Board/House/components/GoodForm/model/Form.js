export function FormParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        // *
        this.formShow = false
        // *
        this._id = -1
        this.name = ''
        this.cost = 0
        this.tip = ''
        this.plugList = []
        this.plugListChecked = []
        this.countList = []
        // *
        this.goodNameList = []
        // *
        sourceFunction.apply(this, arguments)
    }
}
export function FormFunc(TargetClass) {
    // *
    TargetClass.prototype.initForm = initForm
    TargetClass.prototype.toggleForm = toggleForm
    TargetClass.prototype.toggleCountListCheck = toggleCountListCheck
    TargetClass.prototype.getFormData = getFormData
}
// * 初始化表单
function initForm(goodForm) {
    if (goodForm) {
        this._id = goodForm._id
        this.name = goodForm.name
        this.cost = goodForm.cost
        this.tip = goodForm.tip

        // * @Tag
        this.renderPlugList(() => {
            let tempMap = {}
            goodForm.plugList.forEach((e) => (tempMap[e._id] = true))
            this.plugList.forEach((e) => (e.checked = tempMap[e._id] || false))
            this.plugListChecked = Object.assign([], goodForm.plugList)
        }) //

        // *
        let list = []
        goodForm.countList.forEach((e) => {
            e['checked'] = true
            list.push(e)
        })
        this.newCountTag.name = list[0].name
        this.newCountTag.value = list[0].value
        this.countList = Object.assign([], list)
    } else {
        this._id = -1
        this.name = ''
        this.cost = ''
        this.tip = ''
        this.plugList = []
        this.plugListChecked = []
        this.countList = []
        this.renderPlugList() // @Tag
    }
}
// * 展开表单
function toggleForm($event, goodForm, goodNameList) {
    this.initForm(goodForm)
    this.formShow = !this.formShow
    // *
    if (goodNameList) this.goodNameList = Object.assign([], goodNameList)
}
// *
function toggleCountListCheck(tag) {
    tag.checked = !tag.checked
    this.countList = Object.assign([], this.countList)
}
// *
function getFormData() {
    let plugList1 = []
    this.plugList.forEach((e) => (e.checked ? plugList1.push(e) : ''))
    let countList1 = []

    // * 201008
    this.countList = [
        {
            name: this.newCountTag.name,
            value: this.newCountTag.value,
            checked: true,
        },
    ]
    if (!this.newCountTag.name || !this.newCountTag.value) this.countList = []

    this.countList.forEach((e) => (e.checked ? countList1.push(e) : ''))
    let params = {
        _id: this._id,
        name: this.name,
        cost: this.cost,
        tip: this.tip,
        plugList: plugList1,
        countList: countList1,
    }

    let charge = ''
    if (!params.name) charge = '请输入商品名称'
    if (!params.countList.length) charge = '请选择计量单位'
    if (charge) $tip(charge)
    return charge || params
}
