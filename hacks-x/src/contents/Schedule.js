import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { google } from 'googleapis';
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
  startOfWeek,
  getDay,
  locales,
});

const Schedule = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [events, setEvents] = useState([]);
  
  // Get Google Calendar Events
  const getGoogleCalendarEvents = async (token) => {
    try {
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({
        access_token: token,
      });

      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

      const res = await calendar.events.list({
        calendarId: 'primary', // 'primary' refers to the main calendar of the user
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const fetchedEvents = res.data.items.map(event => ({
        title: event.summary,
        start: new Date(event.start.dateTime || event.start.date),
        end: new Date(event.end.dateTime || event.end.date),
      }));

      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching Google Calendar events', error);
    }
  };

  useEffect(() => {
    const fetchCalendar = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          getGoogleCalendarEvents(token);
        } catch (error) {
          console.error("Error getting access token", error);
        }
      }
    };

    fetchCalendar();
  }, [isAuthenticated, getAccessTokenSilently]);

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
          views={['month', 'week', 'day', 'agenda']}
          defaultView="week"
        />
      </div>
    </div>
  );
};

export default Schedule;

/* import React, { useState } from 'react';
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
*/
