import React, { useRef, useEffect, useState } from "react";
import "./QueueDisplay.css";
import { MdDelete } from "react-icons/md";

function QueueDisplay({
  queue,

  
  updateQueueCatalog,
  deleteMachineQueueList,
}) {
  // const [status, setStatus] = useState(false);
  // let TwoMinUser = {
    
  //   atTimeAdded: firstUser.atTimeAdded,
  //   atTimeDelete: firstUser.atTimeAdded + 5000,
  // };
  // useEffect(() => {
  //   if (!status) {
  //     const intervaluserName = setInterval(() => {
  //       if (TwoMinUser.atTimeDelete < new Date().getTime()) {
  //         deleteMachineQueueList(firstUser);
  //       }
  //     }, 1000);
  //     return () => clearInterval(intervaluserName);
  //   }
  // }, [TwoMinUser, deleteMachineQueueList, firstUser]);
  const extendedTimeRef = useRef();
  // const timeoutRef = useRef(null);
  const handleExtendSubmit = (event) => {
    event.preventDefault();
    const extendedTime = extendedTimeRef.current.value;
    console.log(extendedTime);
    updateQueueCatalog(extendedTime);
    // Handle the form submission logic here
  };
  const handleDeleteMachineQueueList = (userdelete) => {
    deleteMachineQueueList(userdelete);
  };

  // const handleAcceptRequest = () => {
  //   setStatus(true);
  //   clearTimeout(timeoutRef.current);
  // };

  return (
    <div>
      <h2>Queue:</h2>
      <ul>
        {queue.map((user) => (
          <React.Fragment key={user.phoneNo}>
            {user.userName === queue[0].userName ? (
              <li>
               <strong> User: </strong>{user.userName}, {/* TimeAtAdd:{user.atTimeAdded} , TimeAtDelete:{" "} */}
                {/* {user.atTimeDelete}} */}
                <form
                  className="form-inline extendingform"
                  onSubmit={handleExtendSubmit}
                >
                  <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="extendTimer" className="sr-only">
                      ExtendTime
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="extendTimer"
                      ref={extendedTimeRef}
                      placeholder="ExtendTime"
                    />
                  </div>
                  <button className="btn btn-primary mb-2">Confirm</button>
                </form>
                {/* {!status && (
                  <>
                    <div className="alert alert-danger" role="alert">
                      Please Accept within 2 seconds that you will be removed
                      from Queue if this time is not extended!
                    </div>

                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={handleAcceptRequest}
                    >
                      Accept
                    </button>
                  </>
                )} */}
              </li>
            ) : (
              <li>
                 <strong>User: </strong>{user.userName}{/*, TimeAtAdd:{user.atTimeAdded} , TimeAtDelete:
                {user.atTimeDelete},*/} ,<strong>TimeDuration: </strong>
                {Math.floor((user.timeAtDelete - user.timeAtAdded)/3600)}<strong>Min</strong>
              </li>
            )}
            <button
              type="submit"
              className="btn btn-primary mb-2"
              onClick={() => handleDeleteMachineQueueList(user)}
            >
              Delete
            </button>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default QueueDisplay;
