import React, { useState } from 'react';
import style from './NFTPage.module.css';
import NFTImage from '../../assets/NFTImage.png'
import CTAButtton from '../../components/CTAButton/CTAButton';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Link } from 'react-router-dom';
import NFTContent from '../../data/NFTContent';
import twitterIcon from '../../assets/bi_twitter.svg';
import shareIcon from '../../assets/share_lens.svg';
import eyeIcon from '../../assets/eyeIcon.svg';



const NFTPage = () => {
	const { address, isConnected } = useAccount();

	return (
		<div className={style.NFTPage}>
			<div className={style.NFTDetails}>
				<img src={NFTImage} alt="" className={style.NFTImage} />
				<span className={style.PageTitle}>Congratulations, you are Impact Self #21!</span>

				<div className={style.ButtonsContainer}>
					<CTAButtton
						buttonIcon={shareIcon}
						buttonText='Share on lenster' />

					<a href="https://twitter.com/intent/tweet?text=I%20just%20claimed%20my%20Impact%20Self!%20Jealous?%20Join%20me%20in%20saving%20the%20🌍%20with%20@dottyland_xyz!">
						<CTAButtton
							buttonIcon={twitterIcon}
							buttonText='Share on Twitter' />
					</a>

				</div>
			</div>
			

			<div className={style.InfoBox}>
				<div className={style.TextContainer}>
					<span>Why share widely?</span>

					<span>The more we make our environmental impact a part of who we are, and part of the conversation, the more people will join the movement and take action. </span>

					<span>
						The wider the network of Impact Selves, the larger its impact and higher its value.
					</span>
				</div>
			</div>
			<Link to='/NFTs'>
				<CTAButtton
					buttonIcon={eyeIcon}
					buttonText='View impact selves' />
			</Link>
		</div>
	)
}

export default NFTPage