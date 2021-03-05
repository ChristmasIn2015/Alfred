let routes = [
    {
        component: () => import('@/web/apps/QtShop/views/welcome/Welcome.vue'),
        path: '/',
        name: 'home',
    },
    {
        component: () => import('@/web/apps/QtShop/views/shop/ShopCenter.vue'),
        path: '/shop/center',
        name: 'shopCenter',
    },
    // {
    //     component: () => import('@/web/apps/Alfred/views/yjyLog/yjyLog.vue'),
    //     path: '/log/list',
    //     name: 'logList',
    // },
    // {
    //     component: () => import('@/web/apps/Alfred/views/devops/DevOps.vue'),
    //     path: '/cmd/remote/list',
    //     name: 'devops',
    // },
    // {
    //     component: () => import('@/web/apps/Alfred/views/cmd/Cmd.vue'),
    //     path: '/cmd/local/list',
    //     name: 'devops',
    // },
]
export default routes
