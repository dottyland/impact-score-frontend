import React, { useContext, useState } from 'react';
import style from './Home.module.css';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox'
import CTAButton from '../../components/CTAButton/CTAButton'

import { ethers } from 'ethers';
import { UserContext } from '../../contexts/UserContext';

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const Home = () => {
	const { value, setValue } = useContext(UserContext)
	const [address, setAddress] = useState('test')

	// const connectWallet = async () => {
	// 	console.log('running')
	// 	provider.send('eth_requestAccounts', [])
	// 		.catch(() => console.log('user account rejected')
	// 	)
	// 	setAddress(await signer.getAddress)
	// 	setValue(address)
	// }

	const connectWalletHandler = async () => {
		console.log('test')
		const accounts = await ethereum.request({
			method: 'eth_requestAccounts',
		});
		setAddress(accounts[0])
	}

	return (
		<div className={style.Home}>
			<span className={style.PageTitle}>
				For 7.7bln consumers to halt climate crisis, impact must become part of identity
			</span>
			<span>
				{address}
			</span>
			<ExplanationBox />
			<CTAButton
				buttonText='connect wallet'
				click={() => connectWalletHandler} 
				// click={() => setValue(address)}
			/>
		</div>
	)
}

export default Home;