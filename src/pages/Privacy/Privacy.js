import React, { useState } from 'react';
import style from './Privacy.module.css';
import NFTImage from '../../assets/NFTImage.png'
import CTAButtton from '../../components/CTAButton/CTAButton';
import { Link } from 'react-router-dom';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';
import PrivacyContent from '../../data/PrivacyContent';
import lockIcon from '../../assets/lock.svg';
import unlockIcon from '../../assets/unlock.svg';
import twitterIcon from '../../assets/bi_twitter.svg';
import shareIcon from '../../assets/share_lens.svg';
import saveIcon from '../../assets/saveIcon.svg';
import {useContractWrite, usePrepareContractWrite } from 'wagmi';
import {Switch} from "@mui/material"
import Hook from "../../abi/Hook.json";
const Privacy = () => {
	const [isPrivate, setIsPrivate] = useState(false)

	const changePrivacy = () => {
		setIsPrivate(!isPrivate)
	}
	const datax="data:application/json;base64,eyJuYW1lIjogIkltcGFjdCBORlQiLCAiZGVzY3JpcHRpb24iOiAiSW1wYWN0IiwgImltYWdlX2RhdGEiOiAiSGVsbG8iLCJhdHRyaWJ1dGVzIiA6W3sgInNjb3JlIjogIlByaXZhdGUifV19"
	
	
	const [val,setVal]=useState(false)
	const { config } = usePrepareContractWrite({
			addressOrName: '0x28F1f723CE0b469f241393804d1aC65106D96a8A',
			contractInterface: Hook,
			functionName: 'setPrivacy',
			args:[isPrivate],
			
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

			<div className={style.PrivacyInfo}>
				<span>
					Public: Everyone can see your Impact Self + your impact score.
				</span>

				<span>
					Private: People can see you have an Impact Self, but not your score or level.
				</span>

			</div>

			<div className={style.PrivacyDetails}>
				{
					isPrivate === false ?
						<img src={NFTImage} alt="" className={style.NFTImage} />
						: 'Your impact self is Private'

				}
				<Switch checked={isPrivate} onChange={changePrivacy}/>
				<div className={style.ButtonsContainer}>
					<CTAButtton
						buttonIcon={saveIcon}
						buttonText='Save to chain'
							click={write}
						/>
				</div>
			</div>
			{/* <ExplanationBox
				ExplanationBoxText=''
				ExplanationContent={PrivacyContent.explanationData}
			/> */}

			<div className={style.InfoBox}>
				<div className={style.TextContainer}>
					<span>
						Why we think you should make it public
					</span>

					<span>
						Amplify this message to help halt the climate crisis!
					</span>

					<span>
						We understand that not everyone is comfortable sharing their actions. We believe that the more we make our climate-positive actions part of who we are, and make it part of the conversation, the more people will join the movement and take action.
					</span>
				</div>

				<div className={style.ButtonsContainer}>
					<a href="https://twitter.com/intent/tweet?text=I%20just%20claimed%20my%20Impact%20Self!%20Jealous?%20Join%20me%20in%20saving%20the%20🌍%20with%20@dottyland_xyz!">
						<CTAButtton
							buttonIcon={twitterIcon}
							buttonText='Share on Twitter' />
					</a>
					<CTAButtton
						buttonIcon={shareIcon}
						buttonText='Share on Lens'
					/>
				</div>
			</div>
		</div>
	)
}

export default Privacy;