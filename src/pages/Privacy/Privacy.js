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



const Privacy = () => {
	const [isPrivate, setIsPrivate] = useState(false)

	const changePrivacy = () => {
		isPrivate ? setIsPrivate(false) : setIsPrivate(true)
	}

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

				<div className={style.ButtonsContainer}>
					{isPrivate ? <CTAButtton
						click={changePrivacy}
						buttonIcon={unlockIcon}
						buttonText='MAKE IMPACT SELF PUBLIC' />
						
						: 
						
						<CTAButtton
						click={changePrivacy}
						buttonIcon={lockIcon}
						buttonText='MAKE IMPACT SELF PRIVATE' />
						}

					<div className={style.Switch}>
						<input type="checkbox" onChange={changePrivacy} />
					</div>


					<CTAButtton
						buttonIcon={saveIcon}
						buttonText='Save to chain' />
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