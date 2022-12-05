import { ExpensesRowComponent } from '../expenses/expenses-row-component';
import { IncomeRowComponent } from '../incomes/income-row-component';
import { RoleRowComponent } from '../roles/role-row-component';
import { SavingsRowComponent } from '../savings/savings-row-component';
import { SavingStatisticsRowComponent } from '../savings/saving-statistics-row-component';
import { WealthProjectionRowComponent } from '../wealth-projections/wealth-projection-row-component';
import { BudgetTableComponentProps } from './budget-table-component-props';

export function BudgetTableComponent({ budgetTable }: BudgetTableComponentProps) {
    return (
        <div>
            <RoleRowComponent roleList={budgetTable.roleList} />
            <IncomeRowComponent incomeList={budgetTable.incomeList} />
            <ExpensesRowComponent expensesList={budgetTable.expensesList} />
            <SavingsRowComponent savingsList={budgetTable.savingsList} />
            <SavingStatisticsRowComponent
                savingStatisticsList={budgetTable.savingsStatisticsList}
            />
            <WealthProjectionRowComponent wealthProjectionList={budgetTable.wealthProjectionList} />
        </div>
    );
}
