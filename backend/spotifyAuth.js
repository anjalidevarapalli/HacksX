// spotifyAuth.js
const axios = require('axios');

// Spotify OAuth Callback handling
const spotifyAuth = async (req, res) => {
  const { code } = req.query; // Spotify authorization code

  try {
    const spotifyResponse = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }), {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Store Spotify tokens in a session or database (this is just a placeholder)
    const spotifyAccessToken = spotifyResponse.data.access_token;
    const spotifyRefreshToken = spotifyResponse.data.refresh_token;

    // Respond with success or redirect (you can handle the redirection to frontend here)
    res.send('Spotify Authentication Successful');
  } catch (error) {
    console.error('Error during Spotify authentication:', error);
    res.status(500).send('Error during Spotify authentication');
  }
};

// Fetch Spotify playlist based on the user's data
const getSpotifyPlaylist = async (req, res) => {
  const spotifyAccessToken = 'stored_access_token'; // Get this from session or database

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    });

    const topArtists = response.data.items; // Example: fetch top artists
    res.json(topArtists);
  } catch (error) {
    console.error('Error fetching Spotify playlist:', error);
    res.status(500).send('Error fetching playlist');
  }
};

module.exports = { spotifyAuth, getSpotifyPlaylist };
