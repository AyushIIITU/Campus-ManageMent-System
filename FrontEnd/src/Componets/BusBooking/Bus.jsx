import { useEffect, useState } from "react";
import BusBooker from "./busBookingForm";
import "./Bus.scss";
import SeatAllocatedDisplay from "./SeatAllocatedDisplay";
import toast from "react-hot-toast";
import axios from "axios";

const Bus = () => {
    const [seatReserved, setSeatReserved] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    
    useEffect(() => {
      fetchData();
    }, []);
    
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/bus");
        setUserDetails(response.data);
        const reservedSeats = response.data.map(seatUser => seatUser.seatNo);
        setSeatReserved(reservedSeats);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

 const IsAllocated = async (Phone, SeatNumber) => {
  if (!seatReserved.includes(parseInt(SeatNumber))) {
    if (parseInt(SeatNumber) < 1 || parseInt(SeatNumber) > 16) {
      toast.error("Invalid Seat Number");
    } else {
      try {
        const response = await axios.post("http://localhost:3000/bus", {
          name: localStorage.getItem('StudentName') || localStorage.getItem('AdminName'),
          phoneNo: Phone,
          seatNo: SeatNumber,
          userId: localStorage.getItem('StudentId') || localStorage.getItem('AdminId')
        });
        setUserDetails([...userDetails, response.data]);
        setSeatReserved([...seatReserved, parseInt(SeatNumber)]);
        toast.success("Seat allocated successfully");
      } catch (error) {
        console.error("Error allocating seat:", error);
        toast.error("Failed to allocate seat");
      }
    }
  } else {
    toast.error("The selected seat is already allocated");
  }
};

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center"
      }}>
        <div className="busRegister">
          <BusBooker IsAllocated={IsAllocated} />
        </div>
        <div className="busContainer">
          <label>Choose Seat</label>
          <div className="text-left mt-2">
            <button className="btn btn-primary btn-xs mb-2">Available</button>
            <button className="btn btn-success btn-xs mb-2">Choosen</button>
            <button className="btn btn-danger btn-xs mb-2">Booked</button>
          </div>

          <div className="bus seat2-2 border-0 p-0">
            <div className="seat-row">
              <ol className="seats" style={{ flexWrap: "wrap", width: "max-content", maxWidth: "32vh" }}>
                {seats.map((seatNumber) => (
                  <li key={seatNumber} className="seat">
                    <input
                      role="input-passenger-seat"
                      name="seat"
                      id={`seat-radio-1-${seatNumber}`}
                      value={seatNumber}
                      required
                      type="radio"
                      disabled={seatReserved.includes(seatNumber)}
                    />
                    <label htmlFor={`seat-radio-1-${seatNumber}`}>
                      {seatNumber}
                    </label>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <SeatAllocatedDisplay userDetails={userDetails} />
        </div>
      </div>
    </>
  );
};

export default Bus;
