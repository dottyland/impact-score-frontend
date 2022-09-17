import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import style from './AuthPage.module.css';
import AuthBanner from '../../components/Banners/AuthBanner';
import CTAButton from '../../components/CTAButton/CTAButton';
import calculateImage from '../../../assets/calculate.svg';
import scanImage from '../../../assets/scan.svg';
import authenticateImage from '../../../assets/authentication.svg';
import { UserContext } from '../../contexts/UserContext';

const AuthPage = () => {

	const value = useContext(UserContext);

	return (
		<div className={style.AuthPage}>
			<AuthBanner icon={calculateImage} text={value.walletAddress} />
			<CTAButton buttonText='stuff'
				click={() => 'stuff'}
			/>
			<Link to='/dashboard'>
				<button>test</button>
			</Link>
		</div>
	)
}

export default AuthPage;