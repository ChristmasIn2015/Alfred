<template>
    <div>
        <v-simple-table fixed-header height="700px">
            <thead>
                <tr>
                    <th>创建时间</th>
                    <th>IP地址</th>
                    <th>内容</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.account">
                    <td>{{ item.timeCreateChinese }}</td>
                    <td>{{ item.ip }}</td>
                    <td style="width: 70%;">{{ item.message }}</td>
                </tr>
                <tr v-for="item in list" :key="item.account">
                    <td>{{ item.timeCreateChinese }}</td>
                    <td>{{ item.ip }}</td>
                    <td style="width: 70%;">{{ item.message }}</td>
                </tr>
                <tr v-for="item in list" :key="item.account">
                    <td>{{ item.timeCreateChinese }}</td>
                    <td>{{ item.ip }}</td>
                    <td style="width: 70%;">{{ item.message }}</td>
                </tr>
            </tbody>
        </v-simple-table>
    </div>
</template>
<script>
    import { getYjyLogs } from '@/web/apps/Alfred/module/api.js'
    export default {
        data() {
            return {
                list: [],
            }
        },
        mounted() {
            this.renderLogs() // ASYNC
        },
        methods: {
            async renderLogs() {
                try {
                    $load.show()
                    let logs = await getYjyLogs()
                    this.list = Object.assign([], logs)
                    $load.hide()
                } catch (error) {
                    $common.loadOff(error)
                }
            },
        },
    }
</script>
<style lang="scss" scoped></style>
