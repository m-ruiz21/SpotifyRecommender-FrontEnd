import { SongFeatures } from "../../../../models/song-features";
import { Song } from "../../../../models/song";
import SpotifyWebApi from "spotify-web-api-node";

interface SearchPlaylistResponse {
    seed_artists: string;
    seed_tracks: string;
}

const searchPlaylists = async (query: string, client: SpotifyWebApi): Promise<SearchPlaylistResponse> => {
    const response = await client.searchPlaylists(query, {limit: 1});
    const playlist = response.body?.playlists?.items?.[0];

    const tracks = await client.getPlaylistTracks(playlist?.id as string, {limit: 5});
    const track_ids = tracks.body.items.map((item) => item?.track?.id as string).join(",");
    const track_artists = tracks.body.items.map((item) => item?.track?.artists?.[0]?.name as string).join(",");

    console.log(`finished searching for query: ${query}`)

    return {
        seed_artists: track_artists,
        seed_tracks: track_ids
    } 

};

export const getRecommendationsAsync = async (query: string, song_features: SongFeatures, bearerToken: string): Promise<Song[]> => {
    const spotifyApi = new SpotifyWebApi({
        accessToken: bearerToken,
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });

    const seeds = await searchPlaylists(query, spotifyApi);

    const opts = {
        seed_artists: seeds.seed_artists, 
        seed_tracks: seeds.seed_tracks,
        target_acousticness: song_features.acousticness, 
        target_danceability: song_features.danceability,
        target_duration_ms: song_features.duration_ms,
        target_energy: song_features.energy,
        target_instrumentalness: song_features.instrumentalness,
        target_key: song_features.key,
        target_liveness: song_features.liveness,
        target_loudness: song_features.loudness,
        target_mode: song_features.mode,
        target_speechiness: song_features.speechiness,
        target_tempo: song_features.tempo,
        target_time_signature: song_features.time_signature,
        target_valence: song_features.valence
    }; 

    const response = await spotifyApi.getRecommendations(opts);
    console.log(response.body);

    const songs = response.body.tracks.map((track) => {
        const song: Song = {
            id: track.id,
            uri: track.uri,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            album: track.album.name,
            durationMs: track.duration_ms,
            images: track.album.images.map((image) => ({height: image.height, width: image.width, url: image.url})), 
        }
        return song;
    });

    return songs;
};
