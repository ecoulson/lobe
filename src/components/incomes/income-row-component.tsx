import { BudgetRowComponent } from '../budget/budget-row-component';
import { MoneyComponent } from '../money/money-component';
import { IncomeRowComponentProps } from './income-row-component-props';

export function IncomeRowComponent({ incomeList }: IncomeRowComponentProps) {
    return (
        <div>
            <h2>Income</h2>
            <BudgetRowComponent
                field="Base Salary"
                cells={incomeList.map((income) => (
                    <MoneyComponent money={income.baseSalary} />
                ))}
            />
            <BudgetRowComponent
                field="Pre Tax Salary"
                cells={incomeList.map((income) => (
                    <MoneyComponent money={income.salaryPreTax} />
                ))}
            />
            <BudgetRowComponent
                field="Take Home Salary"
                cells={incomeList.map((income) => (
                    <MoneyComponent money={income.salaryPostTax} />
                ))}
            />
            <BudgetRowComponent
                field="Bonus"
                cells={incomeList.map((income) => (
                    <MoneyComponent money={income.bonus} />
                ))}
            />
            <BudgetRowComponent
                field="Total Income"
                cells={incomeList.map((income) => (
                    <MoneyComponent money={income.totalIncome} />
                ))}
            />
        </div>
    );
}
