import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from './auth';

function LogoutRequire() {

	return (
		isAuth ? <Navigate to='/browse' /> : <Outlet />
	);
}

export default LogoutRequire;