import { Fragment, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Start from './pages/Start'
import { loginRoutes } from './routes'
import { LogoutRequire, LoginRequire, AuthContext } from './components/Auth'
import TitlePage from './components/TitlePage'

function App() {
    const { isAuthenticated, setAuth } = useContext(AuthContext)

    return (
        <Routes>
            <Route element={<LoginRequire isAuthenticated={isAuthenticated} />}>
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
            <Route
                element={<LogoutRequire isAuthenticated={isAuthenticated} />}
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
            <Route
                path="*"
                element={
                    <TitlePage title="Not Found">
                        <NotFound />
                    </TitlePage>
                }
            />
        </Routes>
    )
}

export default App
