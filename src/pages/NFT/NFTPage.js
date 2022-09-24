
import React, { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import style from './NFTPage.module.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import NFTImage from '../../assets/NFTImage.png'
import CTAButtton from '../../components/CTAButton/CTAButton';
import ExplanationBox from '../../containers/ExplanationBox/ExplanationBox';
import { useAccount, useProvider,useSignMessage } from 'wagmi'
import { Link } from 'react-router-dom';
import NFTContent from '../../data/NFTContent';
import { apolloClient } from '../../components/apollo-client';
import Lock from '../../abi/Unlock.json'
import {ethers} from 'ethers'

import twitterIcon from '../../assets/bi_twitter.svg';
import shareIcon from '../../assets/share_lens.svg';
import eyeIcon from '../../assets/eyeIcon.svg';



const NFTPage = () => {
	const provider=useProvider();
	const {authToken,setAuthToken,refreshToken,setRefreshToken}=useContext(UserContext);
	
	const { signMessageAsync } = useSignMessage();
	const {address}=useAccount();
	const [nftData,setNftData]=useState({});
	const [id,setId]=useState("-1")
	const contract=new ethers.Contract("0x7291EBbf2633b6816545Ae33BA5795da3b0E983B",Lock,provider);
	const getTokenId=async()=>{
		const res= await contract.tokenOfOwnerByIndex(address,ethers.BigNumber.from(0));
		console.log('res :>> ', res);
		const a = ethers.BigNumber.from(res);
		console.log('a :>> ', a,a.toString());
		console.log('res.tos :>> ', res.toString());
		setId(res.toString())
	}
	const tokenUri=async()=>{
		const tokenId=ethers.BigNumber.from(id);
		const data= await contract.tokenURI(tokenId);
		console.log('data :>> ', data);
		console.log('window.btoa() :>> ', window.btoa(data.substring(29)));
		const Data= await fetch(data);
		const jData=await Data.json();
		console.log('jData :>> ', jData);
		setNftData(jData);
	}
	useEffect(()=>{
		getTokenId();
	},[address])
	useEffect(()=>{
		if(id!=="-1")
		tokenUri();
	},[id])

	const queryExample = async () => {
		const query  = `
			query Challenge {
				challenge(request: { address: "${address}" }) {
				  text
				}
			  }
	`
	const prefix=`data:application/json;base64,`
	const response = await apolloClient.query({
		query: gql(query),
	  })
	  console.log('response :>> ', response);
	  const signature = await signMessageAsync({message:response.data.challenge.text});
	  console.log('signature :>> ', signature);
	  const qLogin = `mutation Authenticate {
		authenticate(request: {
		  address: "${address}",
		  signature: "${signature}"
		}) {
		  accessToken
		  refreshToken
		}
	  }`
	   const login= await apolloClient.mutate({
		mutation: gql(qLogin),
	  })
	  console.log('Lens example data: ', response,login)
	  setAuthToken(login.data.authenticate.accessToken)
	  setRefreshToken(login.data.authenticate.refreshToken)
	}
	return (
		
		<div className={style.NFTPage}>
			<div className={style.NFTDetails}>
				<img src={nftData?.image_data} alt="AV" className={style.NFTImage} />
				<span className={style.PageTitle}>Congratulations, you are Impact Self #{id}!</span>
				{nftData&&(<span className={style.PageTitle}>{nftData.attributes?.[0].score}</span>)}
				<div className={style.ButtonsContainer}>
					<CTAButtton
						buttonIcon={shareIcon}
						buttonText='Share on lens'
						click = {queryExample} />
	
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