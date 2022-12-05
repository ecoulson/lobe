import { MoneyProps } from './money-props';

export class Money {
    public currency: string;
    public value: string;

    constructor(props?: Partial<MoneyProps>) {
        const { currency, value } = {
            currency: '$',
            value: '0.00',
            ...props,
        };
        this.currency = currency;
        this.value = value;
    }
}
