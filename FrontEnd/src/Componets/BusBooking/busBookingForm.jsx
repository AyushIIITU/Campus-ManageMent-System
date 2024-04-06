import { useRef } from "react";
import styles from "./BusBooker.module.css";

const BusBooker = ({ IsAllocated }) => {
  const PhoneElement = useRef();
  const SeatElement = useRef();

  const SubmitBooking = (event) => {
    event.preventDefault();

    const Phone = PhoneElement.current.value;
    const SeatNumber = SeatElement.current.value;

    IsAllocated(Phone, SeatNumber);
  };

  return (
    <form className={styles.form} style={{ float: "right" }} onSubmit={SubmitBooking}>
      <div className={styles.container}>
        <div className={styles.card}>
          <a className={styles.login}>Book Bus</a>
          <p className={styles.message}><strong>IF YOU NOT COME THEN FINE WILL BE IMPLEMENTED</strong></p>
          <div className={styles.inputBox}>
            <input type="number" ref={PhoneElement} required="required" />
            <span className={styles.user}>Phone No</span>
          </div>

          <div className={styles.inputBox}>
            <input ref={SeatElement} type="number" required="required" />
            <span>Seat No</span>
          </div>

          <button type="submit" className={styles.enter}>Enter</button>
        </div>
      </div>
    </form>
  );
};

export default BusBooker;
