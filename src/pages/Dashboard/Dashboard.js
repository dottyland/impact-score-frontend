import React from 'react';
import style from './Dashboard.module.css'
import CTAButton from '../../components/CTAButton/CTAButton';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';

const Dashboard = () => {
	return (
		<div className={style.Dashboard}>
			<span>Your impact score is: Excellent</span>
			<div>
				dashboard progress bar
			</div>
			<div className={style.DashboardButtons}>
				<CTAButton/>
				<CTAButton/>
			</div>

			<ExplanationBox/>
		</div>
	)
}

export default Dashboard;