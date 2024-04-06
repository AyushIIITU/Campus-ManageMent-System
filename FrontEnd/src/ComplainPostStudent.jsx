import InActiveUpVote from "./InActiveUpVote";
import axios from "axios";
import { useEffect, useState } from "react";
import "./CompalinPost.css";

function ComplainPostStudent() {
  const [UserComplainQueue, setUserComplainQueue] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/student/studentcomplainDetail/${localStorage.getItem('StudentId')}`);
      setUserComplainQueue(response.data);
    } catch (err) {
      console.error("Error in Getting Values of Machine User From Server ", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteComplain = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/complain/${id}`);
      console.log("Complaint deleted successfully");
      fetchData();
    } catch (err) {
      console.error("Error in Deleting Complain ", err);
    }
  };

  return (
    <>
      {
      UserComplainQueue.map((StudentComplain) => (
        <div key={StudentComplain._id} className="card CompalinPost" style={{ width: "25vh" }}>
          <div className="card__span">{StudentComplain.name}</div>
          <br />
          <div className="card-body">
            <h5 className="card-title" style={{"width":"max-content"}}>{StudentComplain.title}</h5>
            <p className="card-text" style={{"height":"9vh"}}>
              {StudentComplain.descriptionOfComplain}
            </p>
            <div className="AlingPostFooter">
              <div style={{ display: "flex" }}>
                <InActiveUpVote />
                <strong>{StudentComplain.likedBy.length}</strong>
              </div>
              <span className="badge text-bg-dark AlingPostFooterDate">{((Date.now() - new Date(StudentComplain.createdAt).getTime()) / (1000 * 60 * 60 * 24)).toFixed(1)}D</span>
            </div>
            <div><strong>Status</strong>: {StudentComplain.status}</div>
            <div><strong>Handler</strong>: {StudentComplain.complainHandler}</div>
            <button onClick={() => handleDeleteComplain(StudentComplain._id)} type="button" className="btn btn-danger">Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ComplainPostStudent;
