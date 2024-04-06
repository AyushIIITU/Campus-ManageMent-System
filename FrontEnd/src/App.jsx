// import React from 'react';
import HeaderStudentPortal from "./Header";
import SideNavBar from "./StudentSideBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import ProperMarginDueToSideNav from "./ProperMarginDueToSideNav";
import StudentContextProvider from './Context/StudentContextProvider.jsx';
import { useEffect } from "react";
import axios from "axios";

function App() {
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
                    nevigat("/StudentLogin");
                }
            }
        }
        fetchData();
    },[]);
  return (
    <>
    <StudentContextProvider>
      <HeaderStudentPortal />
      {/* <Student></Student> */}
      <SideNavBar />
      <ProperMarginDueToSideNav>
        <Outlet />
      </ProperMarginDueToSideNav>
      </StudentContextProvider>
   </>
  );
}

export default App;
