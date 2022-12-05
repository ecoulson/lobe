import { Money } from '../money/money';
import { WealthProjectProps } from './wealth-projection-props';

export class WealthProjection {
    public expectedNetWorth: Money;
    public expectedNetWorthAfterCapitalGains: Money;

    constructor(props?: Partial<WealthProjectProps>) {
        const { expectedNetWorth, expectedNetWorthAfterCapitalGains } = {
            expectedNetWorth: new Money(),
            expectedNetWorthAfterCapitalGains: new Money(),
            ...props,
        };
        this.expectedNetWorth = expectedNetWorth;
        this.expectedNetWorthAfterCapitalGains = expectedNetWorthAfterCapitalGains;
    }
}
