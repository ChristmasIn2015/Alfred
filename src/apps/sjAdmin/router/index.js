// 1.构建路由路径
let routes = [
    {
        path: '/',
        name: 'board',
        component: () => import('../views/board/board.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/login.vue'),
    },
]
export default routes
