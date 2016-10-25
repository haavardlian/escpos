abstract class Adapter {
    public abstract open(): Promise<Object>;
    public abstract write(data: Buffer): Promise<Object>;
    public abstract close(): void;
}

export default Adapter;
