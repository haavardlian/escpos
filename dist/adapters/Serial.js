"use strict";
const Adapter_1 = require("../Adapter");
const SerialPort = require("serialport");
class Network extends Adapter_1.default {
    constructor(path, options) {
        super();
        options.autoOpen = false;
        this.device = new SerialPort(path, options);
    }
    open() {
        return new Promise(resolve => {
            this.device.open(() => {
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
        this.device.drain(() => {
            this.device.close();
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Network;
