import React from 'react';
import style from './AuthPage.module.css';
import AuthBanner from '../../components/Banners/AuthBanner';
import CTAButton from '../../components/CTAButton/CTAButton';
import calculateImage from '../../../assets/calculate.svg';
import scanImage from '../../../assets/scan.svg';
import authenticateImage from '../../../assets/authentication.svg';


const AuthPage = () => {
	return (
		<div className={style.AuthPage}>
			<AuthBanner icon = {calculateImage} text = 'lorem and stuff'/>
			<CTAButton buttonText = 'stuff'
				click = {() => 'stuff'}
			/>
		</div>
	)
}

export default AuthPage;