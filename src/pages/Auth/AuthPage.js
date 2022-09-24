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

const createSiweMessage = async (address, statement) => {

	const res = await fetch(`${API_URL}/nonce`,{credentials:"include"});
	console.log('res :>> ', res.body);
	console.log('origin :>> ', origin);
    const message = new SiweMessage({
		domain,
        address,
        statement,
		uri:origin,
        version: '1',
        chainId: '1',
        nonce: await res.text()
    });
	return message.prepareMessage();
}

const AuthPage = () => {
	const navigate = useNavigate();
	const [messageSigned, setmessageSigned] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { walletAddress, impactScore, setImpactScore } = useContext(UserContext);
	const { address, isConnected } = useAccount();
	const {data:wsigner} = useSigner();
	const {data, signMessageAsync } = useSignMessage();

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
		const signature = await signMessageAsync({message});
		console.log("a",message);
		console.log("b",signature);
		const res = await fetch(`${API_URL}/verify`,{
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({message:message,signature:signature }),
			credentials:'include'
		});
		console.log(res.json());
		const res2 = await fetch(`${API_URL}/api/calculate`,{credentials:"include"});
		console.log('re :>> ', await res2.json());

		/**/
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
	</div>
	)
}

export default AuthPage;