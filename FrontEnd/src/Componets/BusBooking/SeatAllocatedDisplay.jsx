import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegIdCard } from "react-icons/fa";
const SeatAllocatedDisplay=({userDetails})=>{
    return(
        <>
        {
            userDetails.map(user=>(
                <div key={user._id}>{user.name} <MdAirlineSeatReclineNormal /> {user.seatNo} {"  "} <FaPhoneAlt/> {user.phoneNo}{"  "} <FaRegIdCard
                /> {user.PRollNo}</div>
            ))
        }
        </>
    )

}
export default SeatAllocatedDisplay;