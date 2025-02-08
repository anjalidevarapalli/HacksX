import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Schedule.css';

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

  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch playlist data from the Flask API
  const fetchPlaylist = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5001/generate_playlist', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }); // Replace with your Flask API URL
      const data = await response.json();
      setPlaylist(data.playlist);
      console.log(data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching playlist:', error);
      setLoading(false);
    }
  };

  // Track the selected view
  const [currentView, setCurrentView] = useState('week');

  useEffect(() => {
    fetchPlaylist(); // Fetch playlist on component mount
  }, []);

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

        {/* Playlist Card */}
        <div className="songs-card">
          <div className="songs-title">Your Playlist</div>
          <div className="songs-description">
            Discover your personalized playlist based on your schedule!
          </div>

          {loading ? (
            <div>Loading playlist...</div>
          ) : (
            <div className="songs-list">
              {playlist.length > 0 ? (
                playlist.map((song, index) => (
                  <div className="song-item" key={index}>
                    <a href={song} className="song-link" target="_blank" rel="noopener noreferrer">
                      Watch on YouTube
                    </a>
                  </div>
                ))
              ) : (
                <p>No songs available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
