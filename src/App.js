import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout'
import { routes } from './routes'


function App() {
	return (
		<Router>
			<Routes>
				{routes.map((route, index) => {
					let Layout = DefaultLayout
					if (route.layout) {
						Layout = route.layout
					} else if (route.layout === null) {
						Layout = Fragment
					}

					const Page = route.component
					return (
						false ?
							<Route
								key={index}
								path={route.path}
								element={
									<Layout>
										<Page />
									</Layout>
								}
							/> :
							<Route
								key={index}
								path={route.path}
								element={
									<Navigate to="/login" />
								}
							/>
					)
				})
				}
			</Routes>


		</Router>
	);
}

export default App;