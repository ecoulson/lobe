import { Money } from '../funds/money';

export class WealthProjection {
    public expectedNetWorth: Money;
    public expectedNetWorthAfterCapitalGains: Money;

    constructor(props?: Partial<WealthProjection>) {
        const { expectedNetWorth, expectedNetWorthAfterCapitalGains } = {
            expectedNetWorth: new Money(),
            expectedNetWorthAfterCapitalGains: new Money(),
            ...props,
        };
        this.expectedNetWorth = expectedNetWorth;
        this.expectedNetWorthAfterCapitalGains = expectedNetWorthAfterCapitalGains;
    }
}
