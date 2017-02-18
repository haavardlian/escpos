import {Console, Network} from "../src/Adapters";
import {Barcode, CodeTable, Font, Justification, PDF417ErrorCorrectLevel, PDF417Type, Position, QRErrorCorrecLevel,
    RasterMode, TextMode, Underline} from "../src/Commands";
import Image from "../src/Image";
import Printer from "../src/Printer";

const values = [
    {
        text: "Hello",
        text2: "World",
    },
    {
        text: "Foo",
        text2: "Bar",
    },
];

async function test() {
    const consoleAdapter = new Console(console.log, 32);
    const networkAdapter = new Network("10.42.0.94", 9100);
    const printer = await new Printer(consoleAdapter, "CP865").open();
    const image = await Image.load("C:/temp/receipt.png");
    await printer.init()
     .setJustification(Justification.Center)
     .raster(image, RasterMode.Normal)
     .setJustification(Justification.Right)
     .raster(image, RasterMode.DualWidthAndHeight)
     .feed(4)
     .cut(true)
     .close();
}

test();
