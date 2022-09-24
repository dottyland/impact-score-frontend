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

					<a href="https://twitter.com/intent/tweet?text=I%20just%20claimed%20my%20Impact%20Self!%20Jealous?%20Join%20me%20in%20saving%20the%20🌍%20with%20Dottyland!">
						<CTAButtton buttonText='Share on Twitter' />
					</a>

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