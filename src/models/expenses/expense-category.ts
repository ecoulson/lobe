import { Money } from '../money/money';

export class ExpenseCategory {
    public category: string;
    public totalSpent: Money;

    constructor() {
        this.category = '';
        this.totalSpent = new Money();
    }
}
