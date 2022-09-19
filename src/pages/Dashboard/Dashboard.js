import React, {useContext} from 'react';
import style from './Dashboard.module.css'
import CTAButton from '../../components/CTAButton/CTAButton';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';
import ImpactScore from '../../components/ImpactScore/ImpactScore';
import { UserContext } from '../../contexts/UserContext';

const Dashboard = () => {
	const {impactScore} = useContext(UserContext)
	console.log(useContext(UserContext))

	return (
		<div className={style.Dashboard}>
			<div className={style.ImpactScoreContainer}>
				<span>Your impact score is: Excellent</span>
				<ImpactScore value={impactScore} maxValue={100} />
			</div>

			<div className={style.DashboardButtons}>
				<CTAButton buttonText='stuff' click={() => 'hi'} />
				<CTAButton buttonText='stuff' click={() => 'hi'} />
			</div>

			<ExplanationBox />
		</div>
	)
}

export default Dashboard;