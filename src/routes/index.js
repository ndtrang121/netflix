import { lazy } from 'react'

import NotTrailer from '~/layouts/NotTrailer'
import Search from '~/pages/Search'
const Home = lazy(() => import('~/pages/Home'))
const Shows = lazy(() => import('~/pages/Shows'))
const Movies = lazy(() => import('~/pages/Movies'))
const Trending = lazy(() => import('~/pages/Trending'))
const Favorite = lazy(() => import('~/pages/Favorite'))
const Watch = lazy(() => import('~/pages/Watch'))

export const loginRoutes = [
    { path: '/browse', title: 'Home', component: Home },
    { path: '/genre', title: 'TV Shows', component: Shows },
    { path: '/movies', title: 'Movies', component: Movies },
    {
        path: '/latest',
        title: 'Trending',
        component: Trending,
        layout: NotTrailer,
    },
    {
        path: '/favorite',
        title: 'Favorite',
        component: Favorite,
        layout: null,
    },
    { path: '/search', title: 'Search', component: Search, layout: null },
    { path: '/watch/:movieType/:movieId', title: 'Watch', component: Watch, layout: null },
]
