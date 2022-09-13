import React from 'react';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useLocation
} from 'react-router-dom'

const App = () => {
	return (
		<Router>
			<div>
				<Routes>
					<Route
						exact path='/' element={<Home />}
					/>

					<Route
						exact path='/home' element={<Home />}
					/>

					<Route
						exact path='/dashboard' element={<Dashboard />}
					/>
				</Routes>
			</div>
		</Router>
	)
};

export default App;