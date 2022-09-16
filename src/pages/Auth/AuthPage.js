import React from 'react';
import style from './AuthPage.module.css';
import AuthBanner from '../../components/Banners/AuthBanner';
import CTAButton from '../../components/CTAButton/CTAButton';

const AuthPage = () => {
	return (
		<div className={style.AuthPage}>
			<AuthBanner/>
			<CTAButton buttonText = 'stuff'
				click = {() => 'stuff'}
			/>
		</div>
	)
}

export default AuthPage;