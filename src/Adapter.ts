abstract class Adapter {
    public abstract open(): Promise<void>;
    public abstract write(data: Uint8Array): Promise<void>;
    public abstract close(): Promise<void>;
}

export default Adapter;
