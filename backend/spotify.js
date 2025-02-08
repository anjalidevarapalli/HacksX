const axios = require('axios');

const accessToken = 'BQAA4D-meCctHkG3uOnSHzgN1IZRF_eqV4iIiesTa2Jg3RrTrgV8XsXZXH_9ge7fzJ6g3C6ffonezwb4CNxUwBCC9I-IZyLYrO8mQyj0oumGemh2TmvFymokdPCfGNr2Rud1j8HfwaY'; 

// Function to search for tracks based on a keyword
const searchTracks = async (keyword) => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: keyword, 
          type: 'track',
          limit: 10,
        },
      });
      if (response.data && response.data.tracks) {
        return response.data.tracks.items;  // Ensure that this is an array and not undefined
      } else {
        console.error('No tracks found for keyword:', keyword);
        return [];
      }
    } catch (error) {
      console.error('Error searching tracks:', error);
      return [];  // Return empty array on error
    }
  };
  
  
  // Function to create a new playlist
  const createPlaylist = async (playlistName) => {
    try {
      const response = await axios.post(
        'https://api.spotify.com/v1/me/playlists',
        {
          name: playlistName,
          description: 'Generated from calendar events',
          public: false, // Make it private
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data.id;  // Return the playlist ID
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };
  
  // Function to add tracks to a playlist
  const addTracksToPlaylist = async (playlistId, tracks) => {
    try {
      const trackUris = tracks.map(track => track.uri);
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          uris: trackUris,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error('Error adding tracks to playlist:', error);
    }
  };
  
  module.exports = { searchTracks, createPlaylist, addTracksToPlaylist };