import * as WebSocket from "ws";
import Adapter from "../Adapter";

export default class Websocket extends Adapter {
    private address: string;
    private device: WebSocket;
    private connected: boolean;

    constructor(address: string) {
        super();
        this.address = address;
    }

    public async open(): Promise<void> {
        return new Promise<void>(resolve => {
            this.device = new WebSocket(this.address);
            this.device.on("open", () => {
                this.connected = true;
                resolve();
            });

            this.device.on("close", () => {
                this.connected = false;
            });

            this.device.on("error", err => {
                this.connected = false;
                throw err;
            });
        });
    }

    public async write(data: Uint8Array): Promise<void> {
        return new Promise<void>(resolve => {
            this.throwIfNeeded();
            this.device.send(new Buffer(data), err => {
                if (err) {
                    throw err;
                }
                resolve();
            });
        });
    }

    public async close(): Promise<void> {
        this.throwIfNeeded();
        this.connected = false;
        this.device.close();
    }

    private throwIfNeeded(reason?: string) {
        if (!this.device || !this.connected) {
            throw new Error(reason || "The websocket is not open");
        }
    }
}
