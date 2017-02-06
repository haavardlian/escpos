import * as fs from "fs";
import * as Jimp from "jimp";
import * as moment from "moment";
import { MutableBuffer } from "mutable-buffer";
import * as path from "path";
import Adapter from "../Adapter";

// imageStartX = 256 - (width/2) for centered
//               512 - width for right
//                 0 for left

export default class PNG extends Adapter {
    private buffer: MutableBuffer;
    private outputPath: string;

    constructor(outputPath: string) {
        super();
        this.outputPath = outputPath;
    }

    public open(): Promise<undefined> {
        return new Promise((resolve) => {
            this.buffer = new MutableBuffer();
            resolve();
        });
    }

    public write(data: Buffer): Promise<undefined> {
        return new Promise<undefined>(resolve => {
            this.buffer.write(data);
            resolve();
        });
    }

    public close(): void {
        const buffer: Buffer = this.buffer.flush();
        const fileName = moment().format("YYYYMMDD_HHmmss.png");
        const filePath = path.join(this.outputPath, fileName);
        const outImage = new Jimp(512, 1024, 0xFFFFFFFF, (err, image) => {
            image.write(filePath);
        });
        // fs.writeFileSync(filePath, buffer, {flag: "w+"});

        return;
    }
}
