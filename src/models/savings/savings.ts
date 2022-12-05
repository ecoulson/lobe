import { Money } from '../money/money';
import { SavingsProps } from './savings-props';

export class Savings {
    public cashOnHand: Money;
    public equity: Money;
    public contributionsTo401k: Money;
    public totalSaved: Money;

    constructor(props?: Partial<SavingsProps>) {
        const { cashOnHand, equity, contributionsTo401k, totalSaved } = {
            cashOnHand: new Money(),
            equity: new Money(),
            contributionsTo401k: new Money(),
            totalSaved: new Money(),
            ...props,
        };
        this.cashOnHand = cashOnHand;
        this.equity = equity;
        this.contributionsTo401k = contributionsTo401k;
        this.totalSaved = totalSaved;
    }
}
