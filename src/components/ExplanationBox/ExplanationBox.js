import React from 'react'
import style from './ExplanationBox.module.css'
import Explanation from '../Explanation/Explanation';

const ExplanationBox = () => {
	return (
		<div className={style.ExplanationBox}>
			<div className={style.ExplanationBoxContainer}>
				<Explanation />
				<Explanation />
				<Explanation />
			</div>
		</div>
	)
}

export default ExplanationBox