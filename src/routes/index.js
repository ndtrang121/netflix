import NotTrailer from '~/layouts/NotTrailer'

export const loginRoutes = [
    { path: '/browse', title: 'Home', component: 'Home' },
    { path: '/genre', title: 'TV Shows', component: 'Shows' },
    { path: '/movies', title: 'Movies', component: 'Movies' },
    {
        path: '/latest',
        title: 'Trending',
        component: 'Trending',
        layout: NotTrailer,
    },
    {
        path: '/favorite',
        title: 'Favorite',
        component: 'Favorite',
        layout: null,
    },
    { path: '/search', title: 'Search', component: 'Search', layout: null },
]
