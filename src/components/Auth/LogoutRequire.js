import { Navigate, Outlet } from 'react-router-dom'

function LogoutRequire({ isAuthenticated }) {
    return isAuthenticated ? <Navigate to="/browse" /> : <Outlet />
}

export default LogoutRequire
