import * as SerialPort from "serialport";
import Adapter from "../Adapter";

export default class Serial extends Adapter {
    private device: SerialPort;

    constructor(path: string, options: any) {
        super();
        options.autoOpen = false;
        this.device = new SerialPort(path, options);
    }

    public open(): Promise<undefined> {
        return new Promise(resolve => {
            this.device.open(resolve);
        });
    }

    public write(data: Uint8Array): Promise<undefined> {
        return new Promise(resolve => {
            this.device.write(new Buffer(data), resolve);
        });
    }

    public close(): void {
        this.device.drain(() => {
            this.device.close();
        });
    }
}
