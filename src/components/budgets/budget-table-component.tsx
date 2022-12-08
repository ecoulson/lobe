import { ExpensesRowComponent } from '../expenses/expenses-row-component';
import { IncomeRowComponent } from '../incomes/income-row-component';
import { RoleRowComponent } from '../roles/role-row-component';
import { SavingsRowComponent } from '../savings/savings-row-component';
import { SavingStatisticsRowComponent } from '../savings/saving-statistics-row-component';
import { WealthProjectionRowComponent } from '../wealth-projections/wealth-projection-row-component';
import { BudgetTableComponentProps } from './budget-table-component-props';
import { ButtonComponent } from '../bases/button-component';
import { useEffect, useState } from 'react';
import { BudgetTable } from '../../models/budgets/budget-table';
import { Role } from '../../models/roles/role';
import { Income } from '../../models/incomes/income';
import { inject } from '../../clients/dependency-injection/inject';
import { Expenses } from '../../models/expenses/expenses';
import { Savings } from '../../models/savings/savings';

export const BudgetTableComponent = inject<BudgetTableComponentProps, 'budgetTableController'>(
    {
        budgetTableController: 'BudgetTableController',
    },
    ({ budgetTableId, budgetTableController }: BudgetTableComponentProps) => {
        const [currentBudgetTable, setBudgetTable] = useState(new BudgetTable());

        useEffect(() => {
            budgetTableController.listenForBudgetParameterEvents(updateAllColumns);
            // eslint-disable-next-line
        }, [budgetTableController]);

        useEffect(() => {
            updateAllColumns();
            // eslint-disable-next-line
        }, []);

        function updateAllColumns() {
            for (let i = 0; i < currentBudgetTable.numberOfColumns; i++) {
                const column = budgetTableController.getColumn(currentBudgetTable, i);
                updateRole(column.role);
                updateIncome(column.income);
                updateExpenses(column.expenses);
                updateSavings(column.savings);
            }
        }

        useEffect(() => {
            const budgetTable = new BudgetTable();
            budgetTable.id = budgetTableId;
            setBudgetTable(budgetTableController.upsertBudgetTable(budgetTable));
        }, [budgetTableId, budgetTableController]);

        function addColumn() {
            setBudgetTable(budgetTableController.addColumn(currentBudgetTable));
        }

        function updateRole(role: Role) {
            setBudgetTable(budgetTableController.updateRole(currentBudgetTable, role));
        }

        function updateIncome(income: Income) {
            setBudgetTable(budgetTableController.updateIncome(currentBudgetTable, income));
        }

        function updateExpenses(expenses: Expenses) {
            setBudgetTable(budgetTableController.updateExpenses(currentBudgetTable, expenses));
        }

        function updateSavings(savings: Savings) {
            setBudgetTable(budgetTableController.updateSavings(currentBudgetTable, savings));
        }

        function removeColumn(index: number) {
            return () => {
                setBudgetTable(budgetTableController.removeColumn(currentBudgetTable, index));
            };
        }

        function renderRemoveButtons() {
            const buttons = [<div className="w-1/12"></div>];
            for (let i = 0; i < currentBudgetTable.numberOfColumns; i++) {
                buttons.push(
                    <div className="flex justify-center w-1/12">
                        <ButtonComponent key={i} onClick={removeColumn(i)}>
                            Remove Column
                        </ButtonComponent>
                    </div>
                );
            }
            return buttons;
        }

        return (
            <div className="width-100% py-10 px-10">
                <div className="py-5">
                    <ButtonComponent onClick={addColumn}>Add Position</ButtonComponent>
                </div>
                <div className="py-5 flex gap-5">{renderRemoveButtons()}</div>
                <div>
                    <RoleRowComponent
                        roleList={currentBudgetTable.roleList}
                        updateRole={updateRole}
                    />
                    <IncomeRowComponent
                        incomeList={currentBudgetTable.incomeList}
                        updateIncome={updateIncome}
                    />
                    <ExpensesRowComponent
                        expensesList={currentBudgetTable.expensesList}
                        updateExpenses={updateExpenses}
                    />
                    <SavingsRowComponent
                        updateSavings={updateSavings}
                        savingsList={currentBudgetTable.savingsList}
                    />
                    <SavingStatisticsRowComponent
                        savingStatisticsList={currentBudgetTable.savingsStatisticsList}
                    />
                    <WealthProjectionRowComponent
                        wealthProjectionList={currentBudgetTable.wealthProjectionList}
                    />
                </div>
            </div>
        );
    }
);
