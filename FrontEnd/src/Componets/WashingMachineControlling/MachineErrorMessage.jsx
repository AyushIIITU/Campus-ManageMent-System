import Running from "./WashingMachineRunning";
import Empty from "./WashingMachineEmpty";

const MachineErrorMessage = ({ queue,isStopped }) => {
  if (queue.length == 0||isStopped) {
    return <Empty />;
  } else {
    return <Running />;
  }
};
export default MachineErrorMessage;
