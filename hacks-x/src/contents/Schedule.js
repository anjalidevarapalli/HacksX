import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek ,
  getDay,
  locales,
});

const Schedule = () => {
  const [events] = useState([
    {
      title: 'Meeting',
      start: new Date(2024, 1, 15, 10, 0),
      end: new Date(2024, 1, 15, 11, 0),
    },
    {
      title: 'Conference',
      start: new Date(2024, 1, 20, 13, 0),
      end: new Date(2024, 1, 20, 15, 0),
    },
  ]);

  return (
    <div className="schedule-container">
      <div className="schedule-content">
        <h2>Your Schedule</h2>
        <p>Select a date to view your schedule details:</p>
        
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className="calendar"
          views={['month', 'week', 'day', 'agenda']} // This enables multiple views
          defaultView="week" // You can set the default view to 'week', 'day', or 'agenda'
        />
      </div>
    </div>
  );
};

export default Schedule;

