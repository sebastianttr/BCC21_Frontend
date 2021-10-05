const routes = [{
        path: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
                name: 'index',
                path: '',
                component: () =>
                    import ('pages/Index.vue')
            },
            {
                name: 'annonce',
                path: '/annonce',
                component: () =>
                    import ('pages/Annouce.vue')
            },
            {
                name: 'embedded',
                path: '/embedded',
                component: () =>
                    import ('pages/Embedded.vue')
            },
            {
                name: 'about',
                path: '/about',
                component: () =>
                    import ('pages/About.vue')
            }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/Error404.vue')
    }
]

export default routes