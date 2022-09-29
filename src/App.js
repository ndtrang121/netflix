import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout'
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Start from './pages/Start';
import { loginRoutes } from './routes'
import { LogoutRequire, LoginRequire } from './components/Auth'

function App() {
	return (
		<Routes>
			<Route element={<LoginRequire />} >
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
				})
				}
			</Route>
			<Route element={<LogoutRequire />} >
				<Route path="/" element={<Start />} />
				<Route path="/login" element={<Login />} />
			</Route>
			<Route
				path='*'
				element={<NotFound />}
			/>
		</Routes>
	);
}

export default App;