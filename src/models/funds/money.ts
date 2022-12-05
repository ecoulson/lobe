export class Money {
    public currency: string;
    public value: string;

    constructor(props?: Partial<Money>) {
        const { currency, value } = {
            currency: '$',
            value: '0.00',
            ...props,
        };
        this.currency = currency;
        this.value = value;
    }
}
