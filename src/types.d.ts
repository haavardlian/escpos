declare module "pngjs" {
    import Stream = require("stream");

    export interface Color {
        red: number;
        green: number;
        blue: number;
    }

    export interface Options {
        width?: number;
        height?: number;
        checkCRC?: boolean;
        deflateChunkSize?: number;
        deflateLevel?: number;
        deflateStrategy?: number;
        deflateFactory?: Object;
        filterType?: number;
        colorType?: number;
        inputHasAlpha?: boolean;
        bgColor?: Color;
    }

    class PNGSync {
        read(buffer: Buffer, options?: Options): PNG;
        write(png: PNG): PNG;
    }

    export class PNG extends Stream {
        public writable: boolean;
        public height: number;
        public width: number;
        public gamma: number;
        public data: number[];
        public inputHasAlpha: boolean;
        static sync: PNGSync;
        constructor(options?: Options);
        write(data: any): boolean;
        end(data: Buffer, cb?: Function): void;
        end(): void;
        end(data: string, cb?: Function): void;
    }
}
