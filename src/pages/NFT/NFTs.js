import React from 'react';
import style from './NFTs.module.css'
import NFT from './NFT';
import NFTImage from '../../assets/NFT-test.png'

const NFTs = () => {
	return (
		<div className={style.NFTsContainer}>
			<NFT NFTImage={NFTImage} />
			<NFT NFTImage={NFTImage} />
			<NFT NFTImage={NFTImage} />
			<NFT NFTImage={NFTImage} />
			<NFT NFTImage={NFTImage} />
			<NFT NFTImage={NFTImage} />
		</div>
	)
}

export default NFTs