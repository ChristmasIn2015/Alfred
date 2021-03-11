let routes = [
    {
        component: () => import('@/web/apps/QtShop/views/Welcome/Welcome.vue'),
        path: '/',
        name: 'home',
    },
    {
        component: () => import('@/web/apps/QtShop/views/Hall/Hall.vue'),
        path: '/hall/center',
        name: 'hall',
    },
    {
        component: () => import('@/web/apps/QtShop/views/SaleCenter/SaleCenter.vue'),
        path: '/sale/center',
        name: 'saleCenter',
    },
    {
        component: () => import('@/web/apps/QtShop/views/OrderCenter/OrderCenter.vue'),
        path: '/order/center',
        name: 'OrderCenter',
    },
]
export default routes
