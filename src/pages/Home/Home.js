import React, { useContext, useState, useEffect } from 'react';
import style from './Home.module.css';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox'
import CTAButton from '../../components/CTAButton/CTAButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ethers } from 'ethers';
import { UserContext } from '../../contexts/UserContext';
import ethereumIcon from '../../assets/ethereum.png'

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const { ethereum } = window

const Home = () => {
	let navigate = useNavigate();

	// useEffect(async () => {
	// 	checkUserConnected()
	// 	const accounts = await ethereum.request({
	// 		method: 'eth_requestAccounts',
	// 	});
	// 	// setWalletAddress(accounts[0])
	// 	return accounts[0]
	// }, [])

	const goToAuth = () => {
		navigate('/auth')
	}


	const { walletAddress,
		setWalletAddress,
		isLoggedIn,
		setLoggedIn,
	} = useContext(UserContext)
	const { address, isConnected } = useAccount()


	const connectWalletHandler = async () => {
		console.log('test')
		const accounts = await ethereum.request({
			method: 'eth_requestAccounts',
		});
		setWalletAddress(accounts[0])
	}

	useEffect(() => {
		isConnected && goToAuth()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isConnected])

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
				buttonIcon={ethereumIcon}
				buttonText='connect wallet'
				click={() => connectWalletHandler()}
			// click={() => setValue(address)}
			/>

			{/* <ConnectButton /> */}
			<button onClick={goToAuth}>test</button>
		</div>
	)
}

export default Home;