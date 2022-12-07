import { BudgetColumn } from '../../../models/budgets/budget-column';
import { BudgetTable } from '../../../models/budgets/budget-table';
import { Expenses } from '../../../models/expenses/expenses';
import { Income } from '../../../models/incomes/income';
import { Role } from '../../../models/roles/role';
import { Savings } from '../../../models/savings/savings';
import { Percentage } from '../../../models/statistics/percentage';
import { Tax } from '../../../models/taxes/tax';
import { BudgetTableOrchestrationService } from '../../orchestrations/budgets/budget-table-orchestration-service';
import { ExpenseOrchestrationService } from '../../orchestrations/expenses/expense-orchestration-service';
import { IncomeOrchestrationService } from '../../orchestrations/incomes/income-orchestration-service';
import { RoleOrchestrationService } from '../../orchestrations/roles/role-orchestration-service';
import { SavingStatisticsOrchestrationService } from '../../orchestrations/savings/saving-statistics-orchestration-service';
import { SavingsOrchestrationService } from '../../orchestrations/savings/savings-orchestration-service';
import { WealthProjectionOrchestrationService } from '../../orchestrations/wealth-projections/wealth-projection-orchestration-service';

export class BudgetTableAggregationService {
    private readonly budgetTableOrchestrationService: BudgetTableOrchestrationService;
    private readonly roleOrchestrationService: RoleOrchestrationService;
    private readonly incomeOrchestrationService: IncomeOrchestrationService;
    private readonly expensesOrchestrationService: ExpenseOrchestrationService;
    private readonly savingsOrchestrationService: SavingsOrchestrationService;
    private readonly savingStatisticsOrchestrationService: SavingStatisticsOrchestrationService;
    private readonly wealthProjectionOrchestrationService: WealthProjectionOrchestrationService;

    constructor(
        budgetTableOrchestrationService: BudgetTableOrchestrationService,
        roleOrchestrationService: RoleOrchestrationService,
        incomeOrchestrationService: IncomeOrchestrationService,
        expensesOrchestrationService: ExpenseOrchestrationService,
        savingsOrchestrationService: SavingsOrchestrationService,
        savingStatisticsOrchestrationService: SavingStatisticsOrchestrationService,
        wealthProjectionOrchestrationService: WealthProjectionOrchestrationService
    ) {
        this.budgetTableOrchestrationService = budgetTableOrchestrationService;
        this.roleOrchestrationService = roleOrchestrationService;
        this.incomeOrchestrationService = incomeOrchestrationService;
        this.expensesOrchestrationService = expensesOrchestrationService;
        this.savingsOrchestrationService = savingsOrchestrationService;
        this.savingStatisticsOrchestrationService = savingStatisticsOrchestrationService;
        this.wealthProjectionOrchestrationService = wealthProjectionOrchestrationService;
    }

    upsertBudgetTable(budgetTable: BudgetTable): BudgetTable {
        return this.budgetTableOrchestrationService.upsertBudgetTable(budgetTable);
    }

    getBudgetTable(id: string) {
        return this.budgetTableOrchestrationService.getBudgetTable(id);
    }

    addColumn(budgetTable: BudgetTable): BudgetTable {
        const capitalGainsTax = new Tax({
            rate: new Percentage({
                value: 15,
            }),
        });
        const budgetColumn = new BudgetColumn();
        const previousColumn = this.budgetTableOrchestrationService.getColumnByIndex(
            budgetTable,
            budgetTable.numberOfColumns - 1
        );
        budgetColumn.role = this.roleOrchestrationService.createCalculatedRole(previousColumn);
        budgetColumn.income = this.incomeOrchestrationService.createCalculatedIncome();
        budgetColumn.expenses = this.expensesOrchestrationService.createCalculatedExpenses();
        budgetColumn.savings =
            this.savingsOrchestrationService.createCalculatedSavings(budgetColumn);
        budgetColumn.savingsStatistics =
            this.savingStatisticsOrchestrationService.createCalculatedSavingsStatistics(
                budgetColumn
            );
        budgetColumn.wealthProjection =
            this.wealthProjectionOrchestrationService.createCalculatedWealthProjection(
                budgetColumn,
                capitalGainsTax,
                previousColumn
            );
        return this.budgetTableOrchestrationService.addColumn(budgetTable, budgetColumn);
    }

    updateRole(budgetTable: BudgetTable, updatedRole: Role): BudgetTable {
        let budgetColumn = this.budgetTableOrchestrationService.getColumnOfRole(
            budgetTable,
            updatedRole
        );
        let previousColumn = this.budgetTableOrchestrationService.getColumnByIndex(
            budgetTable,
            budgetColumn.index - 1
        );
        budgetColumn.role = this.roleOrchestrationService.updateRole(updatedRole, previousColumn);
        budgetTable = this.budgetTableOrchestrationService.updateColumn(budgetTable, budgetColumn);
        budgetTable = this.updateDependantRoles(budgetTable, budgetColumn);
        return this.updateDependantWealthProjections(budgetTable, budgetColumn, previousColumn);
    }

