const express = require('express');
const fetch = require('node-fetch');
const { google } = require('googleapis');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/api/get-calendar-events', async (req, res) => {
  const { accessToken } = req.body;

  try {
    // Create an OAuth2 client with the access token
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    // Use the Google Calendar API
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Fetch calendar events
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    // Return events as JSON
    res.json(events.data.items);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({ message: 'Error fetching calendar events' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
