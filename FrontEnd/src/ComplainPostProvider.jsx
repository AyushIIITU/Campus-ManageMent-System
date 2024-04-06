import React from "react";
import ComplainPost from "./ComplainPost"
import "./ComplainPostProvider.css"
import axios from "axios";
import NewUpvote from "./NewUpvote";
// import ComplainPost from "./Componets/PostUI/ComplainPost";
// import {ComplainPost} form "C:\\Users\\ASUS\\OneDrive\\Desktop\\Hostel Management System\\StudentPortal\\src\\ComplainPost.jsx"
const ComplainPostProvider=()=>{
    const  [posts,setPosts]=React.useState([]);
    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/complain/public`);
          setPosts(response.data);
        } catch (err) {
          console.error("Error in Getting Public Posts ", err);
        }
      };
      React.useEffect(() => {
        fetchData();
      }, []);
    return(
        <>
        <div className="threePostIsAllow">
        {
      posts.map((PublicPost) => (
        <div key={PublicPost._id} className="card CompalinPost" style={{ width: "25vh" }}>
          <div className="card__span">{PublicPost.name}</div>
          <br />
          <div className="card-body">
            <h5 className="card-title" style={{"width":"max-content"}}>{PublicPost.title}</h5>
            <p className="card-text" style={{"height":"9vh"}}>
              {PublicPost.descriptionOfComplain}
            </p>
            <div className="AlingPostFooter">
              <div style={{ display: "flex" }}>
                <NewUpvote PublicPost={PublicPost}/>
                <strong>{PublicPost.likedBy.length}</strong>
              </div>
              <span className="badge text-bg-dark AlingPostFooterDate">{((Date.now() - new Date(PublicPost.createdAt).getTime()) / (1000 * 60 * 60 * 24)).toFixed(1)}D</span>

            </div>
          </div>
        </div>
      ))}
        </div>
        
        </>
    )
}
export default ComplainPostProvider;
