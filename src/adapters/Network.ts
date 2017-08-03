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
    constructor(address: string, port: number = 9100) {
        super();
        this.device = new Socket();
        this.retrying = false;
        this.options = {
            address,
            port,
        };

        this.device.on("close", () => {
            if (this.retrying) {
                setTimeout(() => {
                    this.device.connect(this.options.port, this.options.address);
                }, 5000);
            }
        });

        this.device.on("error", (error: any) => {
            console.error(error.code);
        });
    }

    public open(): Promise<undefined> {
        return new Promise(resolve => {
            this.retrying = true;
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
