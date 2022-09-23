import React from 'react';
import style from './Privacy.module.css';
import NFTImage from '../../assets/NFT-test.png'
import CTAButtton from '../../components/CTAButton/CTAButton';
import { Link } from 'react-router-dom';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';
import PrivacyContent from '../../data/PrivacyContent';


const Privacy = () => {
	return (
		<div className={style.PrivacyPage}>
			<span className={style.PageTitle}>
				{PrivacyContent.pageTitle}
			</span>

			<div className={style.PrivacyDetails}>
				<img src={NFTImage} alt="" />

				<div className={style.ButtonsContainer}>
					<Link to='/NFTs'>
						<CTAButtton buttonText='Make impact self public' />
					</Link>

					<Link to='/NFTs'>
						<CTAButtton buttonText='Make impact self private' />
					</Link>
				</div>
			</div>
			<ExplanationBox
				ExplanationBoxText='Why we think you should make it public '
				ExplanationContent={PrivacyContent.explanationData}
			/>

			<div className={style.ButtonsContainer}>
				<CTAButtton buttonText='Share on Twitter' />
				<CTAButtton buttonText='Share on Lens' />
			</div>
		</div>
	)
}

export default Privacy;