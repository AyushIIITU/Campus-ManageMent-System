import React from "react";
import GardContext from "./GardContext";
const GardContextProvider=({children})=>{
    const [gard,setGard]=React.useState([]);
    return (
        <GardContext.Provider  value={{gard, setGard}}>
        {children}
        </GardContext.Provider>
    )
}
export default GardContextProvider;