import Adapter from "../Adapter";

export type Logger = (data: string) => void;

export default class Console extends Adapter {
    private logger: Logger;
    private numbersPerLine: number;

    constructor(logger: Logger = console.log, numbersPerLine: number = 16) {
        super();
        this.logger = logger;
        this.numbersPerLine = numbersPerLine;
    }

    public async open(): Promise<void> {
        return;
    }

    public async write(data: Buffer): Promise<void> {
        const regex = new RegExp(`(.{${this.numbersPerLine * 3}})`, "g");
        this.logger(data.toString("hex").replace(/(.{2})/g, "$1 ").replace(regex, "$1\n"));
        return;
    }

    public close(): void {
        return;
    }
}
