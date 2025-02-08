import React from "react";

function Schedule() {
  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Your Schedule</h2>
      <p className="schedule-description">Example of how events should be formatted:</p>
      <div className="schedule-box">
        <p className="event">✅ <strong>9 AM</strong> - Work Meeting</p>
        <p className="event">✅ <strong>6 PM</strong> - Gym Workout</p>
        <p className="event">✅ <strong>8 PM</strong> - Study Session</p>
      </div>
    </div>
  );
}

export default Schedule;
