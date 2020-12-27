/** *******************************************************************
 *
 * npm config edit : electron_mirror=https://npm.taobao.org/mirrors/electron/
 * SjCrow
 * 是一个 Electron 应用，内嵌了一个 SPA 应用
 * SPA 各个模块通过IPC通信可以调用 Node API
 *
 * *******************************************************************
 *
 * Cmd 模块, 是脚本列表, 可以执行终止自定义脚本 in LowDB
 * Note 模块, 是笔记系统 in LowDB
 * 待规划 Stock 模块, 是股票系统 in LowDB
 * 待规划 WorkFlow 模块, 是流程管理工具 in LowDB
 *
 * ******************************************************************* */
import Layout from '../modules/components/Layout.vue'
let routes = [
    {
        component: Layout,
        path: '/',
        redirect: '/cmd',
        children: [
            {
                component: () => import('@/web/apps/SjCrow/views/Cmd/Cmd.vue'),
                path: '/cmd',
            },
            {
                component: () => import('@/web/apps/SjCrow/views/Note/Note.vue'),
                path: '/note',
            },
            {
                component: () => import('@/web/apps/SjCrow/views/Flow/Flow.vue'),
                path: '/flow',
            },
        ],
    },
]
export default routes
