<template>
    <div>
        <div v-for="(item, i) in list" :key="i">I am Welcome =>{{ i }}</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: new Array(100).fill(true),
            }
        },
        methods: {},
        beforeCreate() {},
    }
</script>
<style lang="scss" scoped></style>
