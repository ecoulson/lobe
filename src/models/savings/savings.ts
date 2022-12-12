import { Balance } from '../funds/balance';
import { Money } from '../funds/money';

export class Savings {
    public id: string;
    public roleId: string;
    public cashOnHand: Money;
    public equity: Money;
    public contributionsTo401k: Money;
    public totalSaved: Balance;

    constructor(props?: Partial<Savings>) {
        const { id, cashOnHand, equity, contributionsTo401k, totalSaved, roleId } = {
            id: '',
            roleId: '',
            cashOnHand: new Money(),
            equity: new Money(),
            contributionsTo401k: new Money(),
            totalSaved: new Balance(),
            ...props,
        };
        this.id = id;
        this.roleId = roleId;
        this.cashOnHand = cashOnHand;
        this.equity = equity;
        this.contributionsTo401k = contributionsTo401k;
        this.totalSaved = totalSaved;
    }
}
