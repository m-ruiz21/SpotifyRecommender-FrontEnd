declare module 'colorthief' {
    export default class ColorThief {
        getColor(sourceImage: HTMLImageElement): number[];
        getPalette(sourceImage: HTMLImageElement, colorCount?: number, quality?: number): number[][];
    }
}