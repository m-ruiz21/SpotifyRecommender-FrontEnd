import { spotifyApi } from "../../auth/utils/spotify-auth";
import { SongFeatures } from "../../../../models/song-features";

export const getFeaturesAsync = async (song_features: SongFeatures): Promise {

    const opts = {
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
    

    return response;
};
