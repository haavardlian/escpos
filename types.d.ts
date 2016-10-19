declare module "mutable-buffer" {
    class MutableBuffer {
        constructor(size?: number, blockSize?: number)
        write(data: Buffer | Array<any> | string, encoding?: string): MutableBuffer;
        writeUInt8(value: number, noAssert?: boolean);
        flush(): Buffer;
        capacity(): number;
        clear(): void;
        join(): Buffer;
    }
}