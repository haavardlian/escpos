import {Console, Network, Usb} from "../src/Adapters";
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
    const networkAdapter = new Network("192.168.1.30", 9100, 1);
    const usbAdapter = new Usb({vid: 0x0525, pid: 0xA700});

    const printer = await new Printer(usbAdapter, "CP865").open();
    const image = await Image.load("http://static.64bit.no/receipt_t.png");

    await printer.init()
                 .setCodeTable(CodeTable.PC865)
                 .setJustification(Justification.Center)
                 .raster(image, RasterMode.Normal)
                 // .setJustification(Justification.Right)
                 // .writeLine("Just some text, a newline will be added.")
                 // .raster(image, RasterMode.DualWidthAndHeight)
                 // .barcode("1234567890123", Barcode.EAN13, 50, 2, Font.A, Position.Below)
                 // .qr("We can put all kinds of cool things in these...", QRErrorCorrecLevel.M, 8)
                 // .writeList(values.map(v => `${v.text} ... ${v.text2}`)) // Prints one entry per line
                 .feed(4)
                 .cut(true)
                 .close();
}

test();
