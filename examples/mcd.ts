import {Network} from "../src/Adapters";
import {Barcode, CodeTable, Font, Justification, PDF417ErrorCorrectLevel, PDF417Type, Position, QRErrorCorrectLevel,
    RasterMode, TextMode, Underline} from "../src/Commands";
import Image from "../src/Image";
import Printer from "../src/Printer";

async function test() {
    const networkAdapter = new Network("193.214.238.165", 9100);
    const printer = await new Printer(networkAdapter, "CP865").open();
    const image = await Image.load("C:/temp/mcdonalds.png");
    await printer
        .init()
        .setCodeTable(CodeTable.PC865)
        .setJustification(Justification.Center)
        .writeLine("Help me i'm stuck in the printer, it's dark in here...")
        .feed(4)
        .cut(true)
        .close();
}

test();
