import React, { useState } from 'react';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthPage from './pages/Auth/AuthPage';
import { UserContext } from './contexts/UserContext';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useLocation
} from 'react-router-dom';
import './App.css'

const App = () => {
	const [walletAddress, setWalletAddress] = useState('test')
	const [isLoggedIn, setLoggedIn] = useState('not logged in')

	// if (walletAddress) {
	// 	setLoggedIn(!isLoggedIn)
	// }

	return (
		<Router>
			<div className='App'>
				<UserContext.Provider value={{
					walletAddress,
					setWalletAddress,
					isLoggedIn,
					setLoggedIn
				}}>
					nav {isLoggedIn}
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
				</UserContext.Provider>
			</div>
		</Router>
	)
};

export default App;