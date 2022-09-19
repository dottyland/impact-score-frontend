import React, { useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { SiweMessage } from 'siwe';
import { Link } from 'react-router-dom';
import style from './AuthPage.module.css';
import AuthBanner from '../../components/Banners/AuthBanner';
import CTAButton from '../../components/CTAButton/CTAButton';
import calculateImage from '../../assets/calculate.svg';
import scanImage from '../../assets/scan.svg';
import authenticateImage from '../../assets/authentication.svg';
import { UserContext } from '../../contexts/UserContext';

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
// const api_url = 'https://impact-api.vercel.app'

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

const signInWithEthereum = async () => {
	const message = createSiweMessage(
		await signer.getAddress(),
		'Sign in with Ethereum to the app.'
	);
	console.log(await signer.signMessage(message));
}

const AuthPage = () => {

	const [messageSigned, setmessageSigned] = useState(false)
	const [calculateScore, setCalculateScore] = useState(false)
	const { walletAddress, impactScore, setImpactScore } = useContext(UserContext);

	const AuthConnectedMessage = () => {
		return (<div className={style.AuthPage}>
			<AuthBanner icon={authenticateImage} text={
				`Your address: ${walletAddress} is connected. We just need you to sign a message to confirm it’s yours.`
			} />
			<CTAButton buttonText='Sign message'
				click={() => {
					signInWithEthereum()
					setmessageSigned(!messageSigned)
				}}
			/>
			<Link to='/dashboard'>
				<button>{impactScore}fff</button>
			</Link>
		</div>
		)
	}

	// const AuthSignMessage = () => {
	// 	return (<div className={style.AuthPage}>
	// 		<AuthBanner icon={scanImage} text={
	// 			`Scanning the blockchain for your evironmental impact`
	// 		} />
	// 		<CTAButton buttonText='calculate score'
	// 			click={() => 'stuff'}
	// 		/>
	// 		<Link to='/dashboard'>
	// 			<button>test</button>
	// 		</Link>
	// 	</div>
	// 	)
	// }

	const AuthCalculateScore = () => {
		useEffect(() => {
			const getScore = async () => {
				try {
					// await axios.get(`${api_url}/api/abc/:${walletAddress}/`)
					await axios.get(`https://impact-api.vercel.app/api/abc/:0xddff75a29eb4bfecf65380de9a75ad08c140ea49/`)
						.then(res => setImpactScore(res.data.score))
				}
				catch (error) {
					console.log(error)
				}
			}
			getScore()
		}, [])


		return (<div className={style.AuthPage}>
			<AuthBanner icon={calculateImage} text={
				`Calculating a score based on what we found...`
			} />
			<CTAButton buttonText='dashboard'
				click={() => 'stuff'}
			/>
			<Link to='/dashboard'>
				<button>test</button>
			</Link>
		</div>
		)
	}

	return (
		<div className={style.AuthPage}>
			{messageSigned ?
				<AuthCalculateScore />
				:
				<AuthConnectedMessage />
			}
		</div>
	)
}

export default AuthPage;