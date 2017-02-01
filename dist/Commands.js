"use strict";
(function (Underline) {
    Underline[Underline["NoUnderline"] = 0] = "NoUnderline";
    Underline[Underline["Single"] = 1] = "Single";
    Underline[Underline["Double"] = 2] = "Double";
})(exports.Underline || (exports.Underline = {}));
var Underline = exports.Underline;
(function (Justification) {
    Justification[Justification["Left"] = 0] = "Left";
    Justification[Justification["Center"] = 1] = "Center";
    Justification[Justification["Right"] = 2] = "Right";
})(exports.Justification || (exports.Justification = {}));
var Justification = exports.Justification;
(function (DrawerPin) {
    DrawerPin[DrawerPin["Pin2"] = 0] = "Pin2";
    DrawerPin[DrawerPin["Pin5"] = 1] = "Pin5";
})(exports.DrawerPin || (exports.DrawerPin = {}));
var DrawerPin = exports.DrawerPin;
(function (Font) {
    Font[Font["A"] = 0] = "A";
    Font[Font["B"] = 1] = "B";
    Font[Font["C"] = 2] = "C";
})(exports.Font || (exports.Font = {}));
var Font = exports.Font;
(function (Barcode) {
    Barcode[Barcode["UPCA"] = 0] = "UPCA";
    Barcode[Barcode["UPCE"] = 1] = "UPCE";
    Barcode[Barcode["EAN13"] = 2] = "EAN13";
    Barcode[Barcode["EAN8"] = 3] = "EAN8";
    Barcode[Barcode["CODE39"] = 4] = "CODE39";
    Barcode[Barcode["ITF"] = 5] = "ITF";
    Barcode[Barcode["CODABAR"] = 6] = "CODABAR";
    Barcode[Barcode["CODE93"] = 7] = "CODE93";
    Barcode[Barcode["CODE128"] = 8] = "CODE128";
    Barcode[Barcode["UCC"] = 9] = "UCC";
    Barcode[Barcode["RSS14"] = 10] = "RSS14";
    Barcode[Barcode["RSS14Truncated"] = 11] = "RSS14Truncated";
    Barcode[Barcode["RSSLimited"] = 12] = "RSSLimited";
    Barcode[Barcode["RSSExpanded"] = 13] = "RSSExpanded";
})(exports.Barcode || (exports.Barcode = {}));
var Barcode = exports.Barcode;
(function (Position) {
    Position[Position["NotPrinted"] = 0] = "NotPrinted";
    Position[Position["Above"] = 1] = "Above";
    Position[Position["Below"] = 2] = "Below";
    Position[Position["Both"] = 3] = "Both";
})(exports.Position || (exports.Position = {}));
var Position = exports.Position;
(function (Color) {
    Color[Color["Color1"] = 0] = "Color1";
    Color[Color["Color2"] = 1] = "Color2";
})(exports.Color || (exports.Color = {}));
var Color = exports.Color;
(function (TextMode) {
    TextMode[TextMode["Normal"] = 0] = "Normal";
    TextMode[TextMode["DualHeight"] = 16] = "DualHeight";
    TextMode[TextMode["DualWidth"] = 32] = "DualWidth";
    TextMode[TextMode["DualWidthAndHeight"] = 48] = "DualWidthAndHeight";
})(exports.TextMode || (exports.TextMode = {}));
var TextMode = exports.TextMode;
(function (RasterMode) {
    RasterMode[RasterMode["Normal"] = 0] = "Normal";
    RasterMode[RasterMode["DualWidth"] = 1] = "DualWidth";
    RasterMode[RasterMode["DualHeight"] = 2] = "DualHeight";
    RasterMode[RasterMode["DualWidthAndHeight"] = 3] = "DualWidthAndHeight";
})(exports.RasterMode || (exports.RasterMode = {}));
var RasterMode = exports.RasterMode;
(function (Density) {
    Density[Density["Single8Dot"] = 0] = "Single8Dot";
    Density[Density["Double8Dot"] = 1] = "Double8Dot";
    Density[Density["Single24Dot"] = 32] = "Single24Dot";
    Density[Density["Double24Dot"] = 33] = "Double24Dot";
})(exports.Density || (exports.Density = {}));
var Density = exports.Density;
(function (CodeTable) {
    CodeTable[CodeTable["PC437"] = 0] = "PC437";
    CodeTable[CodeTable["Katakana"] = 1] = "Katakana";
    CodeTable[CodeTable["PC850"] = 2] = "PC850";
    CodeTable[CodeTable["PC860"] = 3] = "PC860";
    CodeTable[CodeTable["PC863"] = 4] = "PC863";
    CodeTable[CodeTable["PC865"] = 5] = "PC865";
    CodeTable[CodeTable["WPC1252"] = 16] = "WPC1252";
    CodeTable[CodeTable["PC866"] = 17] = "PC866";
    CodeTable[CodeTable["PC852"] = 18] = "PC852";
    CodeTable[CodeTable["PC858"] = 19] = "PC858";
    CodeTable[CodeTable["Thai42"] = 20] = "Thai42";
    CodeTable[CodeTable["Thai11"] = 21] = "Thai11";
    CodeTable[CodeTable["Thai13"] = 22] = "Thai13";
    CodeTable[CodeTable["Thai14"] = 23] = "Thai14";
    CodeTable[CodeTable["Thai16"] = 24] = "Thai16";
    CodeTable[CodeTable["Thai17"] = 25] = "Thai17";
    CodeTable[CodeTable["Thai18"] = 26] = "Thai18";
})(exports.CodeTable || (exports.CodeTable = {}));
var CodeTable = exports.CodeTable;
(function (QRErrorCorrecLevel) {
    QRErrorCorrecLevel[QRErrorCorrecLevel["L"] = 48] = "L";
    QRErrorCorrecLevel[QRErrorCorrecLevel["M"] = 49] = "M";
    QRErrorCorrecLevel[QRErrorCorrecLevel["Q"] = 50] = "Q";
    QRErrorCorrecLevel[QRErrorCorrecLevel["H"] = 51] = "H";
})(exports.QRErrorCorrecLevel || (exports.QRErrorCorrecLevel = {}));
var QRErrorCorrecLevel = exports.QRErrorCorrecLevel;
(function (PDF417ErrorCorrectLevel) {
    PDF417ErrorCorrectLevel[PDF417ErrorCorrectLevel["Level1"] = 48] = "Level1";
    PDF417ErrorCorrectLevel[PDF417ErrorCorrectLevel["Level2"] = 49] = "Level2";
    PDF417ErrorCorrectLevel[PDF417ErrorCorrectLevel["Level3"] = 50] = "Level3";
    PDF417ErrorCorrectLevel[PDF417ErrorCorrectLevel["Level4"] = 51] = "Level4";
    PDF417ErrorCorrectLevel[PDF417ErrorCorrectLevel["Level5"] = 52] = "Level5";
    PDF417ErrorCorrectLevel[PDF417ErrorCorrectLevel["Level6"] = 53] = "Level6";
    PDF417ErrorCorrectLevel[PDF417ErrorCorrectLevel["Level7"] = 54] = "Level7";
    PDF417ErrorCorrectLevel[PDF417ErrorCorrectLevel["Level8"] = 55] = "Level8";
})(exports.PDF417ErrorCorrectLevel || (exports.PDF417ErrorCorrectLevel = {}));
var PDF417ErrorCorrectLevel = exports.PDF417ErrorCorrectLevel;
(function (PDF417Type) {
    PDF417Type[PDF417Type["Standard"] = 0] = "Standard";
    PDF417Type[PDF417Type["Truncated"] = 1] = "Truncated";
})(exports.PDF417Type || (exports.PDF417Type = {}));
var PDF417Type = exports.PDF417Type;
