import React from 'react';
import style from './NFTs.module.css'
import NFT from './NFT';
import NFTImage from '../../assets/NFT-test.png'

const NFTs = () => {
	return (
		<div className={style.NFTs}>
			<span className={style.PageTitle}>
				You are not alone. New Impact Selves being added and improved.
			</span>

			<div className={style.NFTsContainer}>
				<NFT NFTImage={NFTImage} />
				<NFT NFTImage={NFTImage} />
				<NFT NFTImage={NFTImage} />
				<NFT NFTImage={NFTImage} />
				<NFT NFTImage={NFTImage} />
				<NFT NFTImage={NFTImage} />
			</div>

		</div>
	)
}

export default NFTs