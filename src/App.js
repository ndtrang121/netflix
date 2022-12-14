import { Fragment, lazy, Suspense, useContext, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout'
import { loginRoutes } from './routes'
import { LogoutRequire, LoginRequire, AuthContext } from './components/Auth'
import TitlePage from './components/TitlePage'

import Loading from './components/Loading'
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const Start = lazy(() => import('./pages/Start'))

function App() {
    const { isAuthenticated } = useContext(AuthContext)
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

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
                        const Page = route.component
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <TitlePage title={route.title}>
                                            <Page />
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
                                <Login isAuthenticated={isAuthenticated} />
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
