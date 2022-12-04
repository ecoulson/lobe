import { Money } from '../money/money';

export class Income {
    public baseSalary: Money;
    public salaryPreTax: Money;
    public salaryPostTax: Money;
    public bonus: Money;
    public totalIncome: Money;

    constructor() {
        this.bonus = new Money();
        this.baseSalary = new Money();
        this.salaryPostTax = new Money();
        this.salaryPreTax = new Money();
        this.totalIncome = new Money();
    }
}
