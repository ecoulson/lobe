import { Money } from '../funds/money';

export class ExpenseCategory {
    public name: string;
    public totalSpent: Money;

    constructor(props?: Partial<ExpenseCategory>) {
        const { name, totalSpent } = {
            name: '',
            totalSpent: new Money(),
            ...props,
        };
        this.name = name;
        this.totalSpent = totalSpent;
    }
}
