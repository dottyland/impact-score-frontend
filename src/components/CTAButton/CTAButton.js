import React from 'react';
import style from './CTAButton.module.css';

const CTAButtton = props => {
	return (
		<button className={style.CTAButton}>
			{props.buttonText}
		</button>
	)
}

export default CTAButtton;