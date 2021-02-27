import Layout from '../components/Layout.vue'
let routes = [
    {
        component: Layout,
        path: '/',
        redirect: '/welcome',
        children: [
            {
                component: () => import('@/web/apps/Alfred/views/Welcome/Welcome.vue'),
                path: '/welcome',
            },
            {
                component: () => import('@/web/apps/Alfred/views/DevOps/DevOps.vue'),
                path: '/devops',
            },
        ],
    },
]
export default routes
