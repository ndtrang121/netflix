import Home from '~/pages/Home'
import Shows from '~/pages/Shows'
import Movies from '~/pages/Movies'
import Trending from '~/pages/Trending'
import Favorite from '~/pages/Favorite'
import NotTrailer from '~/layouts/NotTrailer'
import Search from '~/pages/Search'

export const loginRoutes = [
    { path: '/browse', title: 'Home', component: Home },
    { path: '/genre', title: 'TV Shows', component: Shows },
    { path: '/movies', title: 'Movies', component: Movies },
    { path: '/latest', title: 'Trending', component: Trending, layout: NotTrailer },
    { path: '/favorite', title: 'Favorite', component: Favorite, layout: null },
    { path: '/search', title: 'Search', component: Search, layout: null },
]
