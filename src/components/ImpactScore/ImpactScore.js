import React from 'react'
import style from './ImpactScore.module.css';

const ImpactScore = ({ value, maxValue }) => {
  const val = (value / maxValue) * 100;
  const deg = (180 / 100) * val;
  return (
    <div className={style.indicator}>
      <span className={style.bar} style={{ transform: `rotate(${deg}deg)` }} />
      <span className={style.result}>
        <span>{value}</span>
      </span>
    </div>
  );
}


export default ImpactScore