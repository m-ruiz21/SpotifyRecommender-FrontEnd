import { Song } from './song';

export interface Playlist {
    songs: Song[];
    name: string;
}