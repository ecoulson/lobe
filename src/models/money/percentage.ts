import { PercentageProps } from './percentage-props';

export class Percentage {
    public value: string;

    constructor(props?: Partial<PercentageProps>) {
        const { value } = {
            value: '0.00',
            ...props,
        };
        this.value = value;
    }
}
