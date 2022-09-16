import React from "react";
import style from './AuthBanner.module.css';

const AuthBanner = props => {
	return (
		<div className={style.AuthBanner}>
			<span>Icon</span>
			<span className={style.BannerText}>
				Text
			</span>
		</div>
	)
}

export default AuthBanner;