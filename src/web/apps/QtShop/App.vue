<template>
    <!-- Vuetify必须的根节点 v-app -->
    <v-app id="app">
        <!-- 全局UI -->
        <!-- 全局UI -->
        <!-- 全局UI -->
        <!-- 全局UI -->
        <!-- 全局UI：成功提示 -->
        <v-snackbar top right timeout="2000" color="green" v-model="react.success">{{ react.successTip }}</v-snackbar>
        <!-- 全局UI：警告提示 -->
        <v-snackbar top timeout="2000" color="red" v-model="react.warn">{{ react.warnTip }}</v-snackbar>
        <!-- 全局UI：Loadding -->
        <v-dialog v-model="react.loadding" persistent width="300">
            <v-card color="primary" dark>
                <v-card-title></v-card-title>
                <v-card-text>
                    <span>加载中, 请稍后</span>
                    <v-progress-linear indeterminate color="white"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- 全局UI：全局询问 -->
        <v-dialog v-model="react.confirm" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">{{ react.confirmTitle || '确认' }}</v-card-title>
                <v-card-text>{{ react.confirmContent || '确定要这样做吗?' }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="react.confirmAnswer(false)">取消</v-btn>
                    <v-btn color="green darken-1" text @click="react.confirmAnswer(true)">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 1.左侧菜单栏 -->
        <!-- 1.左侧菜单栏 -->
        <!-- 1.左侧菜单栏 -->
        <!-- 1.左侧菜单栏 -->
        <v-navigation-drawer app permanent>
            <v-list-item link>
                <v-list-item-content @click.stop="react.pickRoute(-1)">
                    <v-list-item-title class="title" link>清泉流响 </v-list-item-title>
                    <v-list-item-subtitle>Powered by QtShop {{ react.nowMenuIndex }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <!-- 菜单 -->
            <v-list v-model="react.nowMenuIndex">
                <v-list-item link v-for="(menu, i) in react.menus" :key="i" :color="menu.color" @click.stop="react.pickRoute(i)">
                    <v-list-item-icon>
                        <v-icon small v-text="menu.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ menu.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!-- 2.右侧顶部菜单栏 -->
        <!-- 2.右侧顶部菜单栏 -->
        <!-- 2.右侧顶部菜单栏 -->
        <!-- 2.右侧顶部菜单栏 -->
        <v-app-bar app>
            <v-toolbar-title>{{ react.menus[react.nowMenuIndex] ? react.menus[react.nowMenuIndex].name : '' }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-html="globalMessage"></div>
        </v-app-bar>
        <!-- 3.内容区域 -->
        <!-- 3.内容区域 -->
        <!-- 3.内容区域 -->
        <!-- 3.内容区域 -->
        <v-main>
            <v-container class="ma-0" style="width: 100%; max-width: 100%;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </v-container>
        </v-main>
        <!-- 4.底部区域 -->
        <!-- 4.底部区域 -->
        <!-- 4.底部区域 -->
        <!-- 4.底部区域 -->
        <v-footer app> </v-footer>
    </v-app>
</template>
<script>
    import ReactAPP from '@/web/apps/QtShop/ReactAPP.js'
    export default {
        data() {
            return {
                react: new ReactAPP(),
            }
        },
        methods: {},
        computed: {
            globalMessage() {
                let account = `用户 ${$store.state.userInfo.account || '尚未登录'}`
                let shop = `<br>店铺 ${$store.state.shopInfo.name || '尚未选择'}`
                let house = ` 仓库 ${$store.state.houseInfo.name || '尚未选择'}`
                return account + shop + house
            },
        },
        mounted() {
            const version = window['APP_VERSION']
            if (version) document.title = `清泉流响 v${version}`
            console.log('APP version', version)
        },
    }
</script>
<style lang="scss"></style>
