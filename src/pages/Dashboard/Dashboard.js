import React, { useState, useContext, useEffect } from 'react';
import style from './Dashboard.module.css'
import CTAButton from '../../components/CTAButton/CTAButton';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';
import ImpactScore from '../../components/ImpactScore/ImpactScore';
import getIcon from '../../assets/getIcon.svg';
import selectIcon from '../../assets/selectIcon.png';
import { UserContext } from '../../contexts/UserContext';
import Spinner from '../../components/Spinner/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import DashboardContent from '../../data/DashboardContent';
import Lock from "../../abi/Unlock.json"
import {ethers} from 'ethers';
const Dashboard = () => {
	const { address, isConnected } = useAccount();
	const navigate = useNavigate();
	const { config } = usePrepareContractWrite({
		addressOrName: '0x7291EBbf2633b6816545Ae33BA5795da3b0E983B',
		contractInterface: Lock,
		functionName: 'purchase',
		args:[[ethers.BigNumber.from(0)],[address],["0x0000000000000000000000000000000000000000"],[address],["0x0000000000000000000000000000000000000000"]],
		
	  })
const { data, isLoading, isSuccess, write } = useContractWrite({
		...config,
		onSuccess(cancelData, variables, context) {
			console.log("Success!", cancelData,variables,context);
		  },
		  onError(error){
			console.log('error :>> ', error);
		  }
})

	const goToHome = () => {
		navigate('/home')
	}

	useEffect(() => {
		!isConnected && goToHome()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [goToHome])

	// const { impactScore } = useContext(UserContext)
	console.log(useContext(UserContext))


	return (
		<div className={style.Dashboard}>
			<div className={style.ImpactScoreContainer}>
				<ImpactScore maxValue={100} />
			</div>

			<div className={style.DashboardButtons}>
				{/* <CTAButton buttonText='Share to lens' click={() => 'hi'} /> */}

				
					<CTAButton
						buttonIcon={getIcon}
						buttonText='CLAIM IMPACT SELF NFT'
						click={() => {write()}} />

			</div>

			<ExplanationBox
				ExplanationBoxText='What can you do with your impact score?'
				ExplanationContent={DashboardContent.explanationData}
			/>

			<Link to='/privacy'>
				<CTAButton
					buttonIcon={selectIcon}
					buttonText='Choose privacy settings'
					click={() => 'hi'} />
			</Link>
		</div>
	)
}

export default Dashboard;