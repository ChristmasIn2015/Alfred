<template>
    <!-- Vuetify必须的根节点 v-app -->
    <v-app id="app">
        <!-- 全局UI -->
        <!-- 全局UI -->
        <!-- 全局UI -->
        <!-- 全局UI -->
        <!-- 全局UI：成功提示 -->
        <v-snackbar top right timeout="1200" color="green" v-model="success">{{ successTip }}</v-snackbar>
        <!-- 全局UI：警告提示 -->
        <v-snackbar top timeout="1500" color="red" v-model="warn">{{ warnTip }}</v-snackbar>
        <!-- 全局UI：Loadding -->
        <v-dialog v-model="loadding" persistent width="300">
            <v-card color="primary" dark>
                <v-card-title></v-card-title>
                <v-card-text>
                    <span>Please stand by</span>
                    <v-progress-linear indeterminate color="white"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- 全局UI：全局询问 -->
        <v-dialog v-model="confirm" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">{{ confirmTitle || '确认' }}</v-card-title>
                <v-card-text>{{ confirmContent || '确定要这样做吗?' }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="confirmAnswer(false)">取消</v-btn>
                    <v-btn color="green darken-1" text @click="confirmAnswer(true)">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 全局UI：登录对话 -->
        <!-- <v-dialog v-model="loadding" persistent width="300">
            <v-card color="primary" dark>
                <v-card-title></v-card-title>
                <v-card-text>
                    <span>Please stand by</span>
                    <v-progress-linear indeterminate color="white"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog> -->
        <!-- 1.左侧菜单栏 -->
        <!-- 1.左侧菜单栏 -->
        <!-- 1.左侧菜单栏 -->
        <!-- 1.左侧菜单栏 -->
        <v-navigation-drawer app permanent>
            <v-list-item link>
                <v-list-item-content @click.stop="pickRoute(-1)">
                    <v-list-item-title class="title" link>清泉流响 </v-list-item-title>
                    <v-list-item-subtitle>Powered by Alfred</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <v-list>
                <v-list-item-group v-model="nowMenuIndex">
                    <v-list-item link v-for="(menu, i) in menus" :key="i" :color="menu.color" @click.stop="pickRoute(i)">
                        <v-list-item-icon>
                            <v-icon small v-text="menu.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ menu.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <!-- 2.右侧顶部菜单栏 -->
        <!-- 2.右侧顶部菜单栏 -->
        <!-- 2.右侧顶部菜单栏 -->
        <!-- 2.右侧顶部菜单栏 -->
        <v-app-bar app>
            <v-toolbar-title>{{ menus[nowMenuIndex] ? menus[nowMenuIndex].name : '' }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="green" dark @click.stop>{{ userAccount || '点击登录' }}</v-btn>
        </v-app-bar>
        <!-- 3.内容区域 -->
        <!-- 3.内容区域 -->
        <!-- 3.内容区域 -->
        <!-- 3.内容区域 -->
        <v-main>
            <!-- 给应用提供合适的间距 -->
            <v-container>
                <router-view></router-view>
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
    export default {
        data: () => ({
            // 全局提示
        }),
        computed: {
            userAccount() {
                return $store.state.userInfo.account
            },
        },
        methods: {
            // 校验登录 如果没有登录则唤起登录框
            // 校验登录 如果登录了则询问是否注销登录
            chargeLogin() {
                let isLogined = localStorage['qqlx-token'] || null
                if (isLogined) {
                    localStorage['qqlx-token'] = ''
                } else {
                    this.login()
                }
            },
            login() {
                //
            },
            confirmAnswer(boolean = false) {
                this.confirm = false
                if (this.confirmNext) this.confirmNext(boolean)
            },
            pickRoute(index) {
                const target = this.menus[index]
                if (target) {
                    if (this.$route.fullPath === target.path) return
                    this.nowMenuIndex = index
                    $router.push({ path: target.path })
                } else {
                    if (this.$route.fullPath === '/') return
                    this.nowMenuIndex = -1
                    $router.push({ path: '/' })
                }
            },
        },
        mounted() {
            window['$load'] = {
                show: () => (this.loadding = true),
                hide: () => (this.loadding = false),
            }
            window['$tip'] = (message) => {
                this.success = true
                this.successTip = message
            }
            window['$warn'] = (message) => {
                this.warn = true
                this.warnTip = message
            }
            window['$confirm'] = (title = '', content = '', confirmNext) => {
                this.confirmTitle = title
                this.confirmContent = content
                this.confirmNext = confirmNext || null
                this.confirm = true
            }
        },
    }
</script>
<style lang="scss">
    // @import './styles/index.scss';
</style>
