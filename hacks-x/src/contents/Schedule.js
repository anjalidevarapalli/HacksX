import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Schedule.css'

// Localizer for React Big Calendar
const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
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

  // Track the selected view
  const [currentView, setCurrentView] = useState('week');

  return (
    <div className="schedule-container">
      <div className="schedule-content">
        <h2 className="schedule-title">Your Schedule</h2>
        <p className="schedule-description">
          Select a date to view your schedule details:
        </p>

        {/* Calendar Component */}
        <Calendar
  localizer={localizer}
  events={events}
  startAccessor="start"
  endAccessor="end"
  className="calendar"
  views={['month', 'week', 'day', 'agenda']}
  style={{ height: 'auto', width: 'auto' }} // Ensures it takes up full box space
/>

      </div>
    </div>
  );
};

export default Schedule;
