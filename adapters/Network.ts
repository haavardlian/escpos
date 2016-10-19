import Adapter from "../Adapter";
import { Socket } from "net";

interface IEndpoint {
    address: string;
    port: number;
}

export default class Network extends Adapter {
    private retrying: boolean;
    private options: IEndpoint;
    private device: Socket;
    constructor(address: string, port: number) {
        super();
        this.device = new Socket();
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

        this.retrying = false;
        this.options = {
            address,
            port,
        };
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

    public write(data: Buffer): Promise<undefined> {
        return new Promise(resolve => {
            this.device.write(data, () => resolve());
        });
    }

    public close(): void {
        this.retrying = false;
        this.device.destroy();
    }
}

export {
    IEndpoint
};
