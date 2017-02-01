import * as getPixels from "get-pixels";
export default class Image {
    static load(url: string, type?: string): Promise<Image>;
    colors: number;
    width: number;
    height: number;
    private pixels;
    private data;
    constructor(pixels: getPixels.IPixels);
    toRaster(): IRaster;
}
export interface IRaster {
    data: number[];
    height: number;
    width: number;
}
