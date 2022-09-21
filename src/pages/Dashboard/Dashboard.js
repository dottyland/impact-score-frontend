import React, {useState, useContext} from 'react';
import style from './Dashboard.module.css'
import CTAButton from '../../components/CTAButton/CTAButton';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';
import ImpactScore from '../../components/ImpactScore/ImpactScore';
import { UserContext } from '../../contexts/UserContext';
import Spinner from '../../components/Spinner/Spinner';

const Dashboard = () => {
	const {impactScore} = useContext(UserContext)
	console.log(useContext(UserContext))
	return (
		<div className={style.Dashboard}>
			<div className={style.ImpactScoreContainer}>
				<ImpactScore value={impactScore} maxValue={100} />
			</div>

			<div className={style.DashboardButtons}>
				<CTAButton buttonText='Share to lens' click={() => 'hi'} />
				<CTAButton buttonText='Mint impact NFT' click={() => 'hi'} />
			</div>

			<ExplanationBox />
			<Spinner/>
		</div>
	)
}

export default Dashboard;