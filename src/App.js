import React, { useState } from 'react';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthPage from './pages/Auth/AuthPage';
import NavBar from './containers/NavBar/NavBar';
import NFTPage from './pages/NFT/NFTPage';
import NFTs from './pages/NFT/NFTs';
import { UserContext } from './contexts/UserContext';
import { WagmiConfig, createClient } from 'wagmi';
import { getDefaultProvider } from 'ethers';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useLocation
} from 'react-router-dom';
import './App.css'

const client = createClient({
	autoConnect: true,
	provider: getDefaultProvider(),
})

const App = () => {
	const [walletAddress, setWalletAddress] = useState(null)
	const [isLoggedIn, setLoggedIn] = useState(false)
	const [impactScore, setImpactScore] = useState(80)

	// if (walletAddress) {
	// 	setLoggedIn(!isLoggedIn)
	// }

	return (
		<WagmiConfig client={client}>
			<Router>
				<div className='App'>
					<UserContext.Provider value={{
						walletAddress,
						setWalletAddress,
						isLoggedIn,
						setLoggedIn,
						impactScore,
						setImpactScore
					}}>

						<NavBar />

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
								exact path='/NFT' element={<NFTPage />}
							/>

							<Route
								exact path='/NFTs' element={<NFTs />}
							/>
						</Routes>
					</UserContext.Provider>
				</div>
			</Router>
		</WagmiConfig>
	)
};

export default App;