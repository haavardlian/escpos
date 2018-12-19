import { PNG } from "pngjs";
import { createStreamFromPath } from "./Utils";

export default class Image {
    public static async load(path: string): Promise<Image> {
        const stream = await createStreamFromPath(path);

        return new Promise<Image>(resolve => {
            stream.pipe(new PNG()).on("parsed", function(this: PNG) {
                const pixels = new Array<boolean>(this.width * this.height);
                for (let y = 0; y < this.height; y++) {
                    for (let x = 0; x < this.width; x++) {
                        // Get index 32bpp
                        const idx = (this.width * y + x) * 4;
                        let value = false;
                        // Anything that is white-ish and has alpha > 128 is colored in, rest is blank.
                        if (this.data[idx] < 0xE6 || this.data[idx + 1] < 0xE6 || this.data[idx + 2] < 0xE6) {
                            value = true;
                        }
                        if (value && this.data[idx + 3] <= 0x80) {
                            value = false;
                        }
                        pixels[this.width * y + x] = value;
                    }
                }
                resolve(new Image(pixels, this.width, this.height));
            });
        });
    }

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
            width: n
        };
    }
}

export interface IRaster {
    data: Uint8Array;
    height: number;
    width: number;
}
