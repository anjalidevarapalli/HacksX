const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Sample data for calendar events (received from your friend's Okta-validated app)
const calendarEvents = [
  { summary: 'Yoga', start: '2025-02-07T08:00:00', end: '2025-02-07T09:00:00' },
  { summary: 'Meeting with team', start: '2025-02-07T10:00:00', end: '2025-02-07T11:00:00' },
  // More events here
];

// Get Spotify Auth Token (Use a token provided by your friend's implementation or get one using OAuth)
const SPOTIFY_AUTH_TOKEN = process.env.SPOTIFY_AUTH_TOKEN;

// Function to search for Spotify tracks based on activity name (calendar event summary)
async function searchSpotifyTrack(activity) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${SPOTIFY_AUTH_TOKEN}`,
      },
      params: {
        q: activity, // Search query (e.g., 'Yoga', 'Meeting', etc.)
        type: 'track',
      },
    });
    return response.data.tracks.items[0]; // Returning the first track found
  } catch (error) {
    console.error('Error searching for track on Spotify', error);
  }
}

// API route to process calendar events and generate a playlist
app.post('/generate-playlist', async (req, res) => {
  try {
    const events = req.body.events || calendarEvents; // Use events from frontend or the sample data

    let playlist = [];

    // Loop through each event, search for a track, and add to the playlist
    for (const event of events) {
      const activity = event.summary;
      const track = await searchSpotifyTrack(activity);

      if (track) {
        playlist.push({
          activity: activity,
          track: {
            name: track.name,
            artist: track.artists[0].name,
            url: track.external_urls.spotify,
          },
        });
      }
    }

    res.json({ playlist });
  } catch (error) {
    console.error('Error generating playlist', error);
    res.status(500).json({ error: 'Failed to generate playlist' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
