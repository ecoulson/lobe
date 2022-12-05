export class Balance {
    public sign: string;
    public currency: string;
    public value: string;

    constructor(props?: Partial<Balance>) {
        const { sign, currency, value } = {
            sign: '',
            currency: '$',
            value: '0.00',
            ...props,
        };
        this.sign = sign;
        this.currency = currency;
        this.value = value;
    }
}
