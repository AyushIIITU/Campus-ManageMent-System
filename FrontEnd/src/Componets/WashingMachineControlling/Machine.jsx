import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GardContextProvider from "../../Context/GardContextProvider";
// import GardContext from "../../../context/GardContext";
import GardLoginProfile from "./GardLoginProfile";
import MachineUserGardController from "./MachineUserGardController";

const Machine=()=>{
    // const  [gardName, setGardName] = useState();
    // const [gardNumber,setGardNumber]=useState();
    // const {setGard}=useContext(GardContext);
    // const nevigat=useNavigate()
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const token = localStorage.getItem("token");
                
    //             const response = await axios.get("http://localhost:3000/gard/profile", {
    //                 headers: {
    //                         Authorization: `Bearer ${token}`
                            
    //                 }
    //             });
    //             console.log(response.data);
    //             setGard({
    //                 gardName:response.data.userName,
    //                 gardPhoneNumber:response.data.phoneNumber,
    //             })
                

    //             // setGardDetail(response.data);
                
    //         }
    //         catch (err) {
    //             console.log("Error", err.response.status);
    //             if(err.response.status === 401){
    //                 localStorage.removeItem('token');
    //                 nevigat("/gardlogin");
    //             }
    //         }
    //     }
    //     fetchData();
    // },[]);
    return (
        <GardContextProvider>
            <GardLoginProfile/>
            <MachineUserGardController/>
        
    </GardContextProvider>
    )
};
export  default Machine;