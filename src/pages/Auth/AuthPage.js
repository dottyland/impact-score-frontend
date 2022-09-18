import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './AuthPage.module.css';
import AuthBanner from '../../components/Banners/AuthBanner';
import CTAButton from '../../components/CTAButton/CTAButton';
import calculateImage from '../../../assets/calculate.svg';
import scanImage from '../../../assets/scan.svg';
import authenticateImage from '../../../assets/authentication.svg';
import { UserContext } from '../../contexts/UserContext';

const AuthPage = () => {

	const [messageSigned, setmessageSigned] = useState(false)
	const { walletAddress } = useContext(UserContext);

	const AuthConnectedMessage = () => {
		return (<div className={style.AuthPage}>
			<AuthBanner icon={authenticateImage} text={
				`Your address: ${walletAddress} is connected. We just need you to sign a message to confirm it’s yours.`
			} />
			<CTAButton buttonText='Sign message'
				click={() => 'stuff'}
			/>
			<Link to='/dashboard'>
				<button>test</button>
			</Link>
		</div>
		)
	}

	const AuthSignMessage = () => {
		return (<div className={style.AuthPage}>
			<AuthBanner icon={scanImage} text={
				`Your address: ${walletAddress} is connected. We just need you to sign a message to confirm it’s yours.`
			} />
			<CTAButton buttonText='calculate score'
				click={() => 'stuff'}
			/>
			<Link to='/dashboard'>
				<button>test</button>
			</Link>
		</div>
		)
	}

	const AuthCalculateScore = () => {
		return (<div className={style.AuthPage}>
			<AuthBanner icon={calculateImage} text={
				`Your address: ${walletAddress} is connected. We just need you to sign a message to confirm it’s yours.`
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
			<AuthConnectedMessage/>
			<AuthSignMessage/>
			<AuthCalculateScore/>		
		</div>
	)
}

export default AuthPage;