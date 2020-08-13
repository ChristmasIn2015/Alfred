<template>
    <div class="index">
        <div class="title">员工列表</div>
        <p>
            <span>店内员工</span>
        </p>
        <div class="table">
            <div class="row flex">
                <div class="column">Id</div>
                <div class="column">姓名</div>
                <div class="column">手机号</div>
                <div class="column" style="width: 100%;"></div>
                <div class="column"></div>
            </div>
            <div class="row flex" v-for="(employee, index) in employeeList" :key="index">
                <div class="column" v-for="(value, key) in employee" :key="key">{{ value }}</div>
                <div class="column" style="width: 100%;"></div>
                <div class="column">
                    <div class="sj-link" style="color: red;">删除</div>
                </div>
            </div>
        </div>
        <p>
            <span>待审批</span>
        </p>
        <div class="table">
            <div class="row flex">
                <div class="column">Id</div>
                <div class="column">姓名</div>
                <div class="column">手机号</div>
                <div class="column" style="width: 100%;"></div>
                <div class="column"></div>
                <div class="column"></div>
            </div>
            <div class="row flex" v-for="(employee, index) in employeeList" :key="index">
                <div class="column" v-for="(value, key) in employee" :key="key">{{ value }}</div>
                <div class="column" style="width: 100%;"></div>
                <div class="column">
                    <div class="sj-link" style="color: red;">删除</div>
                </div>
                <div class="column">
                    <div class="sj-link">录用</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                employeeList: [
                    { id: -1, name: '员工A', phone: -1 },
                    { id: -1, name: '员工A', phone: -1 },
                    { id: -1, name: '员工A', phone: -1 },
                    { id: -1, name: '员工A', phone: -1 },
                ],
            }
        },
        computed: {
            userInfo() {
                let info = this.$store.getters.getUserInfo
                return info
            },
        },
        created() {},
        methods: {
            // * 初始化员工信息
            initNowEmployee() {
                this.nowShopId = this.userInfo.nowShopInfo.id
            },
        },
    }
</script>

<style lang="scss" scoped>
@import "boardPublic.scss";
    .index {
        margin: 1rem;
        padding: 1rem;
        background-color: $sj-white;
    }
</style>
