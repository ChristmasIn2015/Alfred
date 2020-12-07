<template>
    <div id="app">
        <div style="width: 100px; height: 100px; background-color: red;" @click.stop="openDevTool"></div>
        <div>1222222</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            console.log('this is electron')
            // const e = require('electron')
            // console.log('typeof electron', typeof e)
        },
        methods: {
            openDevTool() {
                console.log('openDevTool')
                $electron.ipcRenderer.send('openDevTool', Math.random())
            },
        },
    }
</script>
<style></style>
