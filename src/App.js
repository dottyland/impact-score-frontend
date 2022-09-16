import React from 'react';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthPage from './pages/Auth/AuthPage';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useLocation
} from 'react-router-dom';
import './App.css'

const App = () => {
	return (
		<Router>
			<div className='App'>
				<Routes>
					<Route
						exact path='/' element={<Home />}
					/>

					<Route
						exact path='/home' element={<Home />}
					/>

					<Route
						exact path='/auth' element={<AuthPage />}
					/>

					<Route
						exact path='/dashboard' element={<Dashboard />}
					/>

					<Route
					// exact path='/NFT' element={<NFT />}
					/>
				</Routes>
			</div>
		</Router>
	)
};

export default App;