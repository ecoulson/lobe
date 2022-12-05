import { Money } from '../money/money';
import { IncomeProps } from './income-props';

export class Income {
    public baseSalary: Money;
    public salaryPreTax: Money;
    public salaryPostTax: Money;
    public bonus: Money;
    public totalIncome: Money;

    constructor(props?: Partial<IncomeProps>) {
        const { bonus, baseSalary, salaryPostTax, salaryPreTax, totalIncome } = {
            bonus: new Money(),
            baseSalary: new Money(),
            salaryPostTax: new Money(),
            salaryPreTax: new Money(),
            totalIncome: new Money(),
            ...props,
        };
        this.bonus = bonus;
        this.baseSalary = baseSalary;
        this.salaryPostTax = salaryPostTax;
        this.salaryPreTax = salaryPreTax;
        this.totalIncome = totalIncome;
    }
}
