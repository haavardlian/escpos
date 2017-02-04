import * as iconv from "iconv-lite";
import { MutableBuffer } from "mutable-buffer";
import Adapter from "./Adapter";
import { Barcode, CodeTable, Color, DrawerPin, Font,
    Justification, PDF417ErrorCorrectLevel, PDF417Type,
    Position, QRErrorCorrecLevel, RasterMode, TextMode, Underline } from "./Commands";
import Image from "./Image";

export default class Printer {
    private encoding: string;
    private buffer: MutableBuffer;
    private adapter: Adapter;

    constructor(adapter: Adapter, encoding: string = "ascii") {
        this.adapter = adapter;
        this.buffer = new MutableBuffer();
        this.encoding = encoding;
    }

    public setEncoding(encoding: string): Printer {
        this.encoding = encoding;
        return this;
    }

    public flush(): Promise<undefined> {
        return this.adapter.write(this.buffer.flush());
    }

    public init(): Printer {
        this.write(0x1B);
        this.write("@");
        return this;
    }

    public resetToDefault(): Printer {
        this.setInverse(false);
        this.setBold(false);
        this.setUnderline(Underline.NoUnderline);
        this.setJustification(Justification.Left);
        this.setTextMode(TextMode.Normal);
        this.setFont(Font.A);
        return this;
    }

    public feed(feed: number = 1): Printer {
        this.write(0x1B);
        this.write("d");
        this.write(feed);
        return this;
    }

    public reverse(feed: number = 1): Printer {
        this.write(0x1B);
        this.write("e");
        this.write(feed);
        return this;
    }

    public setBold(bold: boolean = true): Printer {
        this.write(0x1B);
        this.write("E");
        this.write(bold ? 1 : 0);
        return this;
    }

    public setDoubleStrike(double: boolean = true): Printer {
        this.write(0x1B);
        this.write("G");
        this.write(double ? 0xFF : 0);
        return this;
    }

    public setInverse(inverse: boolean = true): Printer {
        this.write(0x1D);
        this.write("B");
        this.write(inverse ? 1 : 0);
        return this;
    }

    public setUnderline(value: Underline): Printer {
        this.write(0x1B);
        this.write("-");
        this.write(value);
        return this;
    }

    public setJustification(value: Justification): Printer {
        this.write(0x1B);
        this.write("a");
        this.write(value);
        return this;
    }

    public setFont(value: Font): Printer {
        this.write(0x1B);
        this.write("M");
        this.write(value);
        return this;
    }

    public cut(partial: boolean = false): Printer {
        this.write(0x1D);
        this.write("V");
        this.write(partial ? 1 : 0);
        return this;
    }

    public openDrawer(pin: DrawerPin = DrawerPin.Pin2): Printer {
        this.write(0x1B);
        this.write("p");
        this.write(pin);
        this.write(10);
        this.write(10);
        return this;
    }

    public setColor(color: Color): Printer {
        this.write(0x1B);
        this.write("r");
        this.write(color);
        return this;
    }

    public setCodeTable(table: CodeTable): Printer {
        this.write(0x1B);
        this.write("t");
        this.write(table);
        return this;
    }

    public setTextMode(mode: TextMode): Printer {
        this.write(0x1B);
        this.write("!");
        this.write(mode);
        return this;
    }

    public barcode(code: string, type: Barcode, height: number,
                   width: 2|3|4|5|6, font: Font, pos: Position): Printer {
        // Set the position of barcode text
        this.write(0x1D);
        this.write("H");
        this.write(pos);

        // Set font for barcode text
        this.write(0x1D);
        this.write("f");
        this.write(font);

        // Set height of barcode
        this.write(0x1D);
        this.write("h");
        this.write(height);

        // Set width of barcode
        this.write(0x1D);
        this.write("w");
        this.write(width);

        // Print the barcode
        this.write(0x1D);
        this.write("k");
        this.write(type);
        this.write(code);
        this.write(0);

        return this;
    }

    public qr(code: string, errorCorrect: QRErrorCorrecLevel, size: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16): Printer {
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

    public pdf417(code: string, type: PDF417Type = PDF417Type.Standard, height: number = 1, width: number = 20,
                  columns: number = 0, rows: number = 0,
                  error: PDF417ErrorCorrectLevel = PDF417ErrorCorrectLevel.Level1): Printer {
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

    public beep(): Printer {
        this.write(0x1B);
        this.write("(A");
        this.write(new Buffer([4, 0, 48, 51, 3, 15]));
        return this;
    }

    public setLineSpacing(spacing?: number): Printer {
        this.write(0x1B);
        if (spacing) {
            this.write("3");
            this.write(spacing);
        } else {
            this.write("2");
        }
        return this;
    }

    public raster(image: Image, mode: RasterMode): Printer {
        const header: Buffer = new Buffer([0x1D, 0x76, 0x30, mode]);
        const raster = image.toRaster();
        this.buffer.write(header);
        this.buffer.writeUInt16LE(raster.width);
        this.buffer.writeUInt16LE(raster.height);
        this.buffer.write(raster.data);
        return this;
    }

    public writeLine(value: string, encoding?: string): Printer {
        return this.write(value + "\n", encoding);
    }

    public writeList(values: string[], encoding?: string): Printer {
        for (const value of values) {
            this.writeLine(value, encoding);
        }
        return this;
    }

    public close(): Promise<undefined> {
        return new Promise((resolve) => {
            this.flush().then(() => {
                this.adapter.close();
                resolve();
            });
        });
    }

    public open(): Promise<Printer> {
        return new Promise((resolve) => {
            this.adapter.open().then(() => resolve(this));
        });
    }

    public clearBuffer(): Printer {
        this.buffer.clear();
        return this;
    }

    private write(value: string | Buffer | number, encoding?: string): Printer {
        if (typeof value === "number") {
            this.buffer.writeUInt8(value);
        } else if (typeof value === "string") {
            this.buffer.write(iconv.encode(value, encoding || this.encoding));
        } else {
            this.buffer.write(value);
        }
        return this;
    }
}
