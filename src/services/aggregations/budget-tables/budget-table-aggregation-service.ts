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
        budgetColumn.role = this.roleOrchestrationService.addRoleToBudgetTable(budgetTable);
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
                budgetTable.wealthProjectionList,
                capitalGainsTax
            );
        return this.budgetTableOrchestrationService.addColumn(budgetTable, budgetColumn);
    }

    updateRole(budgetTable: BudgetTable, updatedRole: Role): BudgetTable {
        const capitalGainsTax = new Tax({
            rate: new Percentage({
                value: 15,
            }),
        });
        const budgetColumn = this.budgetTableOrchestrationService.getColumnOfRole(
            budgetTable,
            updatedRole
        );
        budgetColumn.role = this.roleOrchestrationService.updateRole(budgetTable, budgetColumn, updatedRole);
        budgetColumn.wealthProjection =
            this.wealthProjectionOrchestrationService.updateWealthProjection(
                budgetColumn,
                capitalGainsTax,
                budgetTable.wealthProjectionList
            );
        return this.budgetTableOrchestrationService.upsertBudgetTable(budgetTable);
    }

    updateIncome(budgetTable: BudgetTable, updatedIncome: Income): BudgetTable {
        const capitalGainsTax = new Tax({
            rate: new Percentage({
                value: 15,
            }),
        });
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
        budgetColumn.wealthProjection =
            this.wealthProjectionOrchestrationService.updateWealthProjection(
                budgetColumn,
                capitalGainsTax,
                budgetTable.wealthProjectionList
            );
        return this.budgetTableOrchestrationService.updateColumn(budgetTable, budgetColumn);
    }

    updateExpenses(budgetTable: BudgetTable, updatedExpenses: Expenses): BudgetTable {
        const capitalGainsTax = new Tax({
            rate: new Percentage({
                value: 15,
            }),
        });
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
        budgetColumn.wealthProjection =
            this.wealthProjectionOrchestrationService.updateWealthProjection(
                budgetColumn,
                capitalGainsTax,
                budgetTable.wealthProjectionList
            );
        return this.budgetTableOrchestrationService.updateColumn(budgetTable, budgetColumn);
    }

    updateSavings(budgetTable: BudgetTable, updatedSavings: Savings): BudgetTable {
        const capitalGainsTax = new Tax({
            rate: new Percentage({
                value: 15,
            }),
        });
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
        budgetColumn.wealthProjection =
            this.wealthProjectionOrchestrationService.updateWealthProjection(
                budgetColumn,
                capitalGainsTax,
                budgetTable.wealthProjectionList
            );
        return this.budgetTableOrchestrationService.updateColumn(budgetTable, budgetColumn);
    }
}
