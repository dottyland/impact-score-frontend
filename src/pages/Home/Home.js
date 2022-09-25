import React, { useContext, useState, useEffect } from 'react';
import style from './Home.module.css';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox'
// import Manifesto from '../../components/Manifesto/Manifesto';
import CTAButton from '../../components/CTAButton/CTAButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ethers } from 'ethers';
import { UserContext } from '../../contexts/UserContext';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ethereumIcon from '../../assets/ethereum.png'
import HomeContent from '../../data/HomeContent'

const origin = window.location.origin;
const { ethereum } = window;

const Home = () => {
	let navigate = useNavigate();

	const goToAuth = () => {
		navigate('/auth')
	}

	const checkWallet = () => {
		const { ethereum } = window;
		if (!ethereum) {
			console.log('Make sure you have Metamask');
			return;
		} else {
			console.log('We have the ethereum object', ethereum);
		}
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
		checkWallet()
		isConnected && goToAuth()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isConnected])

	return (
		<div className={style.Home}>
			<span className={style.PageTitle}>
				{HomeContent.pageTitle}
			</span>
			<span>
				{walletAddress}
				{isLoggedIn}
			</span>
			<ExplanationBox 
				ExplanationBoxText = 'How to claim your Impact Self'
				ExplanationContent = {HomeContent.explanationData}
			/>

			<ConnectButton/>
			{/* <Manifesto/> */}
			{/* <button onClick={goToAuth}>test</button> */}
		</div>
	)
}

export default Home;