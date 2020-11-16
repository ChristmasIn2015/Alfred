<template>
    <div id="app" class="no-scroll-bar">
        <div class="app-container">
            <ButtonGroup style="margin-bottom: 1rem;">
                <Button
                    type="primary"
                    v-for="(side, index) in model.sideList"
                    :key="index"
                    :ghost="model.sideIndex !== index"
                    @click.stop="model.pickSide(index)"
                >
                    <Icon :type="side.icon" />
                    <span>{{ side.name }}</span>
                </Button>
            </ButtonGroup>
            <Employee v-show="model.sideIndex === 0" />
            <House v-if="model.sideIndex === 1" />
            <Order v-if="model.sideIndex === 2" />
        </div>
    </div>
</template>

<script>
    import Model from './Model.js'
    import Employee from '../Employee/Employee.vue'
    import House from '../House/House.vue'
    import Order from '../Order/Order.vue'
    export default {
        beforeCreate() {
            window.$load = {
                show: () =>
                    this.$Message.loading({
                        content: '请稍后',
                        duration: 0,
                    }),
                hide: () => this.$Message.destroy(),
            }
            window.$tip = (message) =>
                this.$Message['success']({
                    background: true,
                    content: message,
                })
            window.$warn = (message) =>
                this.$Notice.warning({
                    title: message,
                })
            window.$confirm = (message, next) => {
                this.$Modal.confirm({
                    title: message,
                    onOk: next,
                    okText: '确定',
                    cancelText: '取消',
                })
            }
        },
        data() {
            return {
                model: new Model(),
            }
        },
        computed: {
            userInfo() {
                return this.$store.state.userInfo
            },
            shopInfo() {
                return this.$store.state.shopInfo
            },
            houseInfo() {
                return this.$store.state.houseInfo
            },
        },
        components: {
            Employee,
            House,
            Order,
        },
        methods: {},
    }
</script>

<style lang="scss">
    @import '@/public/css/default.scss';
    #app {
        padding: 3rem 0rem;
        background-color: $back-higher;
        .app-container {
            background-color: $back;
            margin: 0rem 3rem;
            border-radius: 1rem;
            height: 100%;
            overflow: hidden;
        }
    }
</style>
