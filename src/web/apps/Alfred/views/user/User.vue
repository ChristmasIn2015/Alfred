<template>
    <div>
        <v-simple-table fixed-header dense height="700px">
            <thead>
                <tr>
                    <th>账号</th>
                    <th>昵称</th>
                    <th>注册时间</th>
                    <th>上次登陆时间</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.account">
                    <td>{{ item.account }}</td>
                    <td>{{ item.nickname }}</td>
                    <td>{{ item.timeCreateChinese }}</td>
                    <td>{{ item.timeUpdateChinese }}</td>
                </tr>
            </tbody>
        </v-simple-table>
    </div>
</template>
<script>
    import { getUserList } from '@/web/apps/Alfred/module/api.js'
    export default {
        data() {
            return {
                list: [],
            }
        },
        mounted() {
            this.renderUsers() // ASYNC
        },
        methods: {
            async renderUsers() {
                try {
                    $load.show()
                    let users = await getUserList()
                    this.list = Object.assign([], users)
                    $load.hide()
                } catch (error) {
                    $common.loadOff(error)
                }
            },
        },
    }
</script>
<style lang="scss" scoped></style>
