import washerImage from '../../Images/automatic-washer.png';
import "./WashingMachineEmpty.css"
const Empty = () => {
  return (
    <>
    <div className="EmptyMachine">
    <img
        src={washerImage}
        // style={}}
        alt="WashingMachineIsEmpty"
      />
    </div>
      
    </>
  );
};
export default Empty;



