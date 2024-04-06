import{ useState } from "react";
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";
import "./CompalinPost.css";
import NewUpvote from "./NewUpvote";

const ComplainPost = () => {
  const [isVoted, setIsVoted] = useState(false);

  const handleUpVoteButton = () => {
    setIsVoted(!isVoted);
    if (!isVoted) {
      console.log("Like Kiya Kya??");
    } else {
      console.log("Like Nahi Kiya Kya??");
    }
  };

  return (
    <>
      <div className="card CompalinPost" style={{ width: "25vh" }}>
        <div className="card__span">22118</div>
        <br />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <div className="AlingPostFooter">
            <div onClick={handleUpVoteButton} style={{"display":"flex"}}>
              <NewUpvote/>
              {/* {isVoted ? <BiSolidUpvote /> : <BiUpvote />} */}
              <strong>4</strong>
            </div>
            <span className="badge text-bg-dark AlingPostFooterDate">1D</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplainPost;
