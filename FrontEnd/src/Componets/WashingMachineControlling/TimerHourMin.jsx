import { useState, useEffect } from "react";
// // import { FlipDate } from "./FlipDate";
// import { Flipr } from "../../FlipeCou/src/Flipr";
import "./TimerHourMin.css";
import { Flipr } from "./Flipr";
// eslint-disable-next-line react/prop-types
const TimerHourMin = ({ queue, isStopped }) => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  // 
  const firstUserTime=queue[0];
  useEffect(() => {
    if (!firstUserTime) {
      setProgress(0);
      setTimeRemaining(0);
      return;
    }

    let intervalId;
    let completedTime = 0;

    if (isStopped) {
      completedTime = Date.now() - firstUserTime.timeAtAdded;
    }

    intervalId = setInterval(() => {
      const currentTime = Date.now() + completedTime;
      let timeDiff;

      if (!isStopped) {
        timeDiff = firstUserTime.timeAtDelete - currentTime;
      } else {
        // timeDiff = completedTime;
      }

      setTimeRemaining(timeDiff < 0 ? 0 : timeDiff);
      const totalTime = firstUserTime.timeAtDelete - firstUserTime.timeAtAdded;
      // console.log(totalTime);
      const timeLeftPercentage = (timeDiff / totalTime) * 100;
      setProgress(timeLeftPercentage < 0 ? 0 : timeLeftPercentage);
    }, 1000);

    return () => clearInterval(intervalId);
}, [firstUserTime, isStopped]);


  return (
    <>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-success"
          role="progressbar"
          aria-valuenow={Math.ceil(progress)}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${progress}%` }}
        >{Math.ceil(progress)}%</div>
      </div>
      <div className="timerindicater">
        <div className="hour">
          <h1 style={{fontSize:"2em",marginTop:"1vh"}}>
          <Flipr
            value={
              timeRemaining
                ? Math.floor(Math.floor(timeRemaining / 600/2) / 60)
                : 0
            }
          /></h1>
          <center style={{"marginTop":"1.5vh"}}>Hour</center>
        </div>
        <span style={{margin:"1vh"}}/>
        <div className="min">
          <h1 style={{fontSize:"2em",marginTop:"1vh"}}>
          <Flipr
            value={timeRemaining ? Math.floor(timeRemaining / 600 / 2) % 60 : 0}
          /></h1>
          <center style={{"marginTop":"1.5vh"}}>Min</center>
        </div>
      </div>
    </>
  );
};

export default TimerHourMin;
