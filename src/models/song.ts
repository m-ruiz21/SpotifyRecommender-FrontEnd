export interface Song {
    id: string;
    uri: string;
    name: string;
    artists: string[];
    album: string;
    durationMs: number;
    images: AlbumImage[];
    explicit: boolean;
    timeAdded: Date;
}

export interface AlbumImage {
    height: number;
    width: number;
    url: string;
}