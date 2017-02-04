import Adapter from "../Adapter";

export default class Console extends Adapter {
    public open(): Promise<undefined> {
        return new Promise((resolve) => {
            resolve();
        });
    }

    public write(data: Buffer): Promise<undefined> {
        return new Promise((resolve) => {
            // tslint:disable-next-line
            console.log(data.toString("hex").replace(/(.{2})/g, "$1 ").replace(/(.{48})/g, "$1\n"));
            resolve();
        });
    }

    public close(): void {
        return;
    }
}
