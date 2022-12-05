import { BudgetRowComponent } from '../budgets/budget-row-component';
import { BudgetSectionComponent } from '../budgets/budget-section-component';
import { MoneyComponent } from '../funds/money-component';
import { IncomeRowComponentProps } from './income-row-component-props';

export function IncomeRowComponent({ incomeList }: IncomeRowComponentProps) {
    return (
        <BudgetSectionComponent heading="Income">
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
        </BudgetSectionComponent>
    );
}
