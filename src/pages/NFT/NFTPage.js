import React from 'react';
import style from './NFTPage.module.css';
import NFTImage from '../../assets/NFT-test.png'
import CTAButtton from '../../components/CTAButton/CTAButton';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Link } from 'react-router-dom';

const NFTPage = () => {
	const { address, isConnected } = useAccount();

	return (
		<div className={style.NFTPage}>
			<div className={style.NFTDetails}>
				<img src={NFTImage} alt="" />
				<span>Your NFT has been minted to address: {address}</span>

				<Link to='/NFTs'>
					<CTAButtton buttonText='View ' />
				</Link>

			</div>
			<ExplanationBox />
		</div>
	)
}

export default NFTPage