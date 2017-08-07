import * as SerialPort from "serialport";
import Adapter from "../Adapter";

export default class Serial extends Adapter {
    private device: SerialPort;

    constructor(path: string, options: SerialPort.options) {
        super();
        options.autoOpen = false;
        this.device = new SerialPort(path, options);
    }

    public async open(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.device.open(err => {
                err ? reject(err) : resolve();
            });
        });
    }

    public async write(data: Uint8Array): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.device.write(new Buffer(data), (err, written) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    public close(): void {
        this.device.drain(() => {
            this.device.close();
        });
    }
}
