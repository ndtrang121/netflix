import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuth } from './auth';

function LoginRequire() {
	const location = useLocation()

	return (
		isAuth ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />
	);
}

export default LoginRequire;