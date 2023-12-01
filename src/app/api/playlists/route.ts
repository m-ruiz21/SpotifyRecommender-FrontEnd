import { NextRequest } from 'next/server'
import { Playlist } from '../../../models/playlist'
import { addPlaylistAsync } from './utils'

export const PUT = async (
    req: NextRequest,
) => {
    const bearerToken = req.headers.get("authorization")?.replace("Bearer ", ""); 
    
    console.log(`got beaeer token ${bearerToken}`)
    if (!bearerToken) {
        return new Response("Missing required parameters", { status: 400 });
    }
    
    const playlists: Playlist = JSON.parse(await req.text())
    const playlist_id = await addPlaylistAsync(playlists, bearerToken);
     
    return new Response(playlist_id, {status: 200})
}