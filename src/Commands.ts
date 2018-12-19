export enum Underline {
    NoUnderline = 0,
    Single,
    Double
}

export enum Justification {
    Left = 0,
    Center,
    Right
}

export enum DrawerPin {
    Pin2 = 0,
    Pin5
}

export enum Font {
    A = 0,
    B,
    C
}

export enum Barcode {
    UPCA = 0,
    UPCE,
    EAN13,
    EAN8,
    CODE39,
    ITF,
    CODABAR,
    CODE93,
    CODE128,
    UCC,
    RSS14,
    RSS14Truncated,
    RSSLimited,
    RSSExpanded
}

export enum Position {
    NotPrinted = 0,
    Above,
    Below,
    Both
}

export enum Color {
    Color1 = 0,
    Color2
}

export enum TextMode {
    Normal = 0,
    DualHeight = 0x10,
    DualWidth = 0x20,
    DualWidthAndHeight = 0x30
}

export enum RasterMode {
    Normal = 0,
    DualWidth,
    DualHeight,
    DualWidthAndHeight
}

export enum Density {
    Single8Dot = 0x00,
    Double8Dot = 0x01,
    Single24Dot = 0x20,
    Double24Dot = 0x21
}

export enum CodeTable {
    PC437 = 0,
    Katakana,
    PC850,
    PC860,
    PC863,
    PC865,
    WPC1252 = 16,
    PC866,
    PC852,
    PC858,
    Thai42,
    Thai11,
    Thai13,
    Thai14,
    Thai16,
    Thai17,
    Thai18
}

export enum QRErrorCorrectLevel {
    L = 48,
    M,
    Q,
    H
}

export enum PDF417ErrorCorrectLevel {
    Level1 = 48,
    Level2,
    Level3,
    Level4,
    Level5,
    Level6,
    Level7,
    Level8
}

export enum PDF417Type {
    Standard = 0,
    Truncated
}
