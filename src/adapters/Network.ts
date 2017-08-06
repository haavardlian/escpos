import { Socket } from "net";
import Adapter from "../Adapter";

export interface IEndpoint {
    address: string;
    port: number;
}

export default class Network extends Adapter {
    private retrying: boolean;
    private options: IEndpoint;
    private device: Socket;
    private retries: number;
    private reject: (reason: any) => void;

    constructor(address: string, port: number = 9100, retries: number = 0) {
        super();
        this.device = new Socket();
        this.retrying = false;
        this.retries = 0;
        this.options = {
            address,
            port,
        };

        this.device.on("close", () => {
            if (this.retrying && (retries === 0 || this.retries < retries)) {
                this.retries++;
                setTimeout(() => {
                    this.device.connect(this.options.port, this.options.address);
                }, 5000);
            } else {
                this.retrying = false;
                this.reject(`Cannot connect to ${this.options.address}:${this.options.port}`);
            }
        });

        this.device.on("error", Function.prototype);
    }

    public open(): Promise<undefined> {
        return new Promise((resolve, reject) => {
            this.retrying = true;
            this.reject = reject;
            this.device.connect(this.options.port, this.options.address);
            this.device.on("connect", () => {
                this.retrying = false;
                resolve();
            });
        });
    }

    public write(data: Uint8Array): Promise<undefined> {
        return new Promise(resolve => {
            this.device.write(new Buffer(data), resolve);
        });
    }

    public close(): void {
        this.retrying = false;
        this.device.destroy();
    }
}
