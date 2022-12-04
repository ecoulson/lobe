import { ExpenseCategory } from './expense-category';

export class Expenses {
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

    constructor() {
        this.healthcare = new ExpenseCategory();
        this.transportation = new ExpenseCategory();
        this.food = new ExpenseCategory();
        this.utilities = new ExpenseCategory();
        this.insurance = new ExpenseCategory();
        this.debtPayments = new ExpenseCategory();
        this.housing = new ExpenseCategory();
        this.personal = new ExpenseCategory();
        this.entertainment = new ExpenseCategory();
        this.miscellaneous = new ExpenseCategory();
    }
}
