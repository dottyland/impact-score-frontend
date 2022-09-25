
import React, { useEffect, useState } from 'react';
import { gql } from '@apollo/client';

import style from './NFTPage.module.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

import CTAButtton from '../../components/CTAButton/CTAButton';

import { useAccount, useProvider,useSignMessage } from 'wagmi'
import { Link } from 'react-router-dom';

import { apolloClient } from '../../components/apollo-client';//
import Lock from '../../abi/Unlock.json'
import {ethers} from 'ethers'

import twitterIcon from '../../assets/bi_twitter.svg';
import shareIcon from '../../assets/share_lens.svg';
import eyeIcon from '../../assets/eyeIcon.svg';
import {Buffer} from 'buffer';





const NFTPage = () => {
	
	const [imageData,setImageData]=useState();
	const provider=useProvider();
	const {authToken,setAuthToken,refreshToken,setRefreshToken}=useContext(UserContext);
	console.log('apolloClient :>> ', apolloClient);
	const { signMessageAsync } = useSignMessage();
	const {address}=useAccount();
	const [nftData,setNftData]=useState({});
	const [lUrl,setlUrl]=useState({});
	const [lData,setLData]=useState({});
	const [id,setId]=useState("-1")
	const contract=new ethers.Contract("0x7291EBbf2633b6816545Ae33BA5795da3b0E983B",Lock,provider);
	const getTokenId=async()=>{
		const res= await contract.tokenOfOwnerByIndex(address,ethers.BigNumber.from(0));
		const a = ethers.BigNumber.from(res);
		setId(res.toString())
	}
	const tokenUri=async()=>{
		//		
		const tokenId=ethers.BigNumber.from(id);
		const data= await contract.tokenURI(tokenId);
		const buf=Buffer.from(data.substring(29),'base64')
		
		let temp=buf.toString('ascii');
		const jso=JSON.parse(temp)
		let metadata={};
		const a=Date.now().toString();
		metadata.version="one";
		metadata.metadata_id="madmaxo12312"+a;
		metadata.media="XYZ";
		metadata.locale="en";
		metadata.mainContentFocus="ARTICLE";
		metadata.attributes=jso.attributes;
		metadata.image=jso.image_data;
		metadata.name=jso.name
		metadata.imageMimeType="image/svg+xml"
		const strin=JSON.stringify(jso)
		const lstrin=JSON.stringify(metadata);
		const lcode= Buffer.from(lstrin).toString('base64');
		const link=prefix+lcode;
		const recode=Buffer.from(strin).toString('base64');
		const url=prefix+recode;
		const Data= await fetch(data);
		const jData=await Data.json();
		const image=await fetch(jData.image_data)
		console.log('image :>> ', image);
		setImageData(image);
		setNftData(jData);
		setLData(metadata);
		setlUrl(link)
	}
	useEffect(()=>{
		getTokenId();
	},[address])
	useEffect(()=>{
		if(id!=="-1")
		tokenUri();
	},[id])
	const prefix=`data:application/json;base64,`

	const queryExample = async () => {
		const query  = `
			query Challenge {
				challenge(request: { address: "${address}" }) {
				  text
				}
			  }
	`
	
	const response = await apolloClient.query({
		query: gql(query),
	  })
	  const signature = await signMessageAsync({message:response.data.challenge.text});
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
	 
	  
	  setAuthToken(login.data.authenticate.accessToken)
	  setRefreshToken(login.data.authenticate.refreshToken)
	}
	const p2=async()=>{
		
		const qCreateProfile=`mutation CreateProfile {
			createProfile(request:{ 
						  handle: "madmax11111111111122221323",
						  profilePictureUri: null,
						  followNFTURI: null,
						  followModule: null
						  }) {
			  ... on RelayerResult {
				txHash
			  }
			  ... on RelayError {
				reason
			  }
			  __typename
			}
		  }`
		const createProfile=await apolloClient.mutate({
			mutation:gql(qCreateProfile),
				context: { 
				  headers: { 
					"x-access-token": authToken,  // this header will reach the server
				  } 
				},
		  })
		  const qProfile=`query Profile {
			profile(request: { handle: "madmax11111111111122221323.test" }) {
			  id
			  name
			  bio
			  attributes {
				displayType
				traitType
				key
				value
			  }
			  followNftAddress
			  metadata
			  isDefault
			  picture {
				... on NftImage {
				  contractAddress
				  tokenId
				  uri
				  verified
				}
				... on MediaSet {
				  original {
					url
					mimeType
				  }
				}
				__typename
			  }
			  handle
			  coverPicture {
				... on NftImage {
				  contractAddress
				  tokenId
				  uri
				  verified
				}
				... on MediaSet {
				  original {
					url
					mimeType
				  }
				}
				__typename
			  }
			  ownedBy
			  dispatcher {
				address
				canUseRelay
			  }
			  stats {
				totalFollowers
				totalFollowing
				totalPosts
				totalComments
				totalMirrors
				totalPublications
				totalCollects
			  }
			  followModule {
				... on FeeFollowModuleSettings {
				  type
				  amount {
					asset {
					  symbol
					  name
					  decimals
					  address
					}
					value
				  }
				  recipient
				}
				... on ProfileFollowModuleSettings {
				  type
				}
				... on RevertFollowModuleSettings {
				  type
				}
			  }
			}
		  }`
		  
			  const fetchProfile=await apolloClient.query({
				query:gql(qProfile),
			  })
		const mPost=`mutation CreatePostTypedData {
			createPostTypedData(request: {
			  profileId: "${fetchProfile.data.profile.id}",
			  contentURI: "${lUrl}",
			  collectModule: {
				freeCollectModule:  {
					followerOnly: true
				 }
			},
			referenceModule: {
				followerOnlyReferenceModule: false
			}
			}) {
			  id
			  expiresAt
			  typedData {
				types {
				  PostWithSig {
					name
					type
				  }
				}
				domain {
				  name
				  chainId
				  version
				  verifyingContract
				}
				value {
				  nonce
				  deadline
				  profileId
				  contentURI
				  collectModule
				  collectModuleInitData
				  referenceModule
				  referenceModuleInitData
				}
			  }
			}
		  }`
		  const createP=await apolloClient.mutate({
			mutation:gql(mPost),
				context: { 
				  headers: { 
					"x-access-token": authToken,  // this header will reach the server
				  } 
				},
		  })
		  let data=createP.data.createPostTypedData.typedData.value.contentURI
		  const buf=Buffer.from(data.substring(29),'base64')
		
		let temp=buf.toString('ascii');
		const jso=JSON.parse(temp)
		  console.log('createP :>> ', createP);
		  console.log('NFTData :>> ', jso);
	}
	return (
		
		<div className={style.NFTPage}>
			<div className={style.NFTDetails}>
				<img src={imageData?imageData:undefined} alt="AV" className={style.NFTImage} />
				<span className={style.PageTitle}>Congratulations, you are Impact Self #{id}!</span>
				{nftData&&(<span className={style.PageTitle}>{nftData.attributes?.[0].score}</span>)}
				<div className={style.ButtonsContainer}>
					<CTAButtton
						buttonIcon={shareIcon}
						buttonText='Sign in With Lens'
						click = {queryExample} />
					<CTAButtton
						buttonIcon={shareIcon}
						buttonText='Share on Lens'
						click = {p2} />
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