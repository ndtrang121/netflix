import { Fragment, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Start from './pages/Start'
import { loginRoutes } from './routes'
import { LogoutRequire, LoginRequire, AuthContext } from './components/Auth'

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
                                    <Page />
                                </Layout>
                            }
                        />
                    )
                })}
            </Route>
            <Route element={<LogoutRequire isAuthenticated={isAuthenticated} />}>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login setAuth={setAuth} isAuthenticated={isAuthenticated} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
