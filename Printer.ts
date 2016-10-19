import Adapter from "./Adapter";
import { Barcode, CodeTable, Color, DrawerPin, Font, Justification, Position, TextMode, Underline } from "./Commands";
import { MutableBuffer } from "mutable-buffer";

class Printer {
    private buffer: MutableBuffer;
    private adapter: Adapter;

    constructor(adapter: Adapter) {
        this.adapter = adapter;
        this.buffer = new MutableBuffer();
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
        this.setFont(Font.A);
        return this;
    }

    public feed(feed: number): Printer {
        this.write(0x1B);
        this.write("d");
        this.write(feed);
        return this;
    }

    public setBold(bold: boolean): Printer {
        this.write(0x1B);
        this.write("E");
        this.write(bold ? 1 : 0);
        return this;
    }

    public setInverse(inverse: boolean): Printer {
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

    public openDrawer(pin: DrawerPin): Printer {
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
                   width: number, font: Font, pos: Position): Printer {
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
        this.write(code.length);
        this.write(code);

        return this;
    }

    public writeLine(value: string): Printer {
        return this.write(value + "\n");
    }

    public close(): Promise<undefined> {
        return new Promise(resolve => {
            this.flush().then(() => {
                this.adapter.close();
                resolve();
            });
        });
    }

    public open(): Promise<Printer> {
        return new Promise(resolve => {
            this.adapter.open().then(() => resolve(this));
        });
    }

    private write(value: string | Buffer | number): Printer {
        if (typeof value === "number") {
            this.buffer.writeUInt8(value);
        } else {
            this.buffer.write(value);
        }
        return this;
    }
}

export default Printer;
