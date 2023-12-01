import { SongFeatures } from "../../../../models/song-features";

const API_URL = "http://127.0.0.1:5000/predict";

export const getFeaturesAsync = async (playlist_name: string): Promise<SongFeatures> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({  playlist_name: playlist_name }),
    });

    return response.json();
};
