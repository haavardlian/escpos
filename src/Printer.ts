import * as iconv from "iconv-lite";
import Adapter from "./Adapter";
import { Barcode, CodeTable, Color, DrawerPin, Font,
    Justification, PDF417ErrorCorrectLevel, PDF417Type,
    Position, QRErrorCorrectLevel, RasterMode, TextMode, Underline } from "./Commands";
import Image from "./Image";
import MutableBuffer from "./MutableBuffer";

const ESC = 0x1B;
const GS = 0x1D;

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

    public async flush(): Promise<void> {
        await this.adapter.write(this.buffer.flush());
        return;
    }

    public init(): Printer {
        this.write(ESC);
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
        this.write(ESC);
        this.write("d");
        this.write(feed);
        return this;
    }

    public reverse(feed: number = 1): Printer {
        this.write(ESC);
        this.write("e");
        this.write(feed);
        return this;
    }

    public setBold(bold: boolean = true): Printer {
        this.write(ESC);
        this.write("E");
        this.write(bold ? 1 : 0);
        return this;
    }

    public setDoubleStrike(double: boolean = true): Printer {
        this.write(ESC);
        this.write("G");
        this.write(double ? 0xFF : 0);
        return this;
    }

    public setInverse(inverse: boolean = true): Printer {
        this.write(GS);
        this.write("B");
        this.write(inverse ? 1 : 0);
        return this;
    }

    public setUnderline(value: Underline): Printer {
        this.write(ESC);
        this.write("-");
        this.write(value);
        return this;
    }

    public setJustification(value: Justification): Printer {
        this.write(ESC);
        this.write("a");
        this.write(value);
        return this;
    }

    public setFont(value: Font): Printer {
        this.write(ESC);
        this.write("M");
        this.write(value);
        return this;
    }

    public cut(partial: boolean = false): Printer {
        this.write(GS);
        this.write("V");
        this.write(partial ? 1 : 0);
        return this;
    }

    public openDrawer(pin: DrawerPin = DrawerPin.Pin2): Printer {
        this.write(ESC);
        this.write("p");
        this.write(pin);
        this.write(10);
        this.write(10);
        return this;
    }

    public setColor(color: Color): Printer {
        this.write(ESC);
        this.write("r");
        this.write(color);
        return this;
    }

    public setCodeTable(table: CodeTable): Printer {
        this.write(ESC);
        this.write("t");
        this.write(table);
        return this;
    }

    public setTextMode(mode: TextMode): Printer {
        this.write(ESC);
        this.write("!");
        this.write(mode);
        return this;
    }

    public barcode(code: string, type: Barcode, height: number,
                   width: 2|3|4|5|6, font: Font, pos: Position): Printer {
        // Set the position of barcode text
        this.write(GS);
        this.write("H");
        this.write(pos);

        // Set font for barcode text
        this.write(GS);
        this.write("f");
        this.write(font);

        // Set height of barcode
        this.write(GS);
        this.write("h");
        this.write(height);

        // Set width of barcode
        this.write(GS);
        this.write("w");
        this.write(width);

        // Print the barcode
        this.write(GS);
        this.write("k");
        this.write(type);
        this.write(code);
        this.write(0);

        return this;
    }

    public qr(code: string, errorCorrect: QRErrorCorrectLevel, size: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16): Printer {
        this.write(GS);
        this.write("(k");
        this.buffer.writeUInt16LE(code.length + 3);
        this.write(new Uint8Array([49, 80, 48]));
        this.write(code);

        this.write(GS);
        this.write("(k");
        this.write(new Uint8Array([3, 0, 49, 69]));
        this.write(errorCorrect);

        this.write(GS);
        this.write("(k");
        this.write(new Uint8Array([3, 0, 49, 67]));
        this.write(size);

        this.write(GS);
        this.write("(k");
        this.write(new Uint8Array([3, 0, 49, 81, 48]));
        return this;
    }

    public pdf417(code: string, type: PDF417Type = PDF417Type.Standard, height: number = 1,
                  width: number = 20, columns: number = 0, rows: number = 0,
                  error: PDF417ErrorCorrectLevel = PDF417ErrorCorrectLevel.Level1): Printer {
        this.write(GS);
        this.write("(k");
        this.buffer.writeUInt16LE(code.length + 3);
        this.write(new Uint8Array([0x30, 0x50, 0x30]));
        this.write(code);

        this.write(GS);
        this.write("(k");
        this.write(new Uint8Array([3, 0, 48, 65]));
        this.write(columns);

        this.write(GS);
        this.write("(k");
        this.write(new Uint8Array([3, 0, 48, 66]));
        this.write(rows);

        this.write(GS);
        this.write("(k");
        this.write(new Uint8Array([3, 0, 48, 67]));
        this.write(width);

        this.write(GS);
        this.write("(k");
        this.write(new Uint8Array([3, 0, 48, 68]));
        this.write(height);

        this.write(GS);
        this.write("(k");
        this.write(new Uint8Array([4, 0, 48, 69, 48]));
        this.write(error);

        this.write(GS);
        this.write("(k");
        this.write(new Uint8Array([3, 0, 48, 70]));
        this.write(type);

        this.write(GS);
        this.write("(k");
        this.write(new Uint8Array([3, 0, 48, 81, 48]));

        return this;
    }

    public beep(): Printer {
        this.write(ESC);
        this.write("(A");
        this.write(new Uint8Array([4, 0, 48, 51, 3, 15]));
        return this;
    }

    public setLineSpacing(spacing?: number): Printer {
        this.write(ESC);
        if (spacing) {
            this.write("3");
            this.write(spacing);
        } else {
            this.write("2");
        }
        return this;
    }

    public raster(image: Image, mode: RasterMode = RasterMode.Normal): Printer {
        const header = new Uint8Array([GS, 0x76, 0x30, mode]);
        const raster = image.toRaster();
        this.buffer.write(header);
        this.buffer.writeUInt16LE(raster.width);
        this.buffer.writeUInt16LE(raster.height);
        this.buffer.write(raster.data);
        return this;
    }

    public writeLine(value: string, encoding?: string): Printer {
        return this.write(`${value}\n`, encoding);
    }

    public writeList(values: string[], encoding?: string): Printer {
        for (const value of values) {
            this.writeLine(value, encoding);
        }
        return this;
    }

    public async close(): Promise<Printer> {
        await this.flush();
        await this.adapter.close();
        return this;
    }

    public async open(): Promise<Printer> {
        await this.adapter.open();
        return this;
    }

    public clearBuffer(): Printer {
        this.buffer.clear();
        return this;
    }

    public write(value: string | Uint8Array | number, encoding?: string): Printer {
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
