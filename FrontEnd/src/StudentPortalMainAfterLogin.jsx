// import React from 'react'

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import App from "./App";

function StudentPortalMainAfterLogin() {
    const nevigat=useNavigate()
    // const {setGard}=useContext(GardContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                
                const response = await axios.get("http://localhost:3000/student/profile", {
                    headers: {
                            Authorization: `Bearer ${token}`
                            
                    }
                });
                console.log(response.data);
                // setGard([response.data.userName,response.data.phoneNumber]);
                

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
    <App></App>
  )
}

export default StudentPortalMainAfterLogin