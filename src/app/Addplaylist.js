const axios = require('axios');
const qs = require('qs');
const express = require('express');
const querystring = require('querystring');
require('dotenv').config();

var client_id = process.env.SPOTIFY_CLIENT_ID;

// var client_id = SPOTIFY_CLIENT_ID; // Your client id <- DOESNT WORK
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

var app = express();

app.get('/login', function(req, res) {
  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

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
    console.log(error);
  });


  app.get('/search', function(req, res) {
    const trackName = req.query.trackName; // Get the track name from the query parameters
  
    // Search for tracks by name
    axios({
      method: 'GET',
      url: 'https://api.spotify.com/v1/search',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use your access token here
      },
      params: {
        q: trackName, // Use the track name from the query parameters
        type: 'track',
        limit: 5, // Limit the number of results
      },
    })
    .then(response => {
    const tracks = response.data.tracks.items;
    res.json(tracks); // Send the tracks as a JSON response
  })
  .catch(error => {
    // console.error(`Error searching for tracks: ${error}`);
    res.status(500).send('Error searching for tracks'); // Send an error response
  });
});

  

  app.listen(3000);