import React from 'react';
import style from './CTAButton.module.css';

const CTAButtton = props => {
	return (
		<button
			className={style.CTAButton}
			onClick={
				props.click()
			}>
			<img src={props.buttonIcon} alt="" className={style.ButtonIcon} />
			{props.buttonText.toUpperCase()}
		</button>
	)
}

export default CTAButtton;