import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-email",
    "user-top-read",
    "user-read-recently-played",
    "user-modify-playback-state",
    "playlist-modify-public",
    "playlist-modify-private"
].join(",");

const params = {
    scope: scopes,
};

const queryParamString = new URLSearchParams(params).toString();

const AUTH_URL = `https://accounts.spotify.com/authorize?` + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export { AUTH_URL , spotifyApi};