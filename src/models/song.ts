export interface Song {
    id: string;
    uri: string;
    name: string;
    artists: string[];
    album: string;
    durationMs: number;
    images: AlbumImage[];
}

export interface AlbumImage {
    height: number | undefined;
    width: number | undefined;
    url: string;
}
