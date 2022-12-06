import { Money } from '../funds/money';

export class Savings {
    public id: string;
    public cashOnHand: Money;
    public equity: Money;
    public contributionsTo401k: Money;
    public totalSaved: Money;

    constructor(props?: Partial<Savings>) {
        const { id, cashOnHand, equity, contributionsTo401k, totalSaved } = {
            id: '',
            cashOnHand: new Money(),
            equity: new Money(),
            contributionsTo401k: new Money(),
            totalSaved: new Money(),
            ...props,
        };
        this.id = id;
        this.cashOnHand = cashOnHand;
        this.equity = equity;
        this.contributionsTo401k = contributionsTo401k;
        this.totalSaved = totalSaved;
    }
}
