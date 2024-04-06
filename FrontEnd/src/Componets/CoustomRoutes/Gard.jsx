// import './Gard.css'

import { useEffect, useState } from "react";
import LoginAuthentication from "./Login";
import "./loginback.css";
import backGround from "../../Svg/IIIT-UNA.svg";
import axios from "axios";
import { useNavigate} from "react-router-dom";
// import Machine from "./Components/WashingMachine/Machine";
// useEffect(() => {
//   const fetchData = async () => {
//       try {
//           const token = localStorage.getItem("accessToken");
//           const response = await axios.get("http://localhost:3000/profile", {
//               headers: {
//                   Authorization: token
//               }
//           });
//           setProfile(response.data.response);
//           setImage(response.data.response.image);
//       }
//       catch (err) {
//           console.log("Error", err);
//       }
//   }
//   fetchData();
// },[]);
function Gard() {
  const [gardData,setGardData]=useState([]);
  const [Error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const [message,setmessage]= useState("");
  const navigate=useNavigate();
  /*useEffect(() =>{
    (
      async()=>{
        try {
          setError(false);
          setLoading(true);
        const response=await axios.get('http://localhost:3000/gard');
        setGardData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      
      console.error("Error in fetching gard data:",error);
    }
    })()
  },[]);*/
  
  // if(loading){
  //   return <h1>Loading...</h1>
  // }
  // if(Error){
  //   return <h1>Somthing Went Wrong </h1>
  // }
  
  // let Message = "";
  /*
  const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleRegister = async (e) => {
        const username = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        e.preventDefault();
        if (confirmPassword !== password) {
            toast.error("Password does not match!");
            return;
        }
        
        try {
            const response = await axios.post("http://localhost:3000/register", { username, password });
            console.log(response);
            if (response.status === 200) {
            toast.success("Account created successfully! You can now login");
            }
            emailRef.current.value = "";
            passwordRef.current.value = "";
            confirmPasswordRef.current.value = "";
        }
        catch (err) {
            console.log("Error:", err);
            if (err.response && err.response.status === 409) {
                toast.error("User already exists!");
            }
            else {
                toast.error("An unexpected error occurred.");
            }
        }
    }
*/

let VerifyUser = async (username, phoneNo) => {
  try {
      const response = await axios.post("http://localhost:3000/gard/login", {
          userName: username,
          phoneNo: phoneNo
      });
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate("/WashingMachineControling");
  } catch (err) {
      console.log("Error in Authorization:", err);
  }
}
  
  return (
    <div className="svg-background" style={{backgroundImage: `url(${backGround})`}}>
      <LoginAuthentication verifyUser={VerifyUser} message={message}  />
      {/* <h1>{message}</h1> */}
      {/* <button type="submit" className="btn btn-primary btn-block mb-4">
                    Log In
                  </button> */}
                  {/* <button onClick={()=>console.log(gardData)}>Click</button> */}
    </div>
  );
}

export default Gard;