import React from 'react';
import style from './NFTPage.module.css';
import NFTImage from '../../assets/NFT-test.png'
import CTAButtton from '../../components/CTAButton/CTAButton';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const NFTPage = () => {
	const { address, isConnected } = useAccount();

	return (
		<div className={style.NFTPage}>
			<div className={style.NFTDetails}>
				<img src={NFTImage} alt="" />
				<span>Your NFT has been minted to address: {address}</span>
				<CTAButtton buttonText='View ' />
			</div>
			<ExplanationBox />
		</div>
	)
}

export default NFTPage