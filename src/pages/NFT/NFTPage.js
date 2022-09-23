import React from 'react';
import style from './NFTPage.module.css';
import NFTImage from '../../assets/NFT-test.png'
import CTAButtton from '../../components/CTAButton/CTAButton';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Link } from 'react-router-dom';
import NFTContent from '../../data/NFTContent';

const NFTPage = () => {
	const { address, isConnected } = useAccount();

	return (
		<div className={style.NFTPage}>
			<div className={style.NFTDetails}>
				<img src={NFTImage} alt="" />
				<span className={style.PageTitle}>Congratulations, you are #21!</span>

				<div className={style.ButtonsContainer}>
					<Link to='/NFTs'>
						<CTAButtton buttonText='Share on lenster' />
					</Link>

					<Link to='/NFTs'>
						<CTAButtton buttonText='Share on Twitter' />
					</Link>

				</div>
			</div>
			<ExplanationBox
				ExplanationBoxText='Why share widely?'
				ExplanationContent={NFTContent.explanationData}
			/>
			<Link to='/NFTs'>
				<CTAButtton buttonText='View impact selves' />
			</Link>
		</div>
	)
}

export default NFTPage