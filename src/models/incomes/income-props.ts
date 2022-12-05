import { Money } from '../money/money';

export interface IncomeProps {
    baseSalary: Money;
    salaryPreTax: Money;
    salaryPostTax: Money;
    bonus: Money;
    totalIncome: Money;
}
