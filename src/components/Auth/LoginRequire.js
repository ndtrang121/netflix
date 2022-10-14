import { Navigate, Outlet, useLocation } from 'react-router-dom'

function LoginRequire({ isAuthenticated }) {
    const location = useLocation()
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />
}

export default LoginRequire
