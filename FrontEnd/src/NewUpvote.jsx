import React from 'react';
import axios from "axios";
import "./NewUpvote.css";

function NewUpvote({ PublicPost }) {
  const [liked, setLiked] = React.useState(false);

  React.useEffect(() => {
    for (let i = 0; i < PublicPost.likedBy.length; i++) {
      if (PublicPost.likedBy[i] === localStorage.getItem('StudentId')) {
        console.log("Already Likke Kiya")
        setLiked(true);
        break;
      }
    }
  }, [PublicPost.likedBy]);

  const handleLikeChange = async () => {
    try {
      if (!liked) {
        await axios.post('http://localhost:3000/complain/Liked', { complainId: PublicPost._id, studentId: localStorage.getItem("StudentId") });
        console.log("Like kar diya");
        setLiked(true);
      } else {
        await axios.post('http://localhost:3000/complain/UnLiked', { complainId: PublicPost._id, studentId: localStorage.getItem("StudentId") });
        console.log("Line undo");
        setLiked(false);
      }
    } catch (error) {
      console.error('Error while updating like status:', error);
      // Handle error
    }
  };

  return (
    <label className="ui-bookmark">
      <input type="checkbox" checked={liked} onChange={handleLikeChange} />
      <div className="bookmark">
        <svg viewBox="0 0 32 32" style={{ "transform": "rotate(180deg)" }}>
          <g>
            <path d="M16 27l-11-11h7V3h8v13h7z"></path>
          </g>
        </svg>
      </div>
      {/* <label>{liked ? 'Liked' : 'Like'}</label> */}
    </label>
  );
}

export default NewUpvote;
