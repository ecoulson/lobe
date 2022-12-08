export class Event<T = any> {
    public type: string;
    public data: T;

    constructor(props?: Partial<Event<T>>) {
        const { type, data } = {
            type: '',
            data: {} as T,
            ...props,
        };
        this.type = type;
        this.data = data;
    }
}
