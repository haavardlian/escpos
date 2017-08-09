import { createReadStream } from "fs";
import https = require("https");

const OK = 200;

export async function createStreamFromPath(path: string): Promise<NodeJS.ReadableStream> {
    if (path.match("^https?:\/\/.*$") !== null) {
        return await getRequestStream(path);
    } else {
        return createReadStream(path);
    }
}

export function getRequestStream(address: string): Promise<NodeJS.ReadableStream> {
    return new Promise((resolve, reject) => {
        const request = https.get(address, (response) => {
            if (response.statusCode !== OK) {
                reject(new Error("Request failed, status code: " + response.statusCode));
            }
            resolve(response);
        });
        request.on("error", (err) => reject(err));
    });
}
