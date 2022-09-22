import React, { useState, useContext, useEffect } from 'react';
import style from './Dashboard.module.css'
import CTAButton from '../../components/CTAButton/CTAButton';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';
import ImpactScore from '../../components/ImpactScore/ImpactScore';
import { UserContext } from '../../contexts/UserContext';
import Spinner from '../../components/Spinner/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import DashboardContent from '../../data/DashboardContent';


const Dashboard = () => {
	const { address, isConnected } = useAccount();
	const navigate = useNavigate();

	const goToHome = () => {
		navigate('/home')
	}

	useEffect(() => {
		!isConnected && goToHome()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [goToHome])

	const { impactScore } = useContext(UserContext)
	console.log(useContext(UserContext))


	return (
		<div className={style.Dashboard}>
			<div className={style.ImpactScoreContainer}>
				<ImpactScore value={impactScore} maxValue={100} />
			</div>

			<div className={style.DashboardButtons}>
				{/* <CTAButton buttonText='Share to lens' click={() => 'hi'} /> */}

				<Link to='/NFT'>
					<CTAButton
						buttonText='Impact NFT'
						click={() => 'Impact NFT'} />
				</Link>
			</div>

			<ExplanationBox
				ExplanationBoxText='What can you do with your impact score?'
				ExplanationContent={DashboardContent.explanationData}
			/>

			<Link to='/NFT'>
				<CTAButton
					buttonText='Choose privacy settings'
					click={() => 'hi'} />
			</Link>
		</div>
	)
}

export default Dashboard;