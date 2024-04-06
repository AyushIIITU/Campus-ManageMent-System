import "./RemovePauseButton.css"
const RemovePauseButton=({handleDeleteButton})=>{
    return (<>
        <button className="cta" onClick={handleDeleteButton}>
          <span>Remove This</span>
          <svg width="15px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
        </>)
};
export default RemovePauseButton;



