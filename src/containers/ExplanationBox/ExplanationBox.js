import React from 'react'
import style from './ExplanationBox.module.css'
import Explanation from '../../components/Explanation/Explanation';

const ExplanationBox = props => {
	return (
		<div className={style.ExplanationBox}>
			<div className={style.ExplanationBoxContainer}>
				<h1 className={style.ExplanationBoxText}>
					{props.ExplanationBoxText}
				</h1>

				<div className={style.ExplanationWrapper}>
					{props.ExplanationContent.map((content) =>
						<Explanation
							NumberText={content.NumberText}
							ExplanationText = {content.ExplanationText}
							ExplanationDetails = {content.ExplanationDetails}
						/>)}
				</div>
			</div>
		</div>
	)
}

export default ExplanationBox