import React, { useState } from 'react';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthPage from './pages/Auth/AuthPage';
import NavBar from './containers/NavBar/NavBar';
import NFTPage from './pages/NFT/NFTPage';
import NFTs from './pages/NFT/NFTs';
import Privacy from './pages/Privacy/Privacy';
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

const { ethereum } = window;

const client = createClient({
	autoConnect: true,
	provider: getDefaultProvider(),
})

const App = () => {
	const [walletAddress, setWalletAddress] = useState(null)
	const [isLoggedIn, setLoggedIn] = useState(false)
	const [mNonce,setMNonce]=useState("");
	const [authToken,setAuthToken]=useState();
	// const [impactScore, setImpactScore] = useState(80)

	if (ethereum === undefined) {
		alert('get metamask!')
	} else {
		return (
			<WagmiConfig client={client}>
				<Router>
					<div className='App'>
						<UserContext.Provider value={{
							walletAddress,
							setWalletAddress,
							isLoggedIn,
							setLoggedIn,
							mNonce,
							setMNonce,
							authToken,
							setAuthToken,
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

								<Route
									exact path='/privacy' element={<Privacy />}
								/>
							</Routes>
						</UserContext.Provider>
					</div>
				</Router>
			</WagmiConfig>
		)
	}

};

export default App;