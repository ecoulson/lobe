import { Percentage } from '../statistics/percentage';

export class Tax {
    public rate: Percentage;

    constructor(props?: Partial<Tax>) {
        const { rate } = {
            rate: new Percentage(),
            ...props,
        };
        this.rate = rate;
    }
}
