<template>
    <transition name="fade">
        <div class="sj-modal" v-show="visible" @click.stop="visible = false">
            <div class="sj-modal-title"></div>
            <div class="sj-modal-content"></div>
            <div class="sj-modal-footer"></div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'sjModal',
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: '',
            },
        },
        watch: {
            value(newVal, oldVal) {
                console.log('newVal', newVal, oldVal)
                this.visible = newVal
            },
        },
        data() {
            return {
                visible: false,
            }
        },
        computed: {},
        methods: {},
    }
</script>

<style lang="scss" scoped>
    .sj-modal {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>
