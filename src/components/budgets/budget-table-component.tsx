import { ExpensesRowComponent } from '../expenses/expenses-row-component';
import { IncomeRowComponent } from '../incomes/income-row-component';
import { RoleRowComponent } from '../roles/role-row-component';
import { SavingsRowComponent } from '../savings/savings-row-component';
import { SavingStatisticsRowComponent } from '../savings/saving-statistics-row-component';
import { WealthProjectionRowComponent } from '../wealth-projections/wealth-projection-row-component';
import { BudgetTableComponentProps } from './budget-table-component-props';
import { ButtonComponent } from '../bases/button-component';
import { useEffect, useState } from 'react';
import { BudgetTable } from '../../models/budget/budget-table';

export function BudgetTableComponent({
    budgetTableId,
    budgetTableController,
}: BudgetTableComponentProps) {
    const [currentBudgetTable, setBudgetTable] = useState(new BudgetTable());

    useEffect(() => {
        const budgetTable = new BudgetTable();
        budgetTable.id = budgetTableId;
        setBudgetTable(budgetTableController.upsertBudgetTable(budgetTable));
    }, [budgetTableId, budgetTableController]);

    function addColumn() {
        setBudgetTable(budgetTableController.addColumn(currentBudgetTable));
    }

    return (
        <div>
            <ButtonComponent onClick={addColumn}>Add Position</ButtonComponent>
            <RoleRowComponent roleList={currentBudgetTable.roleList} />
            <IncomeRowComponent incomeList={currentBudgetTable.incomeList} />
            <ExpensesRowComponent expensesList={currentBudgetTable.expensesList} />
            <SavingsRowComponent savingsList={currentBudgetTable.savingsList} />
            <SavingStatisticsRowComponent
                savingStatisticsList={currentBudgetTable.savingsStatisticsList}
            />
            <WealthProjectionRowComponent
                wealthProjectionList={currentBudgetTable.wealthProjectionList}
            />
        </div>
    );
}