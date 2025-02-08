import React from "react";
import '../styles/index.css'

function Schedule() {
  return (
    <div id="schedule" className="schedule-container">
      <h1>Schedule</h1>
      <div className="schedule-content">
        <div className="schedule-item">Event 1: Meeting with team</div>
        <div className="schedule-item">Event 2: Lunch break</div>
        <div className="schedule-item">Event 3: Coding session</div>
        <div className="schedule-item">Event 4: Workshop on React</div>
        <div className="schedule-item">Event 5: Client call</div>
        <div className="schedule-item">Event 6: Review sprint progress</div>
        <div className="schedule-item">Event 7: Weekly team sync</div>
        <div className="schedule-item">Event 8: Networking event</div>
        <div className="schedule-item">Event 9: Happy hour</div>
        <div className="schedule-item">Event 10: End of day wrap-up</div>
        {/* Add more events as needed */}
      </div>
    </div>
  );
}

export default Schedule;
