import { Money } from '../money/money';

export class WealthProjection {
    public expectedNetWorth: Money;
    public expectedNetWorthAfterCapitalGains: Money;

    constructor() {
        this.expectedNetWorth = new Money();
        this.expectedNetWorthAfterCapitalGains = new Money();
    }
}
