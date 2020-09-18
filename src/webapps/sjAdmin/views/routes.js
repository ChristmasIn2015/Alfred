// 1.构建路由路径
let routes = [
    {
        path: '/',
        name: 'board',
        component: () => import('../views/Admin/Admin.vue'),
    },
]
export default routes
