<template>
    <div>
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <!-- Nav -->
        <div>
            <v-btn class="ma-1 ml-0" small color="#F44336">客户管理</v-btn>
            <v-btn class="ma-1 ml-0" small color="#64B5F6">商品管理</v-btn>
        </div>
        <v-divider></v-divider>
    </div>
</template>
<script>
    import ReactSaleCenter from './React.js'
    export default {
        data() {
            return {
                react: new ReactSaleCenter(),
            }
        },
        methods: {},
        beforeCreate() {},
    }
</script>
<style lang="scss"></style>
