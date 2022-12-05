import { Money } from '../money/money';

export class Savings {
    public cashOnHand: Money;
    public equity: Money;
    public contributionsTo401k: Money;
    public totalSaved: Money;

    constructor() {
        this.cashOnHand = new Money();
        this.equity = new Money();
        this.contributionsTo401k = new Money();
        this.totalSaved = new Money();
    }
}
