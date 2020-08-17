// 1.构建路由路径
let routes = [
    {
        path: '/',
        name: 'blank',
        component: () => import('../views/blank.vue'),
    },
]
export default routes
