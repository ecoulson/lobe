import { Money } from '../money/money';
import { ExpenseCategoryProps } from './expense-category-props';

export class ExpenseCategory {
    public category: string;
    public totalSpent: Money;

    constructor(props?: Partial<ExpenseCategoryProps>) {
        const { category, totalSpent } = {
            category: '',
            totalSpent: new Money(),
            ...props,
        };
        this.category = category;
        this.totalSpent = totalSpent;
    }
}
