// 1.构建路由路径
let routes = [
    {
        path: '/index',
        name: 'other',
        component: () => import('../views/index.vue'),
    },
    {
        path: '/index2',
        name: 'other2',
        component: () => import('../views/index2.vue'),
    },
]
export default routes
