import { ExpensesComponent } from '../expenses/expense-component';
import { IncomeComponent } from '../incomes/income-component';
import { RoleComponent } from '../roles/role-component';
import { SavingsComponent } from '../savings/savings-component';
import { SavingsStatisticsComponent } from '../savings/savings-statistics-component';
import { WealthProjectionComponent } from '../wealth-projections/wealth-projection-component';
import { BudgetColumnComponentProps } from './budget-column-component-props';

export function BudgetColumnComponent({ budgetColumn }: BudgetColumnComponentProps) {
    return (
        <div>
            <RoleComponent role={budgetColumn.role} />
            <IncomeComponent income={budgetColumn.income} />
            <ExpensesComponent expenses={budgetColumn.expenses} />
            <SavingsComponent savings={budgetColumn.savings} />
            <SavingsStatisticsComponent savingsStatistics={budgetColumn.savingsStatistics} />
            <WealthProjectionComponent wealthProjection={budgetColumn.wealthProjection} />
        </div>
    );
}
