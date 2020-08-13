// 1.构建路由路径
let routes = [
    {
        path: '/',
        name: 'board',
        component: () => import('../views/board/board.vue'),
    },
]
export default routes
