import {Network} from "./Adapters";
import {Barcode, CodeTable, Font, Justification, PDF417ErrorCorrectLevel, PDF417Type, Position, QRErrorCorrecLevel,
    RasterMode, TextMode, Underline} from "./Commands";
import Image from "./Image";
import Printer from "./Printer";

async function test () {
    let adapter = new Network("10.42.0.94", 9100);
    let p = await new Printer(adapter, "CP865").open();
    let image = await Image.load("./sign.png");
    p.init()
     .setJustification(Justification.Center)
     .setFont(Font.A)
     .setTextMode(TextMode.DualWidthAndHeight)
     .setBold(true)
     .setUnderline(Underline.Double)
     .writeLine("Hello world")
     .feed()
     .raster(image, RasterMode.Normal)
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
