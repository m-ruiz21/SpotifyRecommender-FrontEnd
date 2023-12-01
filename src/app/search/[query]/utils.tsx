import { Dispatch } from "react";
import { SetStateAction } from "react";
import ColorThief from "colorthief";

export const extractBackgroundColor = (url: string, setBackgroundColor: Dispatch<SetStateAction<string>>) => {
    const img: HTMLImageElement = document.createElement('img');
    img.src = url;
    img.crossOrigin = 'Anonymous';

    img.addEventListener('load', () => {
      const colorThief = new ColorThief();
      const color: number[] = colorThief.getColor(img);
      const isCloseToWhite: boolean = isColorCloseToWhite(color);

      if (isCloseToWhite) {
        const colorPalette: number[][] = colorThief.getPalette(img);
        const nonWhiteColor: number[] = findFirstNonWhiteColor(colorPalette);
        setBackgroundColor(`rgb(${nonWhiteColor[0]}, ${nonWhiteColor[1]}, ${nonWhiteColor[2]})`);
      } else {
        setBackgroundColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      }
    });
  };

const findFirstNonWhiteColor = (colorPalette: number[][]): number[] => {
    for (const color of colorPalette) {
      if (!isColorCloseToWhite(color)) {
        return color;
      }
    }
    return colorPalette[0];
  };


const isColorCloseToWhite = (color: number[]): boolean => {
    const whiteThreshold = 200; // Adjust this threshold to your preference
    const sum = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];
    return sum > whiteThreshold;
  };