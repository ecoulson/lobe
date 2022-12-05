import { Money } from '../funds/money';

export class ExpenseCategory {
    public category: string;
    public totalSpent: Money;

    constructor(props?: Partial<ExpenseCategory>) {
        const { category, totalSpent } = {
            category: '',
            totalSpent: new Money(),
            ...props,
        };
        this.category = category;
        this.totalSpent = totalSpent;
    }
}
