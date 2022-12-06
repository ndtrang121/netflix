import { lazy } from 'react'

import NotTrailer from '~/layouts/NotTrailer'
import Search from '~/pages/Search'
const Home = lazy(() => import('~/pages/Home'))
const Shows = lazy(() => import('~/pages/Shows'))
const Movies = lazy(() => import('~/pages/Movies'))
const Trending = lazy(() => import('~/pages/Trending'))
const MyList = lazy(() => import('~/pages/MyList'))
const Watch = lazy(() => import('~/pages/Watch'))

export const loginRoutes = [
    { path: '/browse', title: 'Home', component: Home },
    { path: '/tv', title: 'TV Shows', component: Shows },
    { path: '/movie', title: 'Movies', component: Movies },
    {
        path: '/latest',
        title: 'New & Popular',
        component: Trending,
        layout: NotTrailer,
    },
    {
        path: '/favorite',
        title: 'My List',
        component: MyList,
        layout: null,
    },
    { path: '/search', title: 'Search', component: Search, layout: null },
    { path: '/watch/:movieType/:movieId', title: 'Watch', component: Watch, layout: null },
]
