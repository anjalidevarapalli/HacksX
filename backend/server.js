// server.js
const express = require('express');
const { getCalendarEvents } = require('./googleCalendar');  // Import calendar module
const { searchTracks, createPlaylist, addTracksToPlaylist } = require('./spotify');  // Import spotify module

const app = express();

app.get('/calendar-events', async (req, res) => {
  try {
    const keywords = await getCalendarEvents();  // Get the keywords directly from Google Calendar
    res.json({ keywords });  // Return the keywords to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch calendar events' });
  }
});

app.get('/generate-playlist', async (req, res) => {
  try {
    const keywords = await getCalendarEvents();  // Get keywords based on the calendar events

    let allTracks = [];
    for (let keyword of keywords) {
      const tracks = await searchTracks(keyword);
      allTracks = [...allTracks, ...tracks];  // Add the tracks to the list
    }

    const playlistId = await createPlaylist('Calendar Playlist');
    await addTracksToPlaylist(playlistId, allTracks);

    res.send('Playlist generated successfully!');
  } catch (error) {
    console.error('Error details:', error);  // Log the error for debugging
    res.status(500).send('Error generating playlist: ' + (error.message || error));  // Detailed error message
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
