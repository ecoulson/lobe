import { Money } from '../funds/money';
import { ExpenseCategory } from './expense-category';

export class Expenses {
    public id: string;
    public roleId: string;
    public housing: ExpenseCategory;
    public transportation: ExpenseCategory;
    public food: ExpenseCategory;
    public utilities: ExpenseCategory;
    public insurance: ExpenseCategory;
    public healthcare: ExpenseCategory;
    public debtPayments: ExpenseCategory;
    public personal: ExpenseCategory;
    public entertainment: ExpenseCategory;
    public miscellaneous: ExpenseCategory;
    public totalExpenses: Money;
    public topCategory: string;
    public bottomCategory: string;

    constructor(props?: Partial<Expenses>) {
        const {
            topCategory,
            roleId,
            bottomCategory,
            id,
            healthcare,
            transportation,
            food,
            utilities,
            insurance,
            debtPayments,
            housing,
            personal,
            entertainment,
            miscellaneous,
            totalExpenses,
        } = {
            id: '',
            roleId: '',
            bottomCategory: 'Entertainment',
            topCategory: 'Entertainment',
            healthcare: new ExpenseCategory(),
            transportation: new ExpenseCategory(),
            food: new ExpenseCategory(),
            utilities: new ExpenseCategory(),
            insurance: new ExpenseCategory(),
            debtPayments: new ExpenseCategory(),
            housing: new ExpenseCategory(),
            personal: new ExpenseCategory(),
            entertainment: new ExpenseCategory(),
            miscellaneous: new ExpenseCategory(),
            totalExpenses: new Money(),
            ...props,
        };
        this.id = id;
        this.roleId = roleId;
        this.topCategory = topCategory;
        this.bottomCategory = bottomCategory;
        this.healthcare = healthcare;
        this.transportation = transportation;
        this.food = food;
        this.utilities = utilities;
        this.insurance = insurance;
        this.debtPayments = debtPayments;
        this.housing = housing;
        this.personal = personal;
        this.entertainment = entertainment;
        this.miscellaneous = miscellaneous;
        this.totalExpenses = totalExpenses;
    }
}
