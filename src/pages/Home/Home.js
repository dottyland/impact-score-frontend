import React from 'react';
import style from './Home.module.css';
import ExplanationBox from '../../components/ExplanationBox/ExplanationBox'
import CTAButton from '../../components/CTAButton/CTAButton'


const Home = () => {
	return (
		<div className={style.Home}>
			<span>
				Claim impact self
			</span>

			<span>For 7.7bln consumers to halt climate crisis, impact must become part of identity</span>
			<ExplanationBox/>
			<CTAButton />
		</div>
	)
}

export default Home;