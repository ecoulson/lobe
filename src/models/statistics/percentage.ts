export class Percentage {
    public value: number;

    constructor(props?: Partial<Percentage>) {
        const { value } = {
            value: 0,
            ...props,
        };
        this.value = value;
    }
}
