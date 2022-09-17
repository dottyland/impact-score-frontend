import React from 'react';
import style from './CTAButton.module.css';

const CTAButtton = props => {
	return (
		<button
			className={style.CTAButton}
			onClick={
				props.click()
			}>
			{props.buttonText.toUpperCase()}
		</button>
	)
}

export default CTAButtton;