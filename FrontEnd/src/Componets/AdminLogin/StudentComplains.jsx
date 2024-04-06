import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import InActiveUpVote from "../../InActiveUpVote";

function StudentComplains() {
  const [compalinToResolved, setCompalinToResolved] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/complain/complainHandler/${localStorage.getItem(
          "AdminId"
        )}`
      );
      setCompalinToResolved(response.data);
    } catch (err) {
      console.error("Error in Getting ", err);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  const handleResolveComplain = async (ComplainId) => {
    try {
      await axios.post(`http://localhost:3000/admin/complainIsSolved`, {
        complainId: ComplainId,
        status: `Solved By ${localStorage.getItem("AdminName")}`,
      });
      toast.success("Complain Resolved Successfully");
      fetchData();
    } catch (err) {
      toast.error("Error in Getting  Data from  Server");
    }
  };
  return (
    <div style={{ display: "flex", "flexWrap": "wrap" }}>
      {compalinToResolved.map((Complain) => (
        <div
          key={Complain._id}
          className="card CompalinPost"
          style={{ width: "25vh" }}
        >
          <div
            style={{
              "display": " flex",
              "alignItems": "center",
              "justifyContent": "space-around",
            }}
          >
            <div className="card__span" style={{ position: "inherit" }}>
              {Complain.name}
            </div>
            <br />
            <br />
            <span className="card__span" style={{ position: "inherit" }}>
              {Complain.phoneNo}
            </span>
          </div>
          {/* <br /> */}
          {/* <div className="card__span">{Complain.phoneNo}</div> */}
          {/* <br /> */}
          <div className="card-body">
            <h5 className="card-title" style={{ width: "max-content" }}>
              {Complain.title}
            </h5>
            <p className="card-text" style={{ height: "9vh" }}>
              {Complain.descriptionOfComplain}
            </p>
            <div className="AlingPostFooter">
              <div style={{ display: "flex" }}>
                <InActiveUpVote />
                <strong>{Complain.likedBy.length}</strong>
              </div>
              <span className="badge text-bg-dark AlingPostFooterDate">
                {(
                  (Date.now() - new Date(Complain.createdAt).getTime()) /
                  (1000 * 60 * 60 * 24)
                ).toFixed(1)}
                D
              </span>
            </div>
            <div>
              <strong>Status</strong>: {Complain.status}
            </div>
                {/* <div>
                <strong>Handler</strong>: {Complain.complainHandler}
                </div> */}
            <button
              onClick={() => handleResolveComplain(Complain._id)}
              type="button"
              className="btn btn-danger"
            >
              Resolved
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentComplains;
