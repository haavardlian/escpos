# ESC/POS library

this project is based on this project https://github.com/haavardlian/escpos.

and was modified to suit specific needs, where applicable use the original project.

## Additional Features from base code:
- Read back from printer
- Fixed issue where closing on network printer would throw exception.

## Features:
- Adapters for Network, Serial, and Console (for debugging)
- Usual text stuff (Bold, Underline, Justification etc.)
- PNG images
- Bar code printing (Regular, QR, PDF417)
                           
## Usage example:
```javascript
import Printer from 'escpos-print/Printer'
import { Font, Justification, TextMode } from 'escpos-print/Commands'
import { Network } from 'escpos-print/Adapters'

const adapter = new Network("192.168.0.102", 9100)
const printer = await new Printer(adapter).open()
                           
printer.setFont(Font.A)
       .setJustification(Justification.Center)
       .setTextMode(TextMode.DualWidthAndHeight)
       .writeLine("This is some large centered text")
       .setTextMode(TextMode.Normal)
       .setJustification(Justification.Left)
       .writeLine("Some normal text")
       .feed(4)
       .close()
       .then(() => console.log("Done printing..."))
```
