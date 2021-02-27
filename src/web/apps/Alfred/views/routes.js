let routes = [
    {
        component: () => import('@/web/apps/Alfred/views/welcome/Welcome.vue'),
        path: '/',
    },
    {
        component: () => import('@/web/apps/Alfred/views/user/User.vue'),
        path: '/user/list',
    },
    {
        component: () => import('@/web/apps/Alfred/views/log/Log.vue'),
        path: '/log/list',
    },
    {
        component: () => import('@/web/apps/Alfred/views/devops/DevOps.vue'),
        path: '/devops/LIST',
    },
]
export default routes
