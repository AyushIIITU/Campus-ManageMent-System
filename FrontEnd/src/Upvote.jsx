
// import upvoteStyles from  './Upvote.css'; // Import global CSS file
import upvoteStyles from './Upvote.module.css'; // Import CSS module

function Upvote() {
  return (
    <>
      <label className={`${upvoteStyles.container}`}>
        <input type="checkbox" />
        <svg
          className={upvoteStyles.Glyph}
          version="1.1"
          viewBox="0 0 32 32"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M29.845,17.099l-2.489,8.725C26.989,27.105,25.804,28,24.473,28H11c-0.553,0-1-0.448-1-1V13  c0-0.215,0.069-0.425,0.198-0.597l5.392-7.24C16.188,4.414,17.05,4,17.974,4C19.643,4,21,5.357,21,7.026V12h5.002  c1.265,0,2.427,0.579,3.188,1.589C29.954,14.601,30.192,15.88,29.845,17.099z"
            className={upvoteStyles.XMLID_254_}
          ></path>
          <path
            d="M7,12H3c-0.553,0-1,0.448-1,1v14c0,0.552,0.447,1,1,1h4c0.553,0,1-0.448,1-1V13C8,12.448,7.553,12,7,12z   M5,25.5c-0.828,0-1.5-0.672-1.5-1.5c0-0.828,0.672-1.5,1.5-1.5c0.828,0,1.5,0.672,1.5,1.5C6.5,24.828,5.828,25.5,5,25.5z"
            className={upvoteStyles.XMLID_256_}
          ></path>
        </svg><span style={{display:"inline-block"}}><strong>4</strong></span>
      </label>
    </>
  );
}

export default Upvote;
