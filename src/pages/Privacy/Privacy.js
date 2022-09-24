import React, { useState } from 'react';
import style from './Privacy.module.css';
import NFTImage from '../../assets/NFT-test.png'
import CTAButtton from '../../components/CTAButton/CTAButton';
import { Link } from 'react-router-dom';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';
import PrivacyContent from '../../data/PrivacyContent';
import {useContractWrite, usePrepareContractWrite } from 'wagmi';
import Hook from "../../abi/Hook.json";
import {ethers} from 'ethers';
const Privacy = () => {
	const [val,setVal]=useState(false)
	const togglePrivacy=(val)=>{
		setVal(val)
		write();
	}
	const { config } = usePrepareContractWrite({
			addressOrName: '0x4FC3dE097fa7e9ca167C19D8A783CeA78dA912Bf',
			contractInterface: JSON.stringify(Hook),
			functionName: 'setPrivacy',
			args:[ethers.BigNumber.from(12),val]
			
		  })
	const { data, isLoading, isSuccess, write } = useContractWrite({
			...config,
			onSuccess(cancelData, variables, context) {
				console.log("Success!", cancelData,variables,context);
			  }
	})
	return (
		<div className={style.PrivacyPage}>
			<span className={style.PageTitle}>
				{PrivacyContent.pageTitle}
			</span>

			<div className={style.PrivacyDetails}>
				<img src={NFTImage} alt="" />

				<div className={style.ButtonsContainer}>
					
						<CTAButtton buttonText='Make impact self public' click={()=>{togglePrivacy(false)}} />

						<CTAButtton buttonText='Make impact self private' click={()=>{togglePrivacy(true)}}/>
				</div>
			</div>
			<ExplanationBox
				ExplanationBoxText='Why we think you should make it public '
				ExplanationContent={PrivacyContent.explanationData}
			/>

			<div className={style.ButtonsContainer}>
				<a href="https://twitter.com/intent/tweet?text=I%20just%20claimed%20my%20Impact%20Self!%20Jealous?%20Join%20me%20in%20saving%20the%20🌍%20with%20Dottyland!">
					<CTAButtton buttonText='Share on Twitter' />
				</a>
				<CTAButtton buttonText='Share on Lens' />
			</div>
		</div>
	)
}

export default Privacy;