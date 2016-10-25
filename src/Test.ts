import {Network} from "./Adapters";
import {CodeTable, Font, Justification, RasterMode, TextMode, Underline} from "./Commands";
import Image from "./Image";
import Printer from "./Printer";

async function test () {
    let p = await new Printer(new Network({address: "10.42.0.94", port: 9100})).open();
    let image = await Image.load("./nuxis.png");
    p.init()
     .setJustification(Justification.Center)
     .setFont(Font.A)
     .setTextMode(TextMode.DualWidthAndHeight)
     .setBold(true)
     .setUnderline(Underline.Double)
     .writeLine("Hello world")
     .feed(2)
     .raster(image, RasterMode.Normal)
     .feed(1)
     .resetToDefault()
     .setBold(true)
     .setCodeTable(CodeTable.PC865)
     .setJustification(Justification.Center)
     .writeLine("abcdefghijklmnopqrstuvwxzyæøå", "CP865")
     .writeLine("abcdefghijklmnopqrstuvwxzyæøå".toUpperCase(), "CP865")
     .feed(5)
     .cut(true)
     .close();
}

test();
