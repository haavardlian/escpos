"use strict";
const Commands_1 = require("./Commands");
const iconv = require("iconv-lite");
const mutable_buffer_1 = require("mutable-buffer");
class Printer {
    constructor(adapter, encoding = "ascii") {
        this.encoding = "ascii";
        this.adapter = adapter;
        this.buffer = new mutable_buffer_1.MutableBuffer();
        this.encoding = encoding;
    }
    setEncoding(encoding) {
        this.encoding = encoding;
        return this;
    }
    flush() {
        return this.adapter.write(this.buffer.flush());
    }
    init() {
        this.write(0x1B);
        this.write("@");
        return this;
    }
    resetToDefault() {
        this.setInverse(false);
        this.setBold(false);
        this.setUnderline(Commands_1.Underline.NoUnderline);
        this.setJustification(Commands_1.Justification.Left);
        this.setTextMode(Commands_1.TextMode.Normal);
        this.setFont(Commands_1.Font.A);
        return this;
    }
    feed(feed = 1) {
        this.write(0x1B);
        this.write("d");
        this.write(feed);
        return this;
    }
    reverse(feed = 1) {
        this.write(0x1B);
        this.write("e");
        this.write(feed);
        return this;
    }
    setBold(bold = true) {
        this.write(0x1B);
        this.write("E");
        this.write(bold ? 1 : 0);
        return this;
    }
    setDoubleStrike(double = true) {
        this.write(0x1B);
        this.write("G");
        this.write(double ? 0xFF : 0);
        return this;
    }
    setInverse(inverse = true) {
        this.write(0x1D);
        this.write("B");
        this.write(inverse ? 1 : 0);
        return this;
    }
    setUnderline(value) {
        this.write(0x1B);
        this.write("-");
        this.write(value);
        return this;
    }
    setJustification(value) {
        this.write(0x1B);
        this.write("a");
        this.write(value);
        return this;
    }
    setFont(value) {
        this.write(0x1B);
        this.write("M");
        this.write(value);
        return this;
    }
    cut(partial = false) {
        this.write(0x1D);
        this.write("V");
        this.write(partial ? 1 : 0);
        return this;
    }
    openDrawer(pin = Commands_1.DrawerPin.Pin2) {
        this.write(0x1B);
        this.write("p");
        this.write(pin);
        this.write(10);
        this.write(10);
        return this;
    }
    setColor(color) {
        this.write(0x1B);
        this.write("r");
        this.write(color);
        return this;
    }
    setCodeTable(table) {
        this.write(0x1B);
        this.write("t");
        this.write(table);
        return this;
    }
    setTextMode(mode) {
        this.write(0x1B);
        this.write("!");
        this.write(mode);
        return this;
    }
    barcode(code, type, height, width, font, pos) {
        this.write(0x1D);
        this.write("H");
        this.write(pos);
        this.write(0x1D);
        this.write("f");
        this.write(font);
        this.write(0x1D);
        this.write("h");
        this.write(height);
        this.write(0x1D);
        this.write("w");
        this.write(width);
        this.write(0x1D);
        this.write("k");
        this.write(type);
        this.write(code);
        this.write(0);
        return this;
    }
    qr(code, errorCorrect, size) {
        this.write(0x1D);
        this.write("(k");
        this.buffer.writeUInt16LE(code.length + 3);
        this.write(new Buffer([49, 80, 48]));
        this.write(code);
        this.write(0x1D);
        this.write("(k");
        this.write(new Buffer([3, 0, 49, 69]));
        this.write(errorCorrect);
        this.write(0x1D);
        this.write("(k");
        this.write(new Buffer([3, 0, 49, 67]));
        this.write(size);
        this.write(0x1D);
        this.write("(k");
        this.write(new Buffer([3, 0, 49, 81, 48]));
        return this;
    }
    pdf417(code, type = Commands_1.PDF417Type.Standard, height = 1, width = 20, columns = 0, rows = 0, error = Commands_1.PDF417ErrorCorrectLevel.Level1) {
        this.write(0x1D);
        this.write("(k");
        this.buffer.writeUInt16LE(code.length + 3);
        this.write(new Buffer([0x30, 0x50, 0x30]));
        this.write(code);
        this.write(0x1D);
        this.write("(k");
        this.write(new Buffer([3, 0, 48, 65]));
        this.write(columns);
        this.write(0x1D);
        this.write("(k");
        this.write(new Buffer([3, 0, 48, 66]));
        this.write(rows);
        this.write(0x1D);
        this.write("(k");
        this.write(new Buffer([3, 0, 48, 67]));
        this.write(width);
        this.write(0x1D);
        this.write("(k");
        this.write(new Buffer([3, 0, 48, 68]));
        this.write(height);
        this.write(0x1D);
        this.write("(k");
        this.write(new Buffer([4, 0, 48, 69, 48]));
        this.write(error);
        this.write(0x1D);
        this.write("(k");
        this.write(new Buffer([3, 0, 48, 70]));
        this.write(type);
        this.write(0x1D);
        this.write("(k");
        this.write(new Buffer([3, 0, 48, 81, 48]));
        return this;
    }
    beep() {
        this.write(0x1B);
        this.write("(A");
        this.write(new Buffer([4, 0, 48, 51, 3, 15]));
        return this;
    }
    setLineSpacing(spacing) {
        this.write(0x1B);
        if (spacing) {
            this.write("3");
            this.write(spacing);
        }
        else {
            this.write("2");
        }
        return this;
    }
    raster(image, mode) {
        let header = new Buffer([0x1D, 0x76, 0x30, mode]);
        let raster = image.toRaster();
        this.buffer.write(header);
        this.buffer.writeUInt16LE(raster.width);
        this.buffer.writeUInt16LE(raster.height);
        this.buffer.write(raster.data);
        return this;
    }
    writeLine(value, encoding) {
        return this.write(value + "\n", encoding);
    }
    close() {
        return new Promise(resolve => {
            this.flush().then(() => {
                this.adapter.close();
                resolve();
            });
        });
    }
    open() {
        return new Promise(resolve => {
            this.adapter.open().then(() => resolve(this));
        });
    }
    clearBuffer() {
        this.buffer.clear();
        return this;
    }
    write(value, encoding) {
        if (typeof value === "number") {
            this.buffer.writeUInt8(value);
        }
        else if (typeof value === "string") {
            this.buffer.write(iconv.encode(value, encoding || this.encoding));
        }
        else {
            this.buffer.write(value);
        }
        return this;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Printer;
