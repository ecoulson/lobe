import { IncomeComponentProps } from './income-component-props';
import { MoneyComponent } from './money-component';

export function IncomeComponent({ income }: IncomeComponentProps) {
    return (
        <div>
            <MoneyComponent money={income.baseSalary} />
            <MoneyComponent money={income.salaryPreTax} />
            <MoneyComponent money={income.salaryPostTax} />
            <MoneyComponent money={income.bonus} />
            <MoneyComponent money={income.totalIncome} />
        </div>
    );
}
