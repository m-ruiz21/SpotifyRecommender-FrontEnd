import { SongFeatures } from "../../../../models/song-features";
import { Song } from "../../../../models/song";
import SpotifyWebApi from "spotify-web-api-node";

interface SearchPlaylistResponse {
    seed_artists: string;
    seed_tracks: string;
}

const searchPlaylists = async (query: string, client: SpotifyWebApi): Promise<SearchPlaylistResponse> => {
    console.log(`starting search for query: ${query}`) 
    
    const response = await client.searchPlaylists(query + " mix", {limit: 1});
    const playlist = response.body?.playlists?.items?.[0];

    const tracks = await client.getPlaylistTracks(playlist?.id as string, {limit: 5});
    const track_ids = tracks.body.items.map((item) => item?.track?.id as string).join(",");
    const track_artists = tracks.body.items.slice(0,1).map((item) => item?.track?.artists?.[0]?.id as string).join(",");

    console.log(`finished searching for query: ${query}`)
    console.log({
        seed_artists: track_artists,
        seed_tracks: track_ids
    })
    
    return {
        seed_artists: track_artists,
        seed_tracks: track_ids
    } 
};

const correct_in_range = (value: number, min: number, max: number, is_int: boolean): number => {
    if (value < 0) { 
        value = Math.abs(value);
    } 
    
    if (value < min) {
        value = min;
    } 
    
    if (value > max) {
        value = max - 1;
    }
    
    if (is_int) {
        value = Math.round(value);
    }

    return value;
}

const INT_32_MAX = 2147483647;
const INT_32_MIN = -2147483648;
const validateFeatures = (features: SongFeatures): SongFeatures => {
    const validated_features = {
        acousticness: correct_in_range(features.acousticness, 0, 1, false),
        danceability: correct_in_range(features.danceability, 0, 1, false),
        duration_ms: correct_in_range(features.duration_ms, 50000, INT_32_MAX, true),
        energy: correct_in_range(features.energy, 0, 1, false),
        instrumentalness: correct_in_range(features.instrumentalness, 0, 1, false),
        key: correct_in_range(features.key, 0, 11, true),
        liveness: correct_in_range(features.liveness, 0, 1, false),
        loudness: correct_in_range(features.loudness, INT_32_MIN, INT_32_MAX, false),
        mode: correct_in_range(features.mode, 0, 1, true),
        speechiness: correct_in_range(features.speechiness, 0, 1, false),
        tempo: correct_in_range(features.tempo, 0, INT_32_MAX, false),
        time_signature: correct_in_range(features.time_signature, 0, INT_32_MAX, true),
        valence: correct_in_range(features.valence, 0, 1, false),
    } 
    
    return validated_features; 
}

export const getRecommendationsAsync = async (query: string, song_features: SongFeatures, bearerToken: string): Promise<Song[]> => {
    const spotifyApi = new SpotifyWebApi({
        accessToken: bearerToken,
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });

    const seeds = await searchPlaylists(query, spotifyApi);

    const validated_features = validateFeatures(song_features);
    let opts = {
        seed_tracks: seeds.seed_tracks,
        target_acousticness: validated_features.acousticness, 
        target_danceability: validated_features.danceability,
        target_duration_ms: validated_features.duration_ms,
        target_energy: validated_features.energy,
        target_instrumentalness: validated_features.instrumentalness,
        target_key: validated_features.key,
        target_liveness: validated_features.liveness,
        target_loudness: validated_features.loudness,
        target_mode: validated_features.mode,
        target_speechiness: validated_features.speechiness,
        target_tempo: validated_features.tempo,
        target_time_signature: validated_features.time_signature,
        target_valence: validated_features.valence
    }; 

    const response = await spotifyApi.getRecommendations(opts);

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
