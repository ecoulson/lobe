import { BudgetColumn } from '../../../models/budgets/budget-column';
import { BudgetTable } from '../../../models/budgets/budget-table';
import { Expenses } from '../../../models/expenses/expenses';
import { Income } from '../../../models/incomes/income';
import { Role } from '../../../models/roles/role';
import { Savings } from '../../../models/savings/savings';
import { BudgetTableService } from '../../foundations/budgets/budget-table-service';

export class BudgetTableOrchestrationService {
    private readonly budgetTableService: BudgetTableService;

    constructor(budgetTableService: BudgetTableService) {
        this.budgetTableService = budgetTableService;
    }

    getBudgetTable(id: string) {
        return this.budgetTableService.getBudgetTable(id);
    }

    upsertBudgetTable(budgetTable: BudgetTable) {
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }

    updateColumn(budgetTable: BudgetTable, budgetColumn: BudgetColumn) {
        budgetTable.expensesList[budgetColumn.index] = budgetColumn.expenses;
        budgetTable.incomeList[budgetColumn.index] = budgetColumn.income;
        budgetTable.roleList[budgetColumn.index] = budgetColumn.role;
        budgetTable.savingsList[budgetColumn.index] = budgetColumn.savings;
        budgetTable.savingsStatisticsList[budgetColumn.index] = budgetColumn.savingsStatistics;
        budgetTable.wealthProjectionList[budgetColumn.index] = budgetColumn.wealthProjection;
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }

    addColumn(budgetTable: BudgetTable, budgetColumn: BudgetColumn) {
        budgetTable.expensesList.push(budgetColumn.expenses);
        budgetTable.incomeList.push(budgetColumn.income);
        budgetTable.roleList.push(budgetColumn.role);
        budgetTable.savingsList.push(budgetColumn.savings);
        budgetTable.savingsStatisticsList.push(budgetColumn.savingsStatistics);
        budgetTable.wealthProjectionList.push(budgetColumn.wealthProjection);
        return this.budgetTableService.upsertBudgetTable(budgetTable);
    }

    getColumnOfRole(budgetTable: BudgetTable, role: Role): BudgetColumn {
        return this.createColumnFromIndex(budgetTable, 'roleList', role.id);
    }

    private createColumnFromIndex(
        budgetTable: BudgetTable,
        rowKey: Exclude<keyof BudgetTable, 'id'>,
        cellKey: string
    ) {
        const index = budgetTable[rowKey].findIndex((obj) => obj.id === cellKey);
        return new BudgetColumn({
            index,
            role: budgetTable.roleList[index],
            income: budgetTable.incomeList[index],
            expenses: budgetTable.expensesList[index],
            savings: budgetTable.savingsList[index],
            savingsStatistics: budgetTable.savingsStatisticsList[index],
            wealthProjection: budgetTable.wealthProjectionList[index],
        });
    }

    getColumnOfIncome(budgetTable: BudgetTable, income: Income): BudgetColumn {
        return this.createColumnFromIndex(budgetTable, 'incomeList', income.id);
    }

    getColumnOfExpenses(budgetTable: BudgetTable, expenses: Expenses): BudgetColumn {
        return this.createColumnFromIndex(budgetTable, 'expensesList', expenses.id);
    }

    getColumnOfSavings(budgetTable: BudgetTable, savings: Savings): BudgetColumn {
        return this.createColumnFromIndex(budgetTable, 'savingsList', savings.id);
    }
}
