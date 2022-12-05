import { MoneyProps } from './money-props';

export class Money {
    public currency: string;
    public value: string;

    constructor(props?: Partial<MoneyProps>) {
        const completeProps = {
            currency: '',
            value: '',
            ...props,
        };
        this.currency = completeProps.currency;
        this.value = completeProps.value;
    }
}
