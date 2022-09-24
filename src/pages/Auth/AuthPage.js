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
import { useAccount, useConnect, useDisconnect, useSigner, useSignMessage } from 'wagmi'
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const domain = window.location.host;
const origin = window.location.origin;
const API_URL = 'https://impact-api.vercel.app'



const AuthPage = () => {
	let mNonce="";
	const navigate = useNavigate();
	const [messageSigned, setmessageSigned] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { walletAddress, impactScore, setImpactScore } = useContext(UserContext);
	const { address, isConnected } = useAccount();
	const { data: wsigner } = useSigner();
	const { data, signMessageAsync } = useSignMessage();

	const createSiweMessage = async (address, statement) => {

		const res = await fetch(`${API_URL}/nonce/`+address, { credentials: "include" });
		console.log('res :>> ', res.body);
		console.log('origin :>> ', origin);
		let temp=await res.text();
		const message = new SiweMessage({
			domain,
			address,
			statement,
			uri: origin,
			version: '1',
			chainId: '1',
			nonce: temp
		});
		mNonce=temp;
		return message.prepareMessage();
	}

	const goToDashboard = () => {
		navigate('/dashboard')
	}

	const goToHome = () => {
		navigate('/home')
	}


	const signInWithEthereum = async () => {
		const signer = wsigner;
		console.log('object :>> ', signer.getAddress());
		setIsLoading(true);
		console.log("1");
		const message = await createSiweMessage(
			await signer.getAddress(),
			'Sign in with Ethereum to the app.'
		);
		console.log("2");
		const signature = await signMessageAsync({ message });
		console.log("a", message);
		console.log("b", signature);
		const res = await fetch(`${API_URL}/verify`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: message, signature: signature }),
			credentials: 'include'
		});
		console.log(res);
		const res2 = await fetch(`${API_URL}/api/calculate`, { 
			method:"POST",
			headers:{
				'Content-Type': 'application/json',
			},
			body:JSON.stringify({
				address:await signer.getAddress(),
				nonce:mNonce
			}),
			credentials: "include" });

		/**/
		console.log('res2.json() :>> ', res2.json());
	}

	const AuthCalculate = () => {
		return (
			<div className={style.AuthPage}>
				<h1>
					What’s my Impact Score?
				</h1>
				<AuthBanner icon={authenticateImage} text={
					`Scientists estimate that to avoid the worst effects of climate change, we need to cap global warming at 1.5°C. Based on a study by Oxfam and the Institute for European Environmental Policy, this requires average individual emissions to be less than 2.3tCO2/year. In the US, the average individual emits more than 14 tCO2 per year.                                           One way to help lower your emissions level is to offset your current emissions. So if you're retiring more than 11.7 CO2 tons per year, you're participating in avoiding the worst effects of global warming. Each token retired will contribute as points to improve your impact score.`
				} />
	
				{
					isLoading ? <Spinner /> :
						<CTAButton buttonText='Calculate Score'
							click={() => {
								goToDashboard()
							}}
						/>
				}
			</div>
		)
	}
	

	useEffect(() => {
		messageSigned && goToDashboard()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [goToDashboard])

	useEffect(() => {
		!isConnected && goToHome()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [goToHome])

	return (<div className={style.AuthPage}>
		<AuthBanner icon={authenticateImage} text={
			`Your address: ${address} is connected. We just need you to sign a message to confirm it’s yours.`
		} />

		{
			isLoading ? <Spinner /> : <CTAButton buttonText='Sign message'
				click={() => {
					signInWithEthereum()
				}}
			/>
		}

		<button onClick={goToDashboard}>
			go to dashboard
		</button>

		{/* <AuthCalculate/> */}
	</div>
	)
}

export default AuthPage;