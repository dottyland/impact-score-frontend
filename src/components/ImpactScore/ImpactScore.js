import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../../contexts/UserContext';
import { useAccount } from 'wagmi';
import style from './ImpactScore.module.css';
import axios from "axios";
const ImpactScore = ({ value, maxValue }) => {
  const { address, isConnected } = useAccount()
  const [score,setScore]=useState(0);
  useEffect(()=>{
    async function calculate(){
      const result=await axios.get("https://impact-api.vercel.app/api/abc/"+address,{}).then((res)=>res)
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
  },[address])
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