import {Console} from "./Adapters";
import {Barcode, CodeTable, Font, Justification, PDF417ErrorCorrectLevel, PDF417Type, Position, QRErrorCorrecLevel,
    TextMode, Underline} from "./Commands";
import Printer from "./Printer";

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

async function test () {
    let consoleAdapter = new Console();
    let p = await new Printer(consoleAdapter, "CP865").open();
    p.init()
     .setJustification(Justification.Center)
     .setFont(Font.A)
     .setTextMode(TextMode.DualWidthAndHeight)
     .setBold(true)
     .setUnderline(Underline.Double)
     .writeLine("Hello world")
     .writeList(values.map(v => v.text + " " + v.text2))
     .feed()
     .resetToDefault()
     .feed()
     .setCodeTable(CodeTable.PC865)
     .setJustification(Justification.Center)
     .writeLine("abcdefghijklmnopqrstuvwxyzæøå - αßπµδ ½ñ")
     .writeLine("abcdefghijklmnopqrstuvwxyzæøå".toUpperCase())
     .setJustification(Justification.Left)
     .barcode("7044610871172", Barcode.EAN13, 50, 2, Font.A, Position.Below)
     .qr("Hmm what kind of information should we store in these things?", QRErrorCorrecLevel.L, 4)
     .pdf417("Hmm what kind of information should we store in these things?", PDF417Type.Standard, 1,
             20, 0, 0, PDF417ErrorCorrectLevel.Level6)
     .feed(4)
     .cut(true)
     .close();
}

test();
