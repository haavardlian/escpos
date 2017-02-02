"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Adapters_1 = require("./Adapters");
const Commands_1 = require("./Commands");
const Image_1 = require("./Image");
const Printer_1 = require("./Printer");
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
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        let adapter = new Adapters_1.Network("10.42.0.94", 9100);
        let p = yield new Printer_1.default(adapter, "CP865").open();
        let image = yield Image_1.default.load("./sign.png");
        p.init()
            .setJustification(Commands_1.Justification.Center)
            .setFont(Commands_1.Font.A)
            .setTextMode(Commands_1.TextMode.DualWidthAndHeight)
            .setBold(true)
            .setUnderline(Commands_1.Underline.Double)
            .writeLine("Hello world")
            .writeList(values.map(v => v.text + " " + v.text2))
            .feed()
            .raster(image, Commands_1.RasterMode.Normal)
            .resetToDefault()
            .feed()
            .setCodeTable(Commands_1.CodeTable.PC865)
            .setJustification(Commands_1.Justification.Center)
            .writeLine("abcdefghijklmnopqrstuvwxyzæøå - αßπµδ ½ñ")
            .writeLine("abcdefghijklmnopqrstuvwxyzæøå".toUpperCase())
            .setJustification(Commands_1.Justification.Left)
            .barcode("7044610871172", Commands_1.Barcode.EAN13, 50, 2, Commands_1.Font.A, Commands_1.Position.Below)
            .qr("Hmm what kind of information should we store in these things?", Commands_1.QRErrorCorrecLevel.L, 4)
            .pdf417("Hmm what kind of information should we store in these things?", Commands_1.PDF417Type.Standard, 1, 20, 0, 0, Commands_1.PDF417ErrorCorrectLevel.Level6)
            .feed(4)
            .cut(true)
            .close();
    });
}
test();
