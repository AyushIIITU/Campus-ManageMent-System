
// import upvoteStyles from  './Upvote.css'; // Import global CSS file
// import upvoteStyles from './Upvote.module.css'; // Import CSS module
import "./NewUpvote.css"
function InActiveUpVote() {
  return (
    <>
        <label className="ui-bookmark">
    <input disabled type="checkbox"/>
    <div className="bookmark">
      <svg viewBox="0 0 32 32" style={{"transform": "rotate(180deg)"}}>
        <g>
          <path d="M16 27l-11-11h7V3h8v13h7z"></path>
        </g>
      </svg>
    </div>
</label>
    </>
  );
}

export default InActiveUpVote;
