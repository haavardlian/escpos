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
    UPCA = 65,
    UPCE,
    JAN13,
    JAN8,
    CODE39,
    ITF,
    CODABAR,
    CODE93,
    CODE128
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

export default {
    Color,
    Position,
    Barcode,
    Font,
    DrawerPin,
    Justification,
    Underline,
};
