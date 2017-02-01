/// <reference types="node" />
import Adapter from "../Adapter";
export interface IEndpoint {
    address: string;
    port: number;
}
export default class Network extends Adapter {
    private retrying;
    private options;
    private device;
    constructor(address: string, port?: number);
    open(): Promise<undefined>;
    write(data: Buffer): Promise<undefined>;
    close(): void;
}
