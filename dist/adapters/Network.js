"use strict";
const Adapter_1 = require("../Adapter");
const net_1 = require("net");
class Network extends Adapter_1.default {
    constructor(address, port = 9100) {
        super();
        this.device = new net_1.Socket();
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
        this.device.on("error", (error) => {
            console.error(error.code);
        });
    }
    open() {
        return new Promise(resolve => {
            this.retrying = true;
            this.device.connect(this.options.port, this.options.address);
            this.device.on("connect", () => {
                this.retrying = false;
                resolve();
            });
        });
    }
    write(data) {
        return new Promise(resolve => {
            this.device.write(data, () => resolve());
        });
    }
    close() {
        this.retrying = false;
        this.device.destroy();
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Network;
