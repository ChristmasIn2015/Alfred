import Layout from '../modules/components/Layout.vue'
let routes = [
    {
        component: Layout,
        path: '/',
        redirect: '/cmd',
        children: [
            {
                component: () => import('@/web/apps/SjCrow/views/Cmd/Cmd.vue'),
                path: '/cmd',
            },
            {
                component: () => import('@/web/apps/SjCrow/views/Note/Note.vue'),
                path: '/note',
            },
        ],
    },
]
export default routes
