<template>
    <div>
        <v-dialog v-model="react.goodListModal" fullscreen transition="dialog-bottom-transition">
            <v-sheet class="pa-4 overflow-y-auto" height="700px">
                <div class="d-flex align-center mb-4">
                    <v-spacer></v-spacer>
                    <v-btn class="mr-2" small color="#64B5F6" @click.stop="react.toggleGoodModelList">添加</v-btn>
                    <v-btn class="mr-2" small color="#64B5F6" @click.stop="pickGood">使用选中的商品</v-btn>
                    <v-btn small color="#64B5F6" text @click.stop="react.toggleGoodList">取消</v-btn>
                </div>
                <!-- 商品表格 -->
                <!-- 商品表格 -->
                <!-- 商品表格 -->
                <!-- 商品表格 -->
                <v-data-table
                    :headers="react.goodModelHeader"
                    :items="react.goodList"
                    item-key="_id"
                    v-model="react.goodListPicked"
                    show-select
                    height="500px"
                    dense
                    fixed-header
                >
                    <!-- 1 -->
                </v-data-table>
            </v-sheet>
        </v-dialog>
        <!-- 添加商品对话框 -->
        <!-- 添加商品对话框 -->
        <!-- 添加商品对话框 -->
        <!-- 添加商品对话框 -->
        <v-dialog v-model="react.goodModelListModal" scrollable>
            <v-card>
                <v-card-text>
                    <v-simple-table fixed-header height="600px">
                        <thead>
                            <tr>
                                <th>品名</th>
                                <th>规格</th>
                                <th>数量</th>
                                <th>单位</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(goodModel, i) in react.goodModelList" :key="i">
                                <td><v-text-field v-model="goodModel.name" dense hide-details label="品名" /></td>
                                <td><v-text-field v-model="goodModel.norm" dense hide-details label="规格" /></td>
                                <td><v-text-field v-model="goodModel.count" dense hide-details label="数量" /></td>
                                <td><v-text-field v-model="goodModel.countName" dense hide-details label="单位" /></td>
                                <td><v-text-field v-model="goodModel.remark" dense hide-details label="备注" /></td>
                                <td>
                                    <v-btn v-if="i === 0" small color="#64B5F6" @click.stop="react.createGoodModel">添加</v-btn>
                                    <v-btn v-else small color="#64B5F6" @click.stop="react.deleteGoodModel(i)">删除</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="mr-2" small color="#64B5F6" dark>下载模板</v-btn>
                    <v-file-input prepend-icon="fa-upload" label="批量添加商品" dense hide-details hide-input accept=".xlsx" @change="getGoodListByExcel" />
                    <v-spacer></v-spacer>
                    <v-btn small color="blue" text @click.stop="react.toggleGoodModelList">取消</v-btn>
                    <v-btn small color="blue" @click.stop="react.actionGood">入库</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    import GoodTableReact from './GoodTableReact.js'
    import XLSX from 'xlsx'
    export default {
        data() {
            return {
                react: new GoodTableReact(),
            }
        },
        methods: {
            pickGood() {
                this.$emit('pick', this.react.goodListPicked)
                this.react.toggleGoodList()
            },
            // 上传并渲染预入库商品列表
            getGoodListByExcel(fileByVuetify) {
                let reader = new FileReader(fileByVuetify) // WebAPI
                reader.onload = (event) => {
                    $load.show()
                    let workbook = XLSX.read(event.target.result, { type: 'binary' })
                    let rowJsonList = XLSX.utils.sheet_to_json(Object.values(workbook.Sheets)[0])
                    //
                    let goodModelList = []
                    rowJsonList.forEach((row) => {
                        goodModelList.push({
                            _id: null,
                            name: row['商品名称'],
                            norm: row['规格'],
                            count: row['数量'],
                            countName: row['单位'],
                            remark: row['备注'],
                        })
                    })
                    this.react.goodModelList = Object.assign([], goodModelList)
                    $load.hide()
                }
                reader.readAsBinaryString(fileByVuetify)
            },
        },
        beforeCreate() {},
    }
</script>
<style lang="scss"></style>
