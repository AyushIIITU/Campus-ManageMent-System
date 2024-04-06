import { useRef } from "react";
import "./PauseAllow.css";

const PauseAllowing = ({ handlePauseUser }) => {
  const pausePassword = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
  
    handlePauseUser(pausePassword.current.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="textInputWrapper">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter Key To Pause"
          type="password"
          onClick={handleKeyPress}
          ref={pausePassword}
          className="textInput"
        />
      </form>
    </div>
  );
};

export default PauseAllowing;
