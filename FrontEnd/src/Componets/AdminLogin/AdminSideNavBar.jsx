import { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { FaTasks } from "react-icons/fa";
// import { MdLocalLaundryService } from "react-icons/md";
import { MdFormatAlignLeft } from "react-icons/md";
import { FaBusAlt } from "react-icons/fa";
// import { MdPostAdd } from "react-icons/md";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import  {useNavigate } from "react-router-dom";
import { GrCompliance } from "react-icons/gr";
// import { BsPostcard } from "react-icons/bs";
import { MdAddTask } from "react-icons/md";
// import { BiTask } from "react-icons/bi";
const AdminSideNavBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  // const [selectedNavItem, setSelectedNavItem] = useState();
  const navigate = useNavigate();

  return (
    <div>
      {/* Parent wrapper */}
      <SideNav
        onSelect={(selected)=>{
          
          if(selected==="Complains"){
            navigate( "/AdminPanel");
          }
          else{
            navigate(`/AdminPanel/${selected}`);
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
        <SideNav.Nav defaultSelected="Complains">
       
          <NavItem eventKey="Complains">
            <NavIcon>
            
                <GrCompliance style={{ fontSize: '1.75em' }}/>
              
            </NavIcon>
            <NavText><span>Complains</span></NavText>
          </NavItem>
      
          <NavItem eventKey="CreateTasks">
            <NavIcon>
           
                <MdAddTask style={{ fontSize: '2em' }}/>
              
            </NavIcon>
            <NavText><span>Create Tasks</span></NavText>
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
          <NavItem eventKey="CreatedTasks">
            <NavIcon>
          
                <FaTasks style={{ fontSize: '1.75em' }}/>
              
            </NavIcon>
            <NavText><span>Created Tasks</span></NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
  
    </div>
  );
};

export default AdminSideNavBar;
