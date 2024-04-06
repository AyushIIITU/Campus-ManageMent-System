import { useState } from 'react';
import "./PauseMachine.css";
import PauseAllowing from './PauseAllow';
import RemovePauseButton from './RemovePauseButton';

// eslint-disable-next-line react/prop-types
const PauseMachine = ({ pauseMachine, resumeMachine }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      // console.log("Machine paused");
      pauseMachine();
    } else {
      // console.log("Resume the machine");
      resumeMachine();
    }
  };

  const handlePauseUser = (password) => {
    if (password === "Ayush") {
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
    }
  };
  const handleDeleteButton=()=>{
    setIsPasswordCorrect(false);
  }
  return (
    <div className="positionOfSlider">
      {!isPasswordCorrect && <PauseAllowing handlePauseUser={handlePauseUser} />}
      {isPasswordCorrect && (
        <><RemovePauseButton handleDeleteButton={handleDeleteButton} /><div className="toggle-cont">
          <input
            className="toggle-input"
            id="toggle"
            name="toggle"
            type="checkbox"
            checked={isChecked}
            onChange={handleToggleChange} />
          <label className="toggle-label" htmlFor="toggle">
            <div className="cont-label-play">
              <span className="label-play"></span>
            </div>
          </label>
        </div></>
      )}
    </div>
  );
};

export default PauseMachine;
