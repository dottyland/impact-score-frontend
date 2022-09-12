import React from 'react'
import style from './ExplanationBox.module.css'
import Explanation from '../Explanation/Explanation';

const ExplanationBox = () => {
	return (
		<div className={style.ExplanationBox}>
			<div className={style.ExplanationBoxContainer}>
				<h1 className={style.ExplanationBoxText}>
					Claim impact self
				</h1>

				<div className={style.ExplanationWrapper}>
					<Explanation />
					<Explanation />
					<Explanation />
				</div>
			</div>
		</div>
	)
}

export default ExplanationBox