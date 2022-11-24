import { Fragment, lazy, Suspense, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout'
import { loginRoutes } from './routes'
import { LogoutRequire, LoginRequire, AuthContext } from './components/Auth'
import TitlePage from './components/TitlePage'

import Search from './pages/Search'
import Loading from './components/Loading'
const Home = lazy(() => import('./pages/Home'))
const Shows = lazy(() => import('./pages/Shows'))
const Movies = lazy(() => import('./pages/Movies'))
const Trending = lazy(() => import('./pages/Trending'))
const Favorite = lazy(() => import('./pages/Favorite'))

const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const Start = lazy(() => import('./pages/Start'))

function App() {
    const { isAuthenticated, setAuth } = useContext(AuthContext)

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* Require Login */}
                <Route
                    element={<LoginRequire isAuthenticated={isAuthenticated} />}
                >
                    {loginRoutes.map((route, index) => {
                        let Layout = DefaultLayout
                        if (route.layout) {
                            Layout = route.layout
                        } else if (route.layout === null) {
                            Layout = Fragment
                        }
                        const page = route.component
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <TitlePage title={route.title}>
                                            {(page === 'Home' && <Home />) ||
                                                (page === 'Shows' && (
                                                    <Shows />
                                                )) ||
                                                (page === 'Movies' && (
                                                    <Movies />
                                                )) ||
                                                (page === 'Trending' && (
                                                    <Trending />
                                                )) ||
                                                (page === 'Favorite' && (
                                                    <Favorite />
                                                )) ||
                                                (page === 'Search' && (
                                                    <Search />
                                                ))}
                                        </TitlePage>
                                    </Layout>
                                }
                            />
                        )
                    })}
                </Route>

                {/* Login */}
                <Route
                    element={
                        <LogoutRequire isAuthenticated={isAuthenticated} />
                    }
                >
                    <Route
                        path="/"
                        element={
                            <TitlePage title="Netflix">
                                <Start />
                            </TitlePage>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <TitlePage title="Netflix">
                                <Login
                                    setAuth={setAuth}
                                    isAuthenticated={isAuthenticated}
                                />
                            </TitlePage>
                        }
                    />
                </Route>

                {/* Page not found */}
                <Route
                    path="*"
                    element={
                        <TitlePage title="Not Found">
                            <NotFound />
                        </TitlePage>
                    }
                />
            </Routes>
        </Suspense>
    )
}

export default App
