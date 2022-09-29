import Home from '../pages/Home'
import Shows from '../pages/Shows'
import Movies from '../pages/Movies'
import Trending from '../pages/Trending'
import Favorite from '../pages/Favorite'

import NotTrailer from '../layouts/NotTrailer'

export const loginRoutes = [
	{ path: '/browse', component: Home },
	{ path: '/genre', component: Shows },
	{ path: '/movies', component: Movies },
	{ path: '/latest', component: Trending, layout: NotTrailer },
	{ path: '/favorite', component: Favorite, layout: null },
]
