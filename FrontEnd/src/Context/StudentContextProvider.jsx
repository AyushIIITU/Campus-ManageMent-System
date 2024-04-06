import React from "react";

import StudentContext from "./StudentContext.js";
const StudentContextProvider=({children})=>{
    const [student,setStudent]=React.useState([]);
    return (
        <StudentContext.Provider  value={{student, setStudent}}>
        {children}
        </StudentContext.Provider>
    )
}
export default StudentContextProvider;