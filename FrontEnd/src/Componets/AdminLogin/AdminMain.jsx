// import React from 'react';

import { Outlet, useNavigate } from "react-router-dom";
// import ProperMarginDueToSideNav from "./ProperMarginDueToSideNav";

import { useEffect } from "react";
import axios from "axios";
import HeaderStudentPortal from "../../Header";
// import SideNavBar from "../../StudentSideBar";
import AdminSideNavBar from "./AdminSideNavBar";
import ProperMarginDueToSideNav from "../../ProperMarginDueToSideNav";

function AdminMain() {
  const nevigat=useNavigate()
    // const {setGard}=useContext(GardContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("Admintoken");
                
                const response = await axios.get("http://localhost:3000/admin/profile", {
                    headers: {
                            Authorization: `Bearer ${token}`
                            
                    }
                });
                console.log(response.data);
                // setGard([response.data.userName,response.data.phoneNumber]);
                

                // setGardDetail(response.data);
                
            }
            catch (err) {
                console.log("Error ", err.response.status);
                if(err.response.status === 401){
                    localStorage.removeItem('Admintoken');
                    nevigat("/AdminLogin");
                }
            }
        }
        fetchData();
    },[]);
  return (
    <>
    
      <HeaderStudentPortal/>
      {/* <Student></Student> */}
      <AdminSideNavBar/>
      <ProperMarginDueToSideNav>
        <Outlet />
      </ProperMarginDueToSideNav>
      
   </>
  );
}

export default AdminMain;
