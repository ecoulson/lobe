import { Money } from '../funds/money';

export class WealthProjection {
    public id: string;
    public expectedNetWorth: Money;
    public expectedNetWorthAfterCapitalGains: Money;

    constructor(props?: Partial<WealthProjection>) {
        const { id, expectedNetWorth, expectedNetWorthAfterCapitalGains } = {
            id: '',
            expectedNetWorth: new Money(),
            expectedNetWorthAfterCapitalGains: new Money(),
            ...props,
        };
        this.id = id;
        this.expectedNetWorth = expectedNetWorth;
        this.expectedNetWorthAfterCapitalGains = expectedNetWorthAfterCapitalGains;
    }
}
