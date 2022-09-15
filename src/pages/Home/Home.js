import React from 'react';
import style from './Home.module.css';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox'
import CTAButton from '../../components/CTAButton/CTAButton'

import { ethers } from 'ethers';

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const Home = () => {
	const connectWallet = () => {
		provider.send('eth_requestAccounts', [])
			.catch(() => console.log('user account rejected'))
	}

	return (
		<div className={style.Home}>
			<span className={style.PageTitle}>
				For 7.7bln consumers to halt climate crisis, impact must become part of identity
			</span>
			<ExplanationBox />
			<CTAButton
				buttonText='connect wallet'
				click={() => connectWallet} />
		</div>
	)
}

export default Home;