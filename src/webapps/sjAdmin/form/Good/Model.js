export default class Model {
    constructor() {
        // * 表单控制
        this.plugTagEdit = false
        this.countTagEdit = false
        this.newPlugTag = {
            value: '',
            name: '',
        }
        this.newCountTag = {
            value: '',
            name: '',
        }
        // * 弹窗
        this.formShow = false
        this.initForm()
    }
    // * 初始化表单
    initForm(goodForm) {
        if (goodForm) {
            this._id = goodForm._id
            this.name = goodForm.name
            this.cost = goodForm.cost
            this.tip = goodForm.tip

            // *
            this.renderPlugList(() => {
                let tempMap = {}
                goodForm.plugList.forEach((e) => (tempMap[e._id] = true))
                this.plugList.forEach((e) => (e.checked = tempMap[e._id] || false))
            })

            // *
            let list = []
            goodForm.countList.forEach((e) => {
                e['checked'] = true
                list.push(e)
            })
            this.countList = Object.assign([], list)
        } else {
            this._id = -1
            this.name = ''
            this.cost = 0
            this.tip = ''
            this.plugList = []
            this.countList = []
            this.renderPlugList() // ASYNC
        }
    }
    // * 展开表单
    toggleForm($event, goodForm) {
        this.initForm(goodForm)
        this.formShow = !this.formShow
    }
    // * 获取渲染规格标签列表
    @$common.tryCatchDecorator
    async renderPlugList(next) {
        let params = { goodId: -1 }
        let data = await $common.myFetch('/sjShop/tag/list', 'POST', params, $common.getHeader())
        if (data.code !== 200) throw new Error(data.message)
        data.data.forEach((e) => (e['checked'] = false))
        this.plugList = Object.assign([], data.data)
        if (next) next()
    }
    toggleCountListCheck(tag) {
        tag.checked = !tag.checked
        this.countList = Object.assign([], this.countList)
    }
    // * POST一个标签
    @$common.tryCatchDecorator
    async postMyTag() {
        let params = {
            goodId: -1,
            name: this.newPlugTag.name,
            value: this.newPlugTag.value,
        }
        let data = await $common.myFetch('/sjShop/tag/create', 'POST', params, $common.getHeader())
        if (data.code !== 200) throw new Error(data.message)
        this.renderPlugList() //async
        $tip('添加成功')
    }
    // * 新增计量标签
    @$common.tryCatchDecorator
    async postMyCountTag() {
        if (this._id) {
            // 1.新增一个标签
            let params = {
                goodId: this._id,
                name: this.newCountTag.name,
                value: this.newCountTag.value,
            }
            let data = await $common.myFetch('/sjShop/tag/create', 'POST', params, $common.getHeader())
            if (data.code !== 200) throw new Error(data.message)
        } else {
            this.countList.push({
                name: this.newCountTag.name,
                value: this.newCountTag.value,
                checked: false,
            })
        }
        $tip('添加成功')
    }
    deleteTag(index, type) {
        // 0.规格
        if (type === 0) {
            let query = {
                title: '警告',
                content: '警告：删除规格会导致所有店铺/仓库下包含这个标签的商品，失去这个标签，确定要这样做吗',
            }
            $confirm(query, async (answer) => {
                try {
                    if (!answer) return
                    let params = { tagId: this.plugList[index]._id }
                    let data = await $common.myFetch('/sjShop/tag/delete', 'POST', params, $common.getHeader())
                    if (data.code !== 200) throw new Error(data.message)
                    this.renderPlugList() //async
                    $tip('删除成功')
                } catch (error) {
                    $common.loadToastWarn(error)
                }
            })
        }
        // 1.计量
        if (type === 1) {
            if (!this.countList[index]._id) this.countList.splice(index, 1)
        }
    }
}
