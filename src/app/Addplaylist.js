const axios = require('axios');
const qs = require('qs');

// Step 1: Authenticate and get access token
const data = {
  grant_type: 'client_credentials'
};

const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
  },
  data: qs.stringify(data),
  url: 'https://accounts.spotify.com/api/token',
};

axios(options)
  .then(response => {
    const token = response.data.access_token;

    // Step 2: Create a new playlist
    axios({
      method: 'POST',
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: 'New Playlist',
      },
    })
      .then(response => {
        const playlistId = response.data.id;

        // Step 3: Add tracks to the playlist
        axios({
          method: 'POST',
          url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            uris: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh', 'spotify:track:1301WleyT98MSxVHPZCA6M'], // replace with your track URIs
          },
        })
        .catch(error => {
          console.error(`Error adding tracks to playlist: ${error}`);
        });
      })
      .catch(error => {
        console.error(`Error creating playlist: ${error}`);
      });
  })
  .catch(error => {
    console.error(`Error getting access token: ${error}`);
  });