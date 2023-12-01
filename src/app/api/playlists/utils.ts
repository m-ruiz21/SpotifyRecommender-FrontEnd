import SpotifyWebApi from "spotify-web-api-node";
import { Playlist } from "../../../models/playlist";

export const addPlaylistAsync = async (playlist: Playlist, bearerToken: string): Promise<string> => { 
    const client = new SpotifyWebApi({
        accessToken: bearerToken,
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });
    
    const name = decodeURIComponent(playlist.name);
    const playlist_id = await client.createPlaylist(name, { public: true});

    const song_ids = playlist.songs.map((song) => song.uri);
    await client.addTracksToPlaylist(playlist_id.body.id, song_ids);

    return playlist_id.body.id;
}