import { useContext } from "react";
import GardContext from "../../Context/GardContext";
import "./GardLoginProfile.css"

const GardLoginProfile=()=>{
    const {gard}=useContext(GardContext);
    console.log(gard);
    return (
        <>
        {/* hello khuch hua??{gard[0]} */}
        <div className="GardDetails">
        <div className="badge rounded-pill text-bg-primary">{gard[0]}</div>
        <div className="badge rounded-pill text-bg-secondary">{gard[1]}</div>
        </div>
        </>
    )
}
export default GardLoginProfile;