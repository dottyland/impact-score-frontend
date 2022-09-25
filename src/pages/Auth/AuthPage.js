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
import signatureIcon from '../../assets/signatureIcon.png';
import calculateIcon from '../../assets/calculateIcon.png';

import { UserContext } from '../../contexts/UserContext';
import { useAccount, useConnect, useDisconnect, useSigner, useSignMessage } from 'wagmi'
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const domain = window.location.host;
const origin = window.location.origin;
const API_URL = 'https://impact-api-bepw.vercel.app'



const AuthPage = () => {
	const navigate = useNavigate();
	const [disabled,setDisabled]=useState(false)
	const [messageSigned, setmessageSigned] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { mNonce, setMNonce } = useContext(UserContext);
	const { address, isConnected } = useAccount();
	const { data: wsigner } = useSigner();
	const { data, signMessageAsync } = useSignMessage();

	const createSiweMessage = async (address, statement) => {

		const res = await fetch(`${API_URL}/nonce/` + address, { credentials: "include" });
		console.log('res :>> ', res.body);
		console.log('origin :>> ', origin);
		let temp = await res.text();
		const message = new SiweMessage({
			domain,
			address,
			statement,
			uri: origin,
			version: '1',
			chainId: '1',
			nonce: temp
		});
		setMNonce(temp);
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
		setmessageSigned(true)
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

	}

	const AuthCalculate = ({disabled}) => {
		return (
			<div className={style.AuthPage}>
				<h1 className={style.PageTitle}>
					What’s my Impact Score?
				</h1>

				<div className={style.AuthCalculateBanner}>
					<img src={authenticateImage} alt="" />
					<span>
						Scientists estimate that to avoid the worst effects of climate change, we need to cap global warming at 1.5°C.
						<p></p>
						Based on a study by Oxfam and the Institute for European Environmental Policy, this requires average individual emissions to be less than 2.3tCO2/year. In the US, the average individual emits more than 14 tCO2 per year.
						<p></p>
						One way to help lower your emissions level is to offset your current emissions. So if you're retiring more than 11.7 CO2 tons per year, you're participating in avoiding the worst effects of global warming. Each token retired will contribute as points to improve your impact score.
					</span>
				</div>

				{!disabled&&(<CTAButton
					buttonIcon={calculateIcon}
					buttonText='Calculate Score'
					click={() => {
						goToDashboard()
					}}
				/>)}
			</div>
		)
	}


	// useEffect(() => {
	// 	messageSigned && goToDashboard()
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [goToDashboard])

	useEffect(() => {
		!isConnected && goToHome()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [goToHome])

	return (
		!messageSigned ?
			<div className={style.AuthPage}>
				<AuthBanner icon={authenticateImage} text={
					`Your address: ${address} is connected. We just need you to sign a message to confirm it’s yours.`
				} />

				{
					isLoading ? <Spinner /> :
						<CTAButton
							buttonIcon={signatureIcon}
							buttonText='Sign message'
							click={() => {
								signInWithEthereum()
							}}
						/>
				}

				{/* <button onClick={goToDashboard}> */}
				{/* go to dashboard */}
				{/* </button> */}
			</div>
			: (<AuthCalculate disabled={disabled}/>

	)
}

export default AuthPage;