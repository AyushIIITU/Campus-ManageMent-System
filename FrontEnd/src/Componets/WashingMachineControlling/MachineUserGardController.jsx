import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GardContext from "../../Context/GardContext";
import WashMachine from "./WashMachine";

const MachineUserGardController=()=>{
    const nevigat=useNavigate()
    const {setGard}=useContext(GardContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                
                const response = await axios.get("http://localhost:3000/gard/profile", {
                    headers: {
                            Authorization: `Bearer ${token}`
                            
                    }
                });
                console.log(response.data);
                setGard([response.data.userName,response.data.phoneNumber]);
                

                // setGardDetail(response.data);
                
            }
            catch (err) {
                console.log("Error", err.response.status);
                if(err.response.status === 401){
                    localStorage.removeItem('token');
                    nevigat("/gardlogin");
                }
            }
        }
        fetchData();
    },[]);
    return (
        <>
        <WashMachine></WashMachine>
        </>
    )
};
export default MachineUserGardController;