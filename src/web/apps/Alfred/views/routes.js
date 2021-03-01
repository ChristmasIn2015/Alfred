let routes = [
    {
        component: () => import('@/web/apps/Alfred/views/welcome/Welcome.vue'),
        path: '/',
        name: 'home',
    },
    {
        component: () => import('@/web/apps/Alfred/views/user/User.vue'),
        path: '/user/list',
        name: 'userList',
    },
    {
        component: () => import('@/web/apps/Alfred/views/log/Log.vue'),
        path: '/log/list',
        name: 'logList',
    },
    {
        component: () => import('@/web/apps/Alfred/views/devops/DevOps.vue'),
        path: '/devops/LIST',
        name: 'devops',
    },
]
export default routes
