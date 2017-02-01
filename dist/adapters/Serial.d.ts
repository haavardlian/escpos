/// <reference types="node" />
import Adapter from "../Adapter";
export default class Network extends Adapter {
    private device;
    constructor(path: string, options: any);
    open(): Promise<undefined>;
    write(data: Buffer): Promise<undefined>;
    close(): void;
}
