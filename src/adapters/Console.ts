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

    public open(): Promise<undefined> {
        return new Promise((resolve) => resolve());
    }

    public write(data: Buffer): Promise<undefined> {
        return new Promise((resolve) => {
            const regex = new RegExp(`(.{${this.numbersPerLine * 3}})`, "g");
            // tslint:disable-next-line no-console
            this.logger(data.toString("hex").replace(/(.{2})/g, "$1 ").replace(regex, "$1\n"));
            resolve();
        });
    }

    public close(): void {
        return;
    }
}
