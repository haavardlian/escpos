declare module "mutable-buffer" {
    class MutableBuffer {
        constructor(size?: number, blockSize?: number)
        write(data: Buffer | Array<any> | string, encoding?: string): MutableBuffer;
        writeUInt8(value: number, noAssert?: boolean);
        writeUInt16LE(value: number, noAssert?: boolean)
        flush(): Buffer;
        capacity(): number;
        clear(): void;
        join(): Buffer;
    }
}

declare module "get-pixels" {
    namespace getPixels {
        interface IPixels {
            data: number[];
            shape: number[];
        }
    }
    function getPixels(path: string, type: string, callback?: (err: any, pixels: getPixels.IPixels) => void);

    export = getPixels;
}
