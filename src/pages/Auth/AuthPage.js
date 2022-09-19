import React, { useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { SiweMessage } from 'siwe';
import style from './AuthPage.module.css';
import AuthBanner from '../../components/Banners/AuthBanner';
import CTAButton from '../../components/CTAButton/CTAButton';
import calculateImage from '../../assets/calculate.svg';
import scanImage from '../../assets/scan.svg';
import authenticateImage from '../../assets/authentication.svg';
import { UserContext } from '../../contexts/UserContext';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Link, useNavigate } from 'react-router-dom';

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const API_URL = 'https://impact-api.vercel.app'

const createSiweMessage = (address, statement) => {
	const message = new SiweMessage({
		domain,
		address,
		statement,
		uri: origin,
		version: '1',
		chainId: '1'
	});
	return message.prepareMessage();
}

const AuthPage = () => {
	let navigate = useNavigate();
	const [messageSigned, setmessageSigned] = useState(false);
	const [calculateScore, setCalculateScore] = useState(false);
	const { walletAddress, impactScore, setImpactScore } = useContext(UserContext);
	const { address, isConnected } = useAccount();

	const goToDashboard = () => {
		navigate('/dashboard')
	}

	const signInWithEthereum = async () => {
		const message = createSiweMessage(
			await signer.getAddress(),
			'Sign in with Ethereum to the app.'
		);
		const signature = await signer.signMessage(message);
		console.log(message);

		signature = await signer.signMessage(message);
		console.log(signature);

		const res = await axios.post(`${API_URL}/verify`, {
			body: JSON.stringify({ message, signature }),
		});
		setmessageSigned(!messageSigned)
		console.log(res);
	}

	useEffect(() => {
		messageSigned && goToDashboard()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [goToDashboard])

	return (<div className={style.AuthPage}>
		<AuthBanner icon={authenticateImage} text={
			`Your address: ${address} is connected. We just need you to sign a message to confirm it’s yours.`
		} />
		<CTAButton buttonText='Sign message'
			click={() => {
				signInWithEthereum()
			}}
		/>
		<Link to='/dashboard'>
			<button>{impactScore}fff</button>
		</Link>
	</div>
	)
}

export default AuthPage;