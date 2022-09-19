import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../../contexts/UserContext';
import style from './ImpactScore.module.css';
import axios from "axios";
const ImpactScore = ({ value, maxValue }) => {
  const {
		walletAddress,
		isLoggedIn
	} = useContext(UserContext);
  const [score,setScore]=useState(0);
  async function scoreCalculate(){
	
  }
  useEffect(()=>{
    async function calculate(){
      const result=await axios.get("https://impact-api.vercel.app/api/abc/"+walletAddress,{}).then((res)=>res)
    .catch((e)=>{
      console.log('e :>> ', e);
      return e.response;
     
    })
    if(result.status===200)
    setScore(result.data.score);
    else
      setScore(25);
    }
    calculate();
  },[walletAddress])
  const val = (score / maxValue) * 100;
  const deg = (180 / 100) * val;
  return (
    <div className={style.indicator}>
      <span className={style.bar} style={{ transform: `rotate(${deg}deg)` }} />
      <span className={style.result}>
        <span>{score}</span>
      </span>
    </div>
  );
}


export default ImpactScore