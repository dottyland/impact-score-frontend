import React from "react";
import style from './AuthBanner.module.css';

const AuthBanner = props => {
	return (
		<div className={style.AuthBanner}>
			<div className={style.BannerImage}>
				<img src={props.icon} alt="" />
			</div>

			<span className={style.BannerText}>
				{props.text}
		</span>
		</div>
	)
}

export default AuthBanner;