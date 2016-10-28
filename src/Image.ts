import * as getPixels from "get-pixels";

export default class Image {

    public static load(url: string, type: string = null): Promise<Image> {
        return new Promise((resolve, reject) => {
            getPixels(url, type, (err, pixels) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Image(pixels));
                }
            });
        });
    }

    public colors: number;
    public width: number;
    public height: number;
    private pixels: any;
    private data: number[];

    constructor(pixels: getPixels.IPixels) {
        this.pixels = pixels;
        this.data = [];
        this.width = this.pixels.shape[0];
        this.height = this.pixels.shape[1];
        this.colors = this.pixels.shape[2];

        for (let i = 0; i < this.pixels.data.length; i += this.colors) {
            let value = 0xFF * (this.colors - 1);
            for (let j = 0; j < this.colors; j++) {
                value -= this.pixels.data[i + j];
            }
            if (this.pixels.data[i + this.colors - 1] === 0) {
                value = 0;
            }
            this.data.push(value);
        }
    }

    public toRaster(): IRaster {
        let result = [];
        let n = Math.ceil(this.width / 8);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                for (let b = 0; b < 8; b++) {
                    let i = x * 8 + b;
                    if (result[y * n + x] === undefined) {
                        result[y * n + x] = 0;
                    }
                    let c = x * 8 + b;
                    if (c < this.width) {
                        if (this.data[y * this.width + i]) {
                            // tslint:disable-next-line no-bitwise
                            result[y * n + x] += (0x80 >> (b & 0x7));
                        }
                    }
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
    data: number[];
    height: number;
    width: number;
}
