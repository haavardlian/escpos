import { Device, findByIds, getDeviceList, on as addEventListener, OutEndpoint } from "usb";
import Adapter from "../Adapter";

const PRINTER_CLASS = 0x07;

export interface IUsbOptions {
    vid: number;
    pid: number;
}

export default class Usb extends Adapter {
    private static getPrinterDevices(): Device[] {
        return getDeviceList().filter(device => {
            try {
                device.open();
                return device.interfaces.some(iface => iface.descriptor.bInterfaceClass === PRINTER_CLASS);
            } catch (err) {
                return false;
            } finally {
                device.close();
            }
        });
    }

    private device: Device;
    private endpoint: OutEndpoint;

    constructor(options?: IUsbOptions) {
        super();

        if (options) {
            this.device = findByIds(options.vid, options.pid);
        } else {
            const devices = Usb.getPrinterDevices();
            if (devices.length > 0) {
                this.device = devices[0];
            }
        }

        addEventListener("detatch", device => {
            if (device === this.device) {
                this.device.close();
            }
        });
    }

    public async open(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.device === undefined) {
                reject("No printer found");
            }

            this.device.open();
            this.device.interfaces.forEach(iface => {
                iface.claim();
                iface.endpoints.filter(endpoint => {
                    if (endpoint.direction === "out") {
                        this.endpoint = endpoint as OutEndpoint;
                        resolve();
                    }
                });
            });
            this.rejectIfNeeded(reject, "Cannot open printer");
        });
    }

    public async write(data: Uint8Array): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.rejectIfNeeded(reject);
            this.endpoint.transfer(new Buffer(data), err => {
                err ? reject(err) : resolve();
            });
        });
    }

    public close(): void {
        this.device.close();
        this.device = null;
        this.endpoint = null;
    }

    private rejectIfNeeded(reject: (reason?: any) => void, reason?: string) {
        if (!this.device || !this.endpoint) {
            reject(reason || "No USB device is open");
        }
    }
}