    private updateDependantRoles(budgetTable: BudgetTable, budgetColumn: BudgetColumn) {
        let previousColumn = budgetColumn;
        for (let i = budgetColumn.index + 1; i < budgetTable.numberOfColumns; i++) {
            budgetColumn = this.budgetTableOrchestrationService.getColumnByIndex(budgetTable, i);
            budgetColumn.role = this.roleOrchestrationService.updateRole(
                budgetColumn.role,
                previousColumn
            );
            budgetTable = this.budgetTableOrchestrationService.updateColumn(
                budgetTable,
                budgetColumn
            );
            previousColumn = budgetColumn;
        }
        return budgetTable;
    }

    private updateDependantWealthProjections(
        budgetTable: BudgetTable,
        budgetColumn: BudgetColumn,
        previousColumn?: BudgetColumn
    ) {
        const capitalGainsTax = new Tax({
            rate: new Percentage({
                value: 15,
            }),
        });
        for (let i = budgetColumn.index; i < budgetTable.numberOfColumns; i++) {
            budgetColumn = this.budgetTableOrchestrationService.getColumnByIndex(budgetTable, i);
            budgetColumn.wealthProjection =
                this.wealthProjectionOrchestrationService.updateWealthProjection(
                    budgetColumn,
                    capitalGainsTax,
                    previousColumn
                );
            budgetTable = this.budgetTableOrchestrationService.updateColumn(
                budgetTable,
                budgetColumn
            );
            previousColumn = budgetColumn;
        }
        return budgetTable;
    }

    updateIncome(budgetTable: BudgetTable, updatedIncome: Income): BudgetTable {
        const incomeTax = new Tax({
            rate: new Percentage({
                value: 30,
            }),
        });
        const budgetColumn = this.budgetTableOrchestrationService.getColumnOfIncome(
            budgetTable,
            updatedIncome
        );
        budgetColumn.income = this.incomeOrchestrationService.updateIncome(
            updatedIncome,
            incomeTax
        );
        budgetColumn.savings = this.savingsOrchestrationService.updateSavings(
            budgetColumn,
            budgetColumn.savings
        );
        budgetColumn.savingsStatistics =
            this.savingStatisticsOrchestrationService.updateSavingsStatistics(
                budgetColumn,
                budgetColumn.savings
            );
        budgetTable = this.budgetTableOrchestrationService.updateColumn(budgetTable, budgetColumn);
        return this.updateDependantWealthProjections(
            budgetTable,
            budgetColumn,
            this.budgetTableOrchestrationService.getColumnByIndex(
                budgetTable,
                budgetColumn.index - 1
            )
        );
    }

    updateExpenses(budgetTable: BudgetTable, updatedExpenses: Expenses): BudgetTable {
        const budgetColumn = this.budgetTableOrchestrationService.getColumnOfExpenses(
            budgetTable,
            updatedExpenses
        );
        budgetColumn.expenses = this.expensesOrchestrationService.updateExpenses(updatedExpenses);
        budgetColumn.savings = this.savingsOrchestrationService.updateSavings(
            budgetColumn,
            budgetColumn.savings
        );
        budgetColumn.savingsStatistics =
            this.savingStatisticsOrchestrationService.updateSavingsStatistics(
                budgetColumn,
                budgetColumn.savings
            );
        budgetTable = this.budgetTableOrchestrationService.updateColumn(budgetTable, budgetColumn);
        return this.updateDependantWealthProjections(
            budgetTable,
            budgetColumn,
            this.budgetTableOrchestrationService.getColumnByIndex(
                budgetTable,
                budgetColumn.index - 1
            )
        );
    }

    updateSavings(budgetTable: BudgetTable, updatedSavings: Savings): BudgetTable {
        const budgetColumn = this.budgetTableOrchestrationService.getColumnOfSavings(
            budgetTable,
            updatedSavings
        );
        budgetColumn.savings = this.savingsOrchestrationService.updateSavings(
            budgetColumn,
            updatedSavings
        );
        budgetColumn.savingsStatistics =
            this.savingStatisticsOrchestrationService.updateSavingsStatistics(
                budgetColumn,
                updatedSavings
            );
        budgetTable = this.budgetTableOrchestrationService.updateColumn(budgetTable, budgetColumn);
        return this.updateDependantWealthProjections(
            budgetTable,
            budgetColumn,
            this.budgetTableOrchestrationService.getColumnByIndex(
                budgetTable,
                budgetColumn.index - 1
            )
        );
    }
}
