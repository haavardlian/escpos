import Printer, { Adapters } from "./";
import { Font } from "./Commands";

const printer = new Printer(new Adapters.Network("127.0.0.1", 9001));

printer.open().then(() => {
    printer.init().setFont(Font.A)
           .writeLine("First test is a line")
           .writeLine("This is just a test")
           .close();
});
