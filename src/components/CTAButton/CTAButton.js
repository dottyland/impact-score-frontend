import React from 'react';
import style from './CTAButton.module.css';

const CTAButtton = props => {
	return (
		<button
			className={style.CTAButton}
			onClick={
				props.click
			}>
			<div className={style.ButtonContent}>
				<img src={props.buttonIcon} alt="" className={style.ButtonIcon} />
				<span>
					{props.buttonText.toUpperCase()}
				</span>
			</div>
		</button>
	)
}

export default CTAButtton;