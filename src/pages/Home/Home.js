import React, { useContext, useState } from 'react';
import style from './Home.module.css';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox'
import CTAButton from '../../components/CTAButton/CTAButton';
import { Link } from 'react-router-dom';

import { ethers } from 'ethers';
import { UserContext } from '../../contexts/UserContext';

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const Home = () => {
	const { walletAddress,
		 setWalletAddress,
		 isLoggedIn,
		 setLoggedIn
		 } = useContext(UserContext)
	// const [address, setAddress] = useState('')

	const connectWalletHandler = async () => {
		console.log('test')
		const accounts = await ethereum.request({
			method: 'eth_requestAccounts',
		});
		setWalletAddress(accounts[0])
		setLoggedIn('logged in')
	}

	return (
		<div className={style.Home}>
			<span className={style.PageTitle}>
				For 7.7bln consumers to halt climate crisis, impact must become part of identity
			</span>
			<span>
				{walletAddress}
				{isLoggedIn}
			</span>
			<ExplanationBox />
			<CTAButton
				buttonText='connect wallet'
				click={() => connectWalletHandler}
			// click={() => setValue(address)}
			/>
			<Link to='/auth'>
				<button>test</button>
			</Link>
		</div>
	)
}

export default Home;