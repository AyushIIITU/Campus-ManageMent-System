import { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { FaHome } from "react-icons/fa";
import { MdLocalLaundryService } from "react-icons/md";
import { MdFormatAlignLeft } from "react-icons/md";
import { FaBusAlt } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import  {useNavigate } from "react-router-dom";
import ComplainPostProvider from "./ComplainPostProvider";
import ComplainPost from "./ComplainPost";
import { BsPostcard } from "react-icons/bs";
const SideNavBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  // const [selectedNavItem, setSelectedNavItem] = useState();
  const navigate = useNavigate();

  return (
    <div>
      {/* Parent wrapper */}
      <SideNav
        onSelect={(selected)=>{
          
          if(selected==="home"){
            navigate( "/StudentPanel");
          }
          else{
            navigate(`/StudentPanel/${selected}`);
          }
        }}
        defaultExpanded={isVisible}
        style={{ background: "black", position: "fixed" }}
        
      >
        <SideNav.Toggle
          onClick={() => {
            setIsVisible(isVisible);
          }}
        />
        <SideNav.Nav defaultSelected="home">
       
          <NavItem eventKey="home">
            <NavIcon>
            
                <FaHome style={{ fontSize: '1.75em' }}/>
              
            </NavIcon>
            <NavText><span>Home</span></NavText>
          </NavItem>
      
          <NavItem eventKey="CreatePost">
            <NavIcon>
           
                <MdPostAdd style={{ fontSize: '2em' }}/>
              
            </NavIcon>
            <NavText><span>Create Complain</span></NavText>
          </NavItem>

          <NavItem eventKey="Laundary">
            <NavIcon>
        
                <MdLocalLaundryService style={{ fontSize: '2em' }}/>
              
            </NavIcon>
            <NavText><span>Laundry</span></NavText>
          </NavItem>

          <NavItem eventKey="BookBus">
            <NavIcon>
           
                <FaBusAlt style={{ fontSize: '1.75em' }}/>
              
            </NavIcon>
            <NavText><span>Ride With Pride</span></NavText>
          </NavItem>
          <NavItem eventKey="Application">
            <NavIcon>
            
                <MdFormatAlignLeft style={{ fontSize: '1.75em' }}/>
              
            </NavIcon>
            <NavText><span>Application Request</span></NavText>
          </NavItem>
          <NavItem eventKey="YourPost">
            <NavIcon>
          
                <BsPostcard style={{ fontSize: '1.75em' }}/>
              
            </NavIcon>
            <NavText><span>Your Post</span></NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
  
    </div>
  );
};

export default SideNavBar;
