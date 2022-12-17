import { Money } from '../funds/money';
import { ExpenseCategory } from './expense-category';

export class Expenses {
    public id: string;
    public roleId: string;
    public categories: ExpenseCategory[];
    public totalExpenses: Money;
    public topCategory: string;
    public bottomCategory: string;

    constructor(props?: Partial<Expenses>) {
        const { categories, topCategory, roleId, bottomCategory, id, totalExpenses } = {
            id: '',
            categories: [
                new ExpenseCategory({
                    name: 'Debt Payments',
                }),
                new ExpenseCategory({
                    name: 'Entertainment',
                }),
                new ExpenseCategory({
                    name: 'Food',
                }),
                new ExpenseCategory({
                    name: 'Healthcare',
                }),
                new ExpenseCategory({
                    name: 'Housing',
                }),
                new ExpenseCategory({
                    name: 'Insurance',
                }),
                new ExpenseCategory({
                    name: 'Miscellaneous',
                }),
                new ExpenseCategory({
                    name: 'Personal',
                }),
                new ExpenseCategory({
                    name: 'Transportation',
                }),
                new ExpenseCategory({
                    name: 'Utilities',
                }),
            ],
            roleId: '',
            bottomCategory: 'Entertainment',
            topCategory: 'Entertainment',
            totalExpenses: new Money(),
            ...props,
        };
        this.categories = categories;
        this.id = id;
        this.roleId = roleId;
        this.topCategory = topCategory;
        this.bottomCategory = bottomCategory;
        this.totalExpenses = totalExpenses;
    }
}
