// 1.构建路由路径
let routes = [
    {
        path: '/blank',
        name: 'blank',
        component: () => import('../views/blank.vue'),
    },
    {
        path: '/blank2',
        name: 'blank2',
        component: () => import('../views/blank2.vue'),
    },
]
export default routes
