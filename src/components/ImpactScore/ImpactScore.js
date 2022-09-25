import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext';
import { useAccount } from 'wagmi';
import style from './ImpactScore.module.css';
import axios from "axios";
import Spinner from '../Spinner/Spinner';

const API_URL = 'https://impact-api-bepw.vercel.app'
const ImpactScore = ({ value, maxValue }) => {
	const { address, isConnected } = useAccount()
	const [score, setScore] = useState(0);
	const [isLoading, setIsLoading] = useState(false)
	const {mNonce}=useContext(UserContext)
	
	useEffect(() => {
		async function calculate() {
			setIsLoading(true)
			const res2 = await fetch(`${API_URL}/api/calculate`, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					address: await address,
					nonce: mNonce
				}),
				credentials: "include"
			});
			if(res2.status===200)
				{
					console.log("object",res2);
					let data=await res2.json();
					setScore( data.score);
				}
			else
			{
				console.log("Error");
			}
			setIsLoading(false)
			
		}
		calculate();
	}, [address])
	const val = (score / maxValue) * 100;
	const deg = (180 / 100) * val;
	return (
		isLoading ? <Spinner /> :
			<div className={style.ImpactContainer}>
				<span className={style.ImpactHeading}>
					{score >= 72 ?
						'Your impact score is: Awesome!' : 'Your impact score is good!'}
				</span>

				<span className={style.ImpactHeading}>
					{score >= 72 ?
						"Congrats - you're on level 2!" : "Congrats - you're on level 1!"}
				</span>

				<div className={style.indicator}>
					<span className={style.bar} style={{ transform: `rotate(${deg}deg)` }} />
					<span className={style.result}>
						<span>{score}</span>
					</span>
				</div>
			</div>

	);
}


export default ImpactScore