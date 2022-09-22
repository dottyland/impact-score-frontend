import React from 'react';
import style from './Explanation.module.css';

const Explanation = props => {
	return (
		<div>
			<div className={style.Explanation}>
				<div className={style.NumberWrapper}>
					<span className={style.NumberText}>
						{props.NumberText}
					</span>
				</div>

				<div className={style.ExplanationTextWrapper}>
					<span className={style.ExplanationText}>
						{props.ExplanationText}
						Lorem ipsum dolor sit amet consectetur adipisicing
					</span>

					<span className={style.ExplanationDetails}>
						{props.ExplanationDetails}
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nobis provident nulla mollitia neque
					</span>
				</div>
			</div>
		</div>
	)
}

export default Explanation;