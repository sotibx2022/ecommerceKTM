import React, { useState } from "react";
import "./Timer.css";
import { useNavigate } from "react-router-dom";

const Timer = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const[minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0)
    const targetTime = new Date("12/1/2024");
    const navigate = useNavigate()
    setInterval(() => {
        const currentTime = Date.now();
        let remainingTime = targetTime - currentTime;
        remainingTime = remainingTime - 1000;
        let remainingTimeinDays = remainingTime/(1000 * 60 * 60 * 24)
        let remainingDays = Math.floor(remainingTimeinDays);
        let remainingDaysafterRoundUp = remainingTimeinDays - remainingDays;
        let remainingHours = Math.floor(remainingDaysafterRoundUp*24);
        let remainingMinutesafterRoundUp = ((remainingDaysafterRoundUp*24)-remainingHours)*60;
        let remainingMinutes = Math.floor(remainingMinutesafterRoundUp);
        let remainingSecondsAfterRoundUp = (remainingMinutesafterRoundUp - remainingMinutes)*60;
        let reminingSeconds = Math.floor(remainingSecondsAfterRoundUp);

       
        setDays(remainingDays);
        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(reminingSeconds)
    }, 1000);

  return (
    <div className="timerContainer">
      <p>Register now, to secure 10% off on your first purchase!</p>
      <div className="timer">
        <div className="days">
          <h1>{days}</h1>
          <span>Days</span>
        </div>
        <div className="hours">
          <h1>{hours}</h1>
          <span>Hours</span>
        </div>
        <div className="minutes">
          <h1>{minutes}</h1>
          <span>Minutes</span>
        </div>
        <div className="seconds">
          <h1>{seconds}</h1>
          <span>Seconds</span>
        </div>
      </div>
      <button className="registerBtn" onClick={()=>navigate("register")}>Register</button>
    </div>
  );
};

export default Timer;
