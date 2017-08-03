import * as fs from "fs";
import { PNG } from "pngjs";

export default class Image {

    public static load(path: string): Promise<Image> {
        return new Promise((resolve, reject) => {
            const png = new PNG();
            fs.createReadStream(path)
                .pipe(png)
                .on("parsed", () => {
                    const pixels = new Array<boolean>(png.width * png.height);
                    for (let y = 0; y < png.height; y++) {
                        for (let x = 0; x < png.width; x++) {
                            // Get index 32bpp
                            const idx = (png.width * y + x) * 4;
                            let value = false;
                            // Anything that is white-ish and has alpha > 128 is colored in, rest is blank.
                            if (png.data[idx] < 0xE6 || png.data[idx + 1] < 0xE6 || png.data[idx + 2] < 0xE6) {
                                value = true;
                            }
                            if (value && png.data[idx + 3] <= 0x80) {
                                value = false;
                            }
                            pixels[png.width * y + x] = value;
                        }
                    }
                    resolve(new Image(pixels, png.width, png.height));
                });
        });
    }

    public colors: number;
    public width: number;
    public height: number;
    private data: boolean[];

    constructor(pixels: boolean[], width: number, height: number) {
        this.data = pixels;
        this.width = width;
        this.height = height;
    }

    public toRaster(): IRaster {
        const n = Math.ceil(this.width / 8);
        const result = new Uint8Array(this.height * n);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.data[y * this.width + x]) {
                    // tslint:disable-next-line no-bitwise
                    result[y * n + (x >> 3)] += (0x80 >> ((x % 8) & 0x7));
                }
            }
        }

        return {
            data: result,
            height: this.height,
            width: n,
        };
    }
}

export interface IRaster {
    data: Uint8Array;
    height: number;
    width: number;
}
