import { Money } from '../funds/money';

export class Income {
    public id: string;
    public roleId: string;
    public baseSalary: Money;
    public salaryPreTax: Money;
    public salaryPostTax: Money;
    public bonus: Money;
    public totalIncome: Money;

    constructor(props?: Partial<Income>) {
        const { id, bonus, baseSalary, salaryPostTax, salaryPreTax, totalIncome, roleId } = {
            id: '',
            roleId: '',
            bonus: new Money(),
            baseSalary: new Money(),
            salaryPostTax: new Money(),
            salaryPreTax: new Money(),
            totalIncome: new Money(),
            ...props,
        };
        this.id = id;
        this.roleId = roleId;
        this.bonus = bonus;
        this.baseSalary = baseSalary;
        this.salaryPostTax = salaryPostTax;
        this.salaryPreTax = salaryPreTax;
        this.totalIncome = totalIncome;
    }
}
