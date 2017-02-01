/// <reference types="node" />
declare abstract class Adapter {
    abstract open(): Promise<Object>;
    abstract write(data: Buffer): Promise<Object>;
    abstract close(): void;
}
export default Adapter;
