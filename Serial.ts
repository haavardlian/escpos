import Adapter from "./Adapter";
import * as SerialPort from "serialport";

interface IOpenOptions {
    autoOpen: boolean;
    lock: boolean;
    baudRate: number;
    dataBits: number;
    stopBits: number;
    parity: boolean;
    rtscts: boolean;
    xon: boolean;
    xoff: boolean;
    xany: boolean;
    bufferSize: boolean;
}

export default class Network extends Adapter {
    private device: SerialPort;

    constructor(path: string, options: IOpenOptions) {
        super();
        options.autoOpen = false;
        this.device = new SerialPort(path, options);
    }

    public open(): Promise<undefined> {
        return new Promise(resolve => {
            this.device.open(() => {
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
        this.device.drain(() => {
            this.device.close();
        });
    }
}

export {
    IOpenOptions
}
