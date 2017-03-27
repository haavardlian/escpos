abstract class Adapter {
    public abstract open(): Promise<void>;
    public abstract write(data: Buffer): Promise<void>;
    public abstract close(): void;
}

export default Adapter;
