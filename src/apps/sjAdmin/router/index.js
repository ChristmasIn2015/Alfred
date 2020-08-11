// 1.构建路由路径
const routes = [
    {
        path: '/sjAdmin/index',
        name: 'other',
        component: () => import('../views/index.vue'),
    },
    {
        path: '/sjAdmin/index2',
        name: 'other2',
        component: () => import('../views/index2.vue'),
    },
]
export default routes
