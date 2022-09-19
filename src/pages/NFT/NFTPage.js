import React from 'react';
import style from './NFTPage.module.css';
import NFTImage from '../../assets/NFT-test.png'
import CTAButtton from '../../components/CTAButton/CTAButton';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';

const NFTPage = () => {
	return (
		<div>
			<div>
				<img src={NFTImage} alt="" />
				<span>Your NFT has been minted to address</span>
				<CTAButtton buttonText='View ' />
			</div>
			<ExplanationBox />
		</div>
	)
}

export default NFTPage