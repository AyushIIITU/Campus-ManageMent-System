const schedule = require("node-schedule");
const ComplainDetail = require("./models/complain"); // Import your model

const wardenId = "660e9055117805cb4a95d7d0"; // Define these variables appropriately
const deanId = "660e906a117805cb4a95d7d3";
const directorId = "660e9077117805cb4a95d7d6";
const TwoDayDeadLine = 994665900; // 2 days in milliseconds

let scheduledTask = null; // Initialize scheduled task variable

// Function to handle scheduling the task
// This Funtion will Be called At every 12hour
const scheduleTask = () => {
  scheduledTask = schedule.scheduleJob("0 0 */12 * * *", async function () {
    try {
      const complaints = await ComplainDetail.find();
      if (!complaints || complaints.length === 0) {
        console.log("No complaints found. Cancelling scheduling...");
        scheduledTask.cancel(); // Cancel scheduling if no complaints
        scheduledTask = null; // Reset scheduled task variable
        return;
      }
      console.log("This task runs every minute.");
      for (const complaint of complaints) {
        const timeDifference = Date.now() - complaint.createdAt.getTime();
        console.log(
          "Time difference in scheduler",
          timeDifference,
          timeDifference > TwoDayDeadLine
        );
        // if (complaint.complainHandler != directorId) {
          if (timeDifference > TwoDayDeadLine * 3) {
            await ComplainDetail.findByIdAndUpdate(complaint._id, {
              complainHandler: directorId,
            });
            console.log("Complaint Escalated to Director");
          } else if (timeDifference > TwoDayDeadLine * 2) {
            await ComplainDetail.findByIdAndUpdate(complaint._id, {
              complainHandler: deanId,
            });
            console.log("Complaint Forwarded to Dean");
          } else if (timeDifference > TwoDayDeadLine) {
            await ComplainDetail.findByIdAndUpdate(complaint._id, {
              complainHandler: wardenId,
            });
            console.log("Complaint Assigned to Warden");
          }
        // }
      }
    } catch (err) {
      console.error("Error in Scheduling:", err);
    }
  });
};

// Initial scheduling
scheduleTask();

module.exports = scheduledTask;

// If you want to cancel the scheduled task:
// scheduledTask.cancel();
