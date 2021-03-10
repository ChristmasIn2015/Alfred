let routes = [
    {
        component: () => import('@/web/apps/QtShop/views/welcome/Welcome.vue'),
        path: '/',
        name: 'home',
    },
    {
        component: () => import('@/web/apps/QtShop/views/Hall/Hall.vue'),
        path: '/hall/center',
        name: 'hall',
    },
    // {
    //     component: () => import('@/web/apps/QtShop/views/devops/DevOps.vue'),
    //     path: '/cmd/remote/list',
    //     name: 'devops',
    // },
    // {
    //     component: () => import('@/web/apps/QtShop/views/cmd/Cmd.vue'),
    //     path: '/cmd/local/list',
    //     name: 'devops',
    // },
]
export default routes
