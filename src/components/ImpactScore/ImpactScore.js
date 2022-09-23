import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext';
import { useAccount } from 'wagmi';
import style from './ImpactScore.module.css';
import axios from "axios";
import Spinner from '../Spinner/Spinner';

const ImpactScore = ({ value, maxValue }) => {
	const { address, isConnected } = useAccount()
	const [score, setScore] = useState(0);
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		async function calculate() {
			setIsLoading(true)
			const result = await axios.get("https://impact-api.vercel.app/api/abc/" + address, {}).then((res) => {
				setIsLoading(false)
				return res
			})
				.catch((e) => {
					console.log('e :>> ', e);
					return e.response;

				})
			if (result.status === 200)
				setScore(result.data.score);
			else
				setScore(25);
		}
		calculate();
	}, [address])
	const val = (score / maxValue) * 100;
	const deg = (180 / 100) * val;
	return (
		isLoading ? <Spinner /> :
			<div className={style.ImpactContainer}>
				<span className={style.ImpactHeading}>
					Your impact score is: Awesome!
				</span>

				<span className={style.ImpactHeading}>
					Congrats - you're on level 2!
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