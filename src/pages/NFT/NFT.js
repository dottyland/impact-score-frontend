import React from "react";
import style from './NFT.module.css';

const NFT = props => {
	return (
		<div className={style.NFT}>
			<img src={props.NFTImage} alt="" />
		</div>
	)
}

export default NFT;