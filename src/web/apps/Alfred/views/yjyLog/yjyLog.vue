<template>
    <div>
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <div>
            <v-btn class="mr-2" color="orange" @click.stop="renderLogs">刷新</v-btn>
        </div>
        <!-- List -->
        <!-- List -->
        <!-- List -->
        <!-- List -->
        <v-simple-table fixed-header height="700px" dense>
            <thead>
                <tr>
                    <th>IP地址</th>
                    <th>创建时间</th>
                    <th>内容</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.account">
                    <td>{{ item.ip }}</td>
                    <td style="min-width: 200px;">{{ item.timeCreateChinese }}</td>
                    <td>{{ item.message }}</td>
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
                    $tip('获取日志成功')
                    $load.hide()
                } catch (error) {
                    $common.loadOff(error)
                }
            },
        },
    }
</script>
<style lang="scss" scoped></style>
