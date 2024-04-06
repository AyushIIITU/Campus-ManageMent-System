import { useRef } from "react";
import "./UserInput.css";
// eslint-disable-next-line react/prop-types
function UserInput({ addUserToQueue }) {
  // const refName=useRef("");
    const refPhone=useRef("");
    // const refRoomNo=useRef("");
    const refTime=useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    //   year, month, day,
    // hours, minutes, seconds, milliseconds
    //   let Year=new Date().getFullYear();
    //   let Month=new Date().getMonth();
    //   let Day=new Date().getDay();
    //   let Hours=new Date().getHours();
    //   let Minutes=new Date().getMinutes();
    //   let Seconds=new Date().getSeconds();
    // let CurrentTimeAdd=new Date().getTime();
    
    // const name=refName.current.value;
    const phoneNumber=parseInt(refPhone.current.value);
    // const roomNo=parseInt(refRoomNo.current.value);
    const time=refTime.current.value;
    // if(phoneNumber[0]!='1' || phoneNumber.length!=11){
    //   alert('Please enter a valid mobile number');
    //   return ;
    //   }
    // console.log(name);
    const userData = {
      id:localStorage.getItem('StudentName'), 
      
      phoneNumber: phoneNumber,
      roomNo:localStorage.getItem('StudentRoomNo'),
      time: time*600,

    };
    

    addUserToQueue(userData);
  };

  return (
    <center>
      
      <div className="custom-search">
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="time"
            ref={refTime}
            className="custom-search-input"
            placeholder="Enter time in minutes"
          />
          <input
            type="number"
            name="Phone"
            ref={refPhone}
            className="custom-search-input"
            placeholder="Enter Phone No"
          />
          <button type="submit" className="custom-search-botton">
            Join Queue
          </button>
        </form>
      </div>
    </center>
  );
}
export default UserInput;
