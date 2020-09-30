// 1.构建路由路径
let routes = [
    {
        path: '/',
        name: 'board',
        component: () => import('../views/Admin/Admin.vue'),
    },
    {
        path: '/orderPrint',
        name: 'orderPrint',
        component: () => import('../views/Board/Order/OrderPrint.vue'),
    },
]
export default routes
